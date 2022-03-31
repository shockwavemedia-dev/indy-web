const IconCard = ({ title, className }: { title: string; className: string }) => (
  <div
    className={`flex flex-col items-center justify-center space-y-4 rounded border border-solid border-athensgray bg-white ${className}`}
  >
    <div className="min-h-10 min-w-10 rounded bg-iron" />
    <div className="font-inter text-base font-semibold text-tuna">{title}</div>
  </div>
)

export default IconCard
