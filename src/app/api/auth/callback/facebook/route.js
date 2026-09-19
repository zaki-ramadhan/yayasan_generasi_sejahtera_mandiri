import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  // Retrieve stored cookies
  const cookies = request.cookies;
  const storedState = cookies.get("ygsm_fb_oauth_state")?.value;
  const authMode = cookies.get("ygsm_auth_mode")?.value || "login";
  const redirectTarget = cookies.get("ygsm_auth_redirect")?.value || "/";

  const fallbackBaseUrl = authMode === "register" ? "/register" : "/login";

  // Handle user cancellation or Facebook authorization error
  if (error || !code) {
    const errorRedirect = new URL(fallbackBaseUrl, appUrl);
    errorRedirect.searchParams.set("error", error === "access_denied" ? "fb_cancelled" : "fb_error");
    if (errorDescription) {
      errorRedirect.searchParams.set("reason", errorDescription);
    }
    const res = NextResponse.redirect(errorRedirect);
    res.cookies.delete("ygsm_fb_oauth_state");
    res.cookies.delete("ygsm_auth_mode");
    return res;
  }

  // Validate CSRF state
  if (!storedState || storedState !== state) {
    const invalidStateRedirect = new URL(fallbackBaseUrl, appUrl);
    invalidStateRedirect.searchParams.set("error", "fb_state_mismatch");
    const res = NextResponse.redirect(invalidStateRedirect);
    res.cookies.delete("ygsm_fb_oauth_state");
    return res;
  }

  try {
    const callbackUrl = `${appUrl}/api/auth/callback/facebook`;

    // 1. Exchange code for Facebook Graph API access token
    const tokenUrl = new URL("https://graph.facebook.com/v19.0/oauth/access_token");
    tokenUrl.searchParams.set("client_id", appId);
    tokenUrl.searchParams.set("client_secret", appSecret);
    tokenUrl.searchParams.set("redirect_uri", callbackUrl);
    tokenUrl.searchParams.set("code", code);

    const tokenResponse = await fetch(tokenUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Facebook Token Exchange Failed:", tokenData);
      const tokenErrorRedirect = new URL(fallbackBaseUrl, appUrl);
      tokenErrorRedirect.searchParams.set("error", "fb_token_failed");
      const res = NextResponse.redirect(tokenErrorRedirect);
      res.cookies.delete("ygsm_fb_oauth_state");
      return res;
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch User Profile from Facebook Graph API
    const profileUrl = new URL("https://graph.facebook.com/v19.0/me");
    profileUrl.searchParams.set(
      "fields",
      "id,name,first_name,last_name,email,picture.width(250).height(250).as(picture)"
    );
    profileUrl.searchParams.set("access_token", accessToken);

    const profileResponse = await fetch(profileUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const profileData = await profileResponse.json();

    if (!profileResponse.ok || !profileData.id) {
      console.error("Facebook Profile Fetch Failed:", profileData);
      const profileErrorRedirect = new URL(fallbackBaseUrl, appUrl);
      profileErrorRedirect.searchParams.set("error", "fb_profile_failed");
      const res = NextResponse.redirect(profileErrorRedirect);
      res.cookies.delete("ygsm_fb_oauth_state");
      return res;
    }

    // 3. Format standardized User object
    const cleanName = profileData.name || "Donatur Facebook";
    const initials = cleanName
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const sanitizedUsername = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 15);

    const fbAvatar =
      profileData.picture?.data?.url ||
      `https://graph.facebook.com/${profileData.id}/picture?type=large`;

    const formattedUser = {
      id: `USR-FB-${profileData.id}`,
      name: cleanName,
      username: `${sanitizedUsername}_${String(profileData.id).slice(-4)}`,
      email: profileData.email || `fb.${profileData.id}@facebook.user`,
      role: "DONOR",
      title: "Donatur Terdaftar (Facebook)",
      phone: "-",
      avatar: fbAvatar,
      initials: initials || "FB",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      provider: "facebook",
      providerId: profileData.id,
    };

    // 4. Redirect to client callback receiver
    const clientCallbackUrl = new URL("/auth/callback", appUrl);
    clientCallbackUrl.searchParams.set("provider", "facebook");
    clientCallbackUrl.searchParams.set("user", JSON.stringify(formattedUser));
    clientCallbackUrl.searchParams.set("redirect", redirectTarget);

    const response = NextResponse.redirect(clientCallbackUrl);
    response.cookies.delete("ygsm_fb_oauth_state");
    response.cookies.delete("ygsm_auth_mode");
    response.cookies.delete("ygsm_auth_redirect");

    return response;
  } catch (err) {
    console.error("Facebook OAuth Callback Exception:", err);
    const errRedirect = new URL(fallbackBaseUrl, appUrl);
    errRedirect.searchParams.set("error", "fb_internal_error");
    const res = NextResponse.redirect(errRedirect);
    res.cookies.delete("ygsm_fb_oauth_state");
    return res;
  }
}
