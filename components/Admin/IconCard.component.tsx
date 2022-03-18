const IconCard = ({ title, className }: { title: string; className: string }) => (
  <div
    className={`flex flex-col items-center justify-center space-y-[16px] rounded-[4px] border border-solid border-athensgray bg-white ${className}`}
  >
    <div className="min-h-[40px] min-w-[40px] rounded-[4px] bg-iron" />
    <div className="font-inter text-[16px] font-semibold text-tuna">{title}</div>
  </div>
)

export default IconCard
