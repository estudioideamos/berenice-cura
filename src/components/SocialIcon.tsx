type SocialIconProps = {
  network: "instagram" | "facebook";
};

export function SocialIcon({ network }: SocialIconProps) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle className="social-icon__dot" cx="17.35" cy="6.75" r="1.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.3 21v-7.55h2.58l.39-3.02H14.3V8.5c0-.87.24-1.47 1.49-1.47h1.59V4.34a21.3 21.3 0 0 0-2.32-.13c-2.3 0-3.88 1.4-3.88 3.98v2.24H8.57v3.02h2.61V21h3.12Z" />
    </svg>
  );
}
