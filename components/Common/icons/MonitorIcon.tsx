const MonitorIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.83 1.5H13.1625C15.8325 1.5 16.5 2.1675 16.5 4.83V9.5775C16.5 12.2475 15.8325 12.9075 13.17 12.9075H4.83C2.1675 12.915 1.5 12.2475 1.5 9.585V4.83C1.5 2.1675 2.1675 1.5 4.83 1.5Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12.915V16.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 9.75H16.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.625 16.5H12.375" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default MonitorIcon
