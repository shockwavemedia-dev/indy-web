const ChartIcon = ({ className }: { className: string }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={className}
        d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={className}
        d="M11.625 13.875C12.45 13.875 13.125 13.2 13.125 12.375V5.625C13.125 4.8 12.45 4.125 11.625 4.125C10.8 4.125 10.125 4.8 10.125 5.625V12.375C10.125 13.2 10.7925 13.875 11.625 13.875Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={className}
        d="M6.375 13.875C7.2 13.875 7.875 13.2 7.875 12.375V9.75C7.875 8.925 7.2 8.25 6.375 8.25C5.55 8.25 4.875 8.925 4.875 9.75V12.375C4.875 13.2 5.5425 13.875 6.375 13.875Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChartIcon
