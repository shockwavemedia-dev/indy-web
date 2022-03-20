const JobsStatusCountCard = ({ value, description }: { value: number; description: string }) => (
  <div className="flex h-18.5 flex-1 flex-col items-center justify-center rounded bg-woodsmoke">
    <div className="font-inter text-lg font-semibold text-white">{value}</div>
    <div className="font-inter text-xs font-normal text-santasgray">{description}</div>
  </div>
)

export default JobsStatusCountCard
