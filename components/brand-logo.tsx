type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "size-9" }: BrandLogoProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill="#fff7f7"
        stroke="#ead1d1"
        strokeWidth="1.5"
      />
      <path
        d="M20 29.5s-9.2-5.6-9.2-12.2c0-3.4 2.4-5.8 5.5-5.8 1.8 0 3.1.8 3.7 2 .7-1.2 2-2 3.8-2 3 0 5.4 2.4 5.4 5.8 0 6.6-9.2 12.2-9.2 12.2Z"
        fill="#f5e4e4"
        stroke="#8f3f3f"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 20h6.1l1.4-3.5 2.7 7.1 2-4.5h9.4"
        stroke="#8f3f3f"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="#743434">
        <circle cx="12.1" cy="20" r="1" />
        <circle cx="16.7" cy="16.5" r="1" />
        <circle cx="19.4" cy="23.6" r="1" />
        <circle cx="21.4" cy="19.1" r="1" />
      </g>
    </svg>
  );
}
