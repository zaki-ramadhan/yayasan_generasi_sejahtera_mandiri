"use client";

import { SocialAuthButton } from "@/components/auth/SocialAuthButton";

export function SocialAuthGroup({
  onGoogleClick,
  onFacebookClick,
  isGoogleLoading = false,
  isFacebookLoading = false,
  disabled = false,
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SocialAuthButton
        provider="google"
        onClick={onGoogleClick}
        isLoading={isGoogleLoading}
        disabled={disabled || isFacebookLoading}
        text="Google"
      />
      <SocialAuthButton
        provider="facebook"
        onClick={onFacebookClick}
        isLoading={isFacebookLoading}
        disabled={disabled || isGoogleLoading}
        text="Facebook"
      />
    </div>
  );
}
