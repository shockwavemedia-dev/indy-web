const Video = ({ src = '' }: { src?: string }) => {
  return (
    <>
      <div className="md-5 block">
        <video muted autoPlay loop style={{ width: '500px', height: '500px' }}>
          <source src={src} />
        </video>
      </div>
    </>
  )
}

export default Video
