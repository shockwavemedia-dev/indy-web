import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()

  router.push('/auth/login')

  return <></>
}

export default Page
