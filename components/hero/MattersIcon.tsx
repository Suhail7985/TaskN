/** Gavel inside hexagon — reference Matters icon */
export function MattersIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2.5L19.5 6.25V11.75L12 15.5L4.5 11.75V6.25L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5L7 19H9.5L8.75 15.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 13.5L17 19H14.5L15.25 15.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="7.5"
        y1="12.5"
        x2="16.5"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
