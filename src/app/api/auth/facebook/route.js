import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "login";
  const redirect = searchParams.get("redirect") || "/";

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!appId) {
    const errorUrl = new URL(
      mode === "register" ? "/register" : "/login",
      appUrl
    );
    errorUrl.searchParams.set("error", "fb_missing_app_id");
    return NextResponse.redirect(errorUrl);
  }

  // Generate secure CSRF state token
  const state = crypto.randomBytes(24).toString("hex");
  const callbackUrl = `${appUrl}/api/auth/callback/facebook`;

  const facebookOAuthUrl = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  facebookOAuthUrl.searchParams.set("client_id", appId);
  facebookOAuthUrl.searchParams.set("redirect_uri", callbackUrl);
  facebookOAuthUrl.searchParams.set("state", state);
  facebookOAuthUrl.searchParams.set("response_type", "code");
  facebookOAuthUrl.searchParams.set("scope", "public_profile");

  const response = NextResponse.redirect(facebookOAuthUrl);

  // Store temporary state and mode in cookies for CSRF verification
  response.cookies.set("ygsm_fb_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  response.cookies.set("ygsm_auth_mode", mode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  response.cookies.set("ygsm_auth_redirect", redirect, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
