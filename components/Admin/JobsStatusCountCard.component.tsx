const JobsStatusCountCard = ({ value, description }: { value: number; description: string }) => (
  <div className="flex h-[73px] flex-1 flex-col items-center justify-center rounded-[4px] bg-woodsmoke">
    <div className="font-inter text-[18px] font-semibold text-white">{value}</div>
    <div className="font-inter text-[12px] font-normal text-santasgray">{description}</div>
  </div>
)

export default JobsStatusCountCard
