export const CaretIcon = ({ className, small = false }: { className: string; small?: boolean }) =>
  small ? (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 7.5L6 3.75L9.75 7.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 10L8 5L13 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
