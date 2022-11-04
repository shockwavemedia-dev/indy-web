import { init } from 'aos'
import 'aos/dist/aos.css'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { IndyCircleFillIcon } from '../components/icons/IndyCircleFillIcon'
import { IndyCircleOutlineIcon } from '../components/icons/IndyCircleOutlineIcon'
import { IndyEqualsIcon } from '../components/icons/IndyEqualsIcon'
import { IndyGreaterThanIcon } from '../components/icons/IndyGreaterThanIcon'
import { IndyPlusIcon } from '../components/icons/IndyPlusIcon'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const HomePage: NextPageWithLayout = () => {
  const { asPath, replace } = useRouter()
  const { status, data: session } = useSession()

  useEffect(() => {
    init({
      once: true,
      duration: 800,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  if (status === 'loading') return null

  if (status === 'authenticated') {
    const { isAdmin, isClient, isManager, isStaff, isPrinterManager } = session

    if (isAdmin) {
      replace('/clients')
      return null
    } else if (isClient || isManager || isStaff || isPrinterManager) {
      replace('/dashboard')
      return null
    }
  }

  return (
    <>
      <Head>
        <title>Indy</title>
      </Head>
      <main className="h-screen [&>section]:overflow-x-hidden [&>section]:px-15 [&>section]:sm:px-5">
        <header className="fixed z-10 w-full items-center space-x-25 bg-charleston-green py-8 text-center shadow-lg lg:space-x-10 sm:hidden [&>a]:font-circular-std [&>a]:text-lg [&>a]:font-black [&>a]:text-white">
          <Link href="#home">
            <a
              className={
                asPath === '/' || asPath.includes('#home')
                  ? '!text-halloween-orange underline underline-offset-2'
                  : undefined
              }
            >
              Home
            </a>
          </Link>
          <Link href="#features">
            <a
              className={
                asPath.includes('#features')
                  ? '!text-halloween-orange underline underline-offset-2'
                  : undefined
              }
            >
              Features
            </a>
          </Link>
          <span className="font-circular-std text-6xl font-black text-white after:text-halloween-orange after:content-['.']">
            Indy
          </span>
          <Link href="#contact">
            <a
              className={
                asPath.includes('#contact')
                  ? '!text-halloween-orange underline underline-offset-2'
                  : undefined
              }
            >
              Contact
            </a>
          </Link>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </header>
        <section id="home" className="bg-charleston-green pt-60 xl:pb-40 sm:pt-10 xs:pb-10">
          <div className="mx-auto grid max-w-8xl grid-cols-2 xl:grid-cols-1">
            <span className="mx-auto mb-20 hidden w-fit text-center font-circular-std text-6xl font-black text-white after:text-halloween-orange after:content-['.'] sm:flex">
              Indy
            </span>
            <div className="flex flex-col justify-center xl:mb-15 xl:items-center xs:mb-5">
              <div
                className="mb-30 font-circular-std text-6xl font-black text-white 2xl:text-5xl xl:mb-15 xl:text-center xl:text-6xl lg:text-5xl md:text-4xl xs:mb-5 xs:text-2xl"
                data-aos="fade-right"
              >
                Where Marketing, <br className="xl:hidden" />
                Data <br className="hidden xl:flex" />
                and Creativity <br className="xl:hidden" />
                meet.
              </div>
              <div className="flex items-center space-x-10 2xl:space-x-8 xl:scale-100 xl:space-x-10 lg:scale-90 sm:space-x-8 xs:scale-[.6] [&>div>span]:whitespace-nowrap [&>div>span]:font-circular-std [&>div>span]:text-sm [&>div>span]:font-bold [&>div>span]:leading-none [&>div>span]:text-halloween-orange [&>div>span]:2xl:text-xs [&>div>span]:2xl:font-medium [&>div>span]:xl:text-base [&>div>span]:xl:font-bold [&>div>span]:sm:text-xs [&>div>span]:sm:font-medium [&>div]:mb-auto [&>div]:flex [&>div]:h-22 [&>div]:flex-col [&>div]:items-center [&>div>div]:grid [&>div>div]:h-full [&>div>div]:place-items-center [&>div>div>svg]:2xl:scale-90">
                <div className="cursor-pointer transition-all hover:-translate-y-3">
                  <div>
                    <IndyCircleOutlineIcon />
                  </div>
                  <span>Data Science</span>
                </div>
                <div className="cursor-pointer transition-all hover:-translate-y-3">
                  <div>
                    <IndyPlusIcon className="fill-saffron" />
                  </div>
                  <span>Technology</span>
                </div>
                <div className="cursor-pointer transition-all hover:-translate-y-3">
                  <div>
                    <IndyGreaterThanIcon className="fill-deep-space-sparkle" />
                  </div>
                  <span>Creative</span>
                </div>
                <div className="cursor-pointer transition-all hover:-translate-y-3">
                  <div>
                    <IndyEqualsIcon />
                  </div>
                  <span>Strategy</span>
                </div>
                <div className="cursor-pointer transition-all hover:-translate-y-3">
                  <div>
                    <IndyCircleFillIcon />
                  </div>
                  <span>Indy</span>
                </div>
              </div>
            </div>
            <div className="grid place-items-center xl:mx-auto xl:w-fit">
              <div className="col-span-full row-span-full aspect-square w-full max-w-[41rem] rounded-full bg-halloween-orange 2xl:max-w-[31rem] xl:max-w-[41rem] lg:max-w-[31rem] md:max-w-[21rem] xs:max-w-[15rem]" />
              <div
                className="relative col-span-full row-span-full mt-10 h-[29.125rem] w-[48.125rem] 2xl:h-[21.875rem] 2xl:w-[36.063rem] xl:h-[29.125rem] xl:w-[48.125rem] lg:h-[21.875rem] lg:w-[36.063rem] md:h-[15.625rem] md:w-[25.75rem]  xs:h-[9.438rem] xs:w-[15.625rem]"
                data-aos="fade-left"
              >
                <Image
                  src="/images/laptop-1.png"
                  layout="fill"
                  alt="web application mock"
                  priority
                />
              </div>
              <div
                className="relative col-span-full row-span-full ml-auto mt-[25%] h-[22.188rem] w-[10.938rem] 2xl:h-[17.5rem] 2xl:w-[8.625rem] xl:h-[22.188rem] xl:w-[10.938rem] lg:h-[17.5rem] lg:w-[8.625rem] md:h-[13.75rem] md:w-[6.75rem] xs:h-30 xs:w-15"
                data-aos="fade-up-left"
              >
                <Image src="/images/phone.png" layout="fill" alt="web application mock" />
              </div>
            </div>
            <div
              className="box-content h-[12.5rem] w-[25rem] rounded-t-full border-[140px] !border-b-0 border-white-coffee 2xl:h-40 2xl:w-80 2xl:border-[132px] xl:hidden"
              data-aos="fade-right"
            />
          </div>
        </section>
        <section id="features" className="bg-deep-space-sparkle pb-40 xs:pb-10">
          <div className="mx-auto grid max-w-8xl grid-cols-2 xl:grid-cols-1">
            <div
              className="box-content h-[12.5rem] w-[25rem] rounded-b-full border-[140px] !border-t-0 border-white-coffee 2xl:h-40 2xl:w-80 2xl:border-[132px] xl:hidden"
              data-aos="fade-right"
            />
            <div
              className="mb-25 mt-16 hidden items-center space-x-3 font-circular-std text-5xl font-black text-saffron xl:mt-32 xl:mb-0 xl:flex md:text-4xl xs:mt-10 xs:text-3xl"
              data-aos="fade-right"
            >
              <IndyGreaterThanIcon className="scale-75 fill-saffron md:scale-50 xs:scale-50" />
              <span>Features</span>
            </div>
            <div
              className="pt-40 pl-25 font-circular-std text-5xl font-black text-saffron xl:mb-10 xl:p-0 xl:pt-10 xl:text-center md:text-4xl xs:text-3xl"
              data-aos="fade-left"
            >
              From Concept to
              <br />
              creation, all in
              <br />
              one location
            </div>
            <div
              className="col-span-2 mb-25 mt-16 flex items-center space-x-3 font-circular-std text-5xl font-black text-saffron xl:hidden"
              data-aos="fade-right"
            >
              <IndyGreaterThanIcon className="scale-75 fill-saffron" />
              <span>Features</span>
            </div>
            <div
              className="font-circular-std text-5xl font-black text-white xl:mb-10 xl:text-center md:text-4xl xs:text-3xl"
              data-aos="fade-right"
            >
              All your marketing
              <br />
              needs in one
              <br />
              platform
            </div>
            <ReactPlayer url="https://vimeo.com/767157660" />
          </div>
        </section>
        <section className="bg-white py-40 xs:py-15">
          <div className="mx-auto grid max-w-8xl place-items-center">
            <div
              className="relative col-span-full row-span-full mr-auto h-[26.375rem] w-[43.75rem] 2xl:h-[21.875rem] 2xl:w-[36.25rem] xl:h-[15.625rem] xl:w-[25.875rem] lg:h-[12.5rem] lg:w-[20.688rem] md:h-[9.375rem] md:w-[15.5rem] sm:h-25 sm:w-[10.313rem] xs:!scale-75"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <Image
                src="/images/laptop-3.png"
                layout="fill"
                className="opacity-40"
                alt="web application mock"
              />
            </div>
            <div
              className="relative col-span-full row-span-full ml-auto h-[26.375rem] w-[43.75rem] 2xl:h-[21.875rem] 2xl:w-[36.25rem] xl:h-[15.625rem] xl:w-[25.875rem] lg:h-[12.5rem] lg:w-[20.688rem] md:h-[9.375rem] md:w-[15.5rem] sm:h-25 sm:w-[10.313rem] xs:!scale-75"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <Image
                src="/images/laptop-4.png"
                layout="fill"
                className="opacity-40"
                alt="web application mock"
              />
            </div>
            <div className="relative col-span-full row-span-full h-[34rem] w-[56.25rem] 2xl:h-[30.875rem] 2xl:w-[51.063rem] xl:h-[25rem] xl:w-[41.313rem] lg:h-[21.875rem] lg:w-[36.125rem] md:h-[18.75rem] md:w-[31rem] sm:h-[12.5rem] sm:w-[20.625rem] xs:scale-75">
              <Image src="/images/laptop-2.png" layout="fill" alt="web application mock" />
            </div>
            <div className="mt-12 flex w-full items-center justify-between">
              <div data-aos="fade-left" data-aos-delay="400">
                <IndyGreaterThanIcon className="rotate-180 scale-125 fill-halloween-orange lg:scale-90 sm:scale-50" />
              </div>
              <div className="space-y-3 font-circular-std font-bold" data-aos="fade-in">
                <div className="text-center text-5xl font-black text-deep-space-sparkle lg:text-4xl sm:text-3xl xs:text-2xl">
                  Marketing Planner
                </div>
              </div>
              <div data-aos="fade-right" data-aos-delay="400">
                <IndyGreaterThanIcon className="scale-125 fill-halloween-orange lg:scale-90 sm:scale-50" />
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="bg-halloween-orange py-40 sm:py-20 xs:py-10">
          <div className="mx-auto grid max-w-8xl grid-cols-2 lg:grid-cols-1">
            <div className="lg:order-last">
              <div
                className="mb-25 flex items-center space-x-3 font-circular-std text-5xl font-black text-saffron md:text-4xl sm:mb-5 xs:text-3xl"
                data-aos="fade-right"
              >
                <IndyGreaterThanIcon className="scale-75 fill-saffron md:scale-50 xs:scale-50" />
                <span>Contact</span>
              </div>
              <div
                className="mb-20 font-circular-std text-5xl font-black text-white md:text-4xl sm:mb-5"
                data-aos="fade-right"
              >
                Get in touch and
                <br />
                let us change your
                <br />
                future
              </div>
              <div
                className="grid grid-cols-2 gap-3 pr-30 lg:mx-auto lg:max-w-lg lg:grid-cols-1 lg:pr-0 sm:max-w-none [&>input]:rounded-lg [&>input]:bg-transparent [&>input]:p-4 [&>input]:font-circular-std [&>input]:text-white [&>input]:outline [&>input]:outline-2 [&>input]:outline-white/75 [&>input]:placeholder:text-white/50"
                date-aos="fade-right"
              >
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="number" placeholder="Contact No." />
                <textarea
                  className="col-span-2 resize-none rounded-lg bg-transparent p-4 font-circular-std text-white outline outline-2 outline-white/75 placeholder:text-white/50 focus:outline focus:outline-2 focus:outline-white/75 lg:col-span-1"
                  rows={10}
                  placeholder="Inquiry"
                />
                <button
                  type="submit"
                  className="rounded bg-saffron py-3 font-circular-std text-white"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="grid h-[58.5rem] place-items-center xl:h-[46.875rem] lg:mx-auto lg:mb-20 lg:w-full lg:max-w-lg sm:h-fit sm:max-w-none">
              <IndyGreaterThanIcon className="col-span-full row-span-full scale-[18] fill-saffron 2xl:scale-[15] xl:scale-[12] sm:scale-[8] xs:scale-[5]" />
              <div
                className="relative col-span-full row-span-full mr-auto mt-auto h-[41.875rem] w-[20.625rem] 2xl:h-[31.688rem] 2xl:w-[15.625rem] xl:h-[25rem] xl:w-[12.313rem] sm:mr-1/2 sm:mt-1/2 sm:h-[17.75rem] sm:w-[8.75rem] xs:!scale-75"
                data-aos="fade-up"
              >
                <Image src="/images/phone-1.png" layout="fill" alt="web application mock" />
              </div>
              <div
                className="sm: relative col-span-full row-span-full ml-auto mb-auto h-[41.875rem] w-[20.625rem] 2xl:h-[31.688rem] 2xl:w-[15.625rem] xl:h-[25rem] xl:w-[12.313rem] sm:ml-1/2 sm:mb-1/2 sm:h-[17.75rem] sm:w-[8.75rem] xs:!scale-75"
                data-aos="fade-down"
              >
                <Image src="/images/phone-2.png" layout="fill" alt="web application mock" />
              </div>
            </div>
          </div>
        </section>
        <footer className="flex items-center justify-between bg-charleston-green p-16 md:flex-col md:space-y-5 xs:p-5">
          <span className="mr-auto font-circular-std text-6xl font-black text-white after:text-halloween-orange after:content-['.'] 2xl:text-5xl lg:text-4xl md:mr-0">
            Indy
          </span>
          <span className="mr-10 font-circular-std font-medium text-saffron 2xl:text-sm lg:text-xs md:mr-0 md:flex md:flex-col md:items-center md:space-y-2">
            <span>PARTNERED WITH DAILY PRESS GROUP</span> <span className="md:hidden">|</span>{' '}
            <Link href="#">
              <a>FOLLOW US</a>
            </Link>{' '}
            <span className="md:hidden">|</span>{' '}
            <Link href="#">
              <a>CONTACT US</a>
            </Link>
          </span>
          <div className="relative">
            <Image
              src="/images/daily-press-logo-white.png"
              height={55}
              width={55}
              alt="Daily Press"
            />
          </div>
        </footer>
      </main>
    </>
  )
}

export default HomePage
