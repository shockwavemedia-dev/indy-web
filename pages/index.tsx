import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard',
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/auth/login',
    },
  }
}

export default Home
