import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NotFoundPage = () => {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/')
  }, [])

  return null
}

export default NotFoundPage
