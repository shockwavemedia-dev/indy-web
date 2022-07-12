import { Card } from './Card'
import { StatusCountCard } from './StatusCountCard'

export const RetainerInclusions = () => (
  <Card title="Retainer Inclusions" className="h-fit flex-none">
    <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3">
      <StatusCountCard value={8} className="bg-deep-space-sparkle" description="Graphics Design" />
      <StatusCountCard value={5} className="bg-charleston-green" description="Animations" />
      <StatusCountCard value={5} className="bg-halloween-orange" description="Web Updates" />
      <StatusCountCard value={8} className="bg-maximum-yellow-red" description="Photo Shoots" />
      <StatusCountCard value={3} className="bg-navy" description="Video Shoots" />
      <StatusCountCard value={11} className="bg-red-crimson" description="Social Posts" />
      <StatusCountCard value={9} className="bg-orchid" description="Marketing" />
      <StatusCountCard value={7} className="bg-forest-green" description="Health Check" />
      <StatusCountCard value={15} className="bg-bright-navy-blue" description="App Updates" />
    </div>
  </Card>
)
