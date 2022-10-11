import { init } from 'aos'
import 'aos/dist/aos.css'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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

  if (status === 'authenticated') {
    const { isAdmin, isClient, isManager, isStaff } = session

    if (isAdmin) {
      replace('/clients')
    } else if (isClient || isManager || isStaff) {
      replace('/dashboard')
    }
  }

  return (
    <>
      <Head>
        <title>Indy</title>
      </Head>
      <main className="h-screen ">
        <header className="fixed z-10 w-full items-center space-x-25 bg-charleston-green py-8 text-center shadow-lg [&>a]:font-circular-std [&>a]:text-lg [&>a]:font-black [&>a]:text-white">
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
          <Link href="#tutorial">
            <a
              className={
                asPath.includes('#tutorial')
                  ? '!text-halloween-orange underline underline-offset-2'
                  : undefined
              }
            >
              Tutorial
            </a>
          </Link>
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
        </header>
        <section id="home" className="bg-charleston-green pt-40">
          <div className="mx-auto grid max-w-8xl grid-cols-2">
            <div className="flex flex-col justify-center">
              <div
                className="mb-30 font-circular-std text-6xl font-black text-white"
                data-aos="fade-right"
              >
                Where Marketing,
                <br />
                Data and Creativity
                <br />
                meet.
              </div>
              <div className="flex items-center space-x-10 [&>div>span]:font-circular-std [&>div>span]:text-sm [&>div>span]:font-bold [&>div>span]:leading-none [&>div>span]:text-halloween-orange [&>div]:mb-auto [&>div]:flex [&>div]:h-22 [&>div]:flex-col [&>div]:items-center [&>div>div]:grid [&>div>div]:h-full [&>div>div]:place-items-center">
                <div>
                  <div>
                    <IndyCircleOutlineIcon />
                  </div>
                  <span>Data Science</span>
                </div>
                <div>
                  <div>
                    <IndyPlusIcon className="fill-saffron" />
                  </div>
                  <span>Technology</span>
                </div>
                <div>
                  <div>
                    <IndyGreaterThanIcon className="fill-deep-space-sparkle" />
                  </div>
                  <span>Creative</span>
                </div>
                <div>
                  <div>
                    <IndyEqualsIcon />
                  </div>
                  <span>Strategy</span>
                </div>
                <div>
                  <div>
                    <IndyCircleFillIcon />
                  </div>
                  <span>Indy</span>
                </div>
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="col-span-full row-span-full h-[41rem] w-[41rem] rounded-full bg-halloween-orange" />
              <div className="col-span-full row-span-full mt-10" data-aos="fade-left">
                <Image
                  src="/images/laptop-1.png"
                  height={466}
                  width={770}
                  alt="web application mock"
                />
              </div>
              <div className="col-span-full row-span-full ml-auto mt-[25%]" data-aos="fade-up-left">
                <Image
                  src="/images/phone.png"
                  height={355}
                  width={175}
                  alt="web application mock"
                />
              </div>
            </div>
            <div className="box-content h-[12.5rem] w-[25rem] rounded-t-full border-[140px] border-b-0 border-white-coffee" />
          </div>
        </section>
        <section id="features" className="bg-deep-space-sparkle pb-40">
          <div className="mx-auto grid max-w-8xl grid-cols-2">
            <div className="box-content h-[12.5rem] w-[25rem] rounded-b-full border-[140px] border-t-0 border-white-coffee" />
            <div
              className="pt-40 pl-25 font-circular-std text-6xl font-black text-saffron"
              data-aos="fade-left"
            >
              From Concept to
              <br />
              creation, all in
              <br />
              one location
            </div>
            <div
              className="col-span-2 mb-25 mt-16 flex items-center space-x-3 font-circular-std text-6xl font-black text-saffron"
              data-aos="fade-right"
            >
              <IndyGreaterThanIcon className="scale-75 fill-saffron" />
              <span>Features</span>
            </div>
            <div className="font-circular-std text-6xl font-black text-white" data-aos="fade-right">
              All your marketing
              <br />
              needs in one
              <br />
              platform
            </div>
            <div className="space-y-4 pl-25 font-circular-std text-4xl font-black text-white">
              <div data-aos="fade-left">Summary</div>
              <div data-aos="fade-left" data-aos-delay="100">
                Login / Dashboard
              </div>
              <div data-aos="fade-left" data-aos-delay="200">
                Brief / Review Job
              </div>
              <div data-aos="fade-left" data-aos-delay="300">
                Web Template / Analytics
              </div>
              <div data-aos="fade-left" data-aos-delay="400">
                Social Media / Marketing Planner
              </div>
              <div data-aos="fade-left" data-aos-delay="500">
                Create Task / Screen Manager
              </div>
              <div data-aos="fade-left" data-aos-delay="600">
                SMS Marketing / My Files
              </div>
              <div data-aos="fade-left" data-aos-delay="700">
                Photography / Videography
              </div>
              <div data-aos="fade-left" data-aos-delay="800">
                Booking Form / Support Request
              </div>
              <div data-aos="fade-left" data-aos-delay="900">
                Review using App
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-40">
          <div className="mx-auto grid max-w-8xl place-items-center">
            <div
              className="col-span-full row-span-full mr-auto"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <Image
                src="/images/laptop-3.png"
                height={422}
                width={700}
                className="opacity-40"
                alt="web application mock"
              />
            </div>
            <div
              className="col-span-full row-span-full ml-auto"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <Image
                src="/images/laptop-4.png"
                height={422}
                width={700}
                className="opacity-40"
                alt="web application mock"
              />
            </div>
            <div className="col-span-full row-span-full">
              <Image
                src="/images/laptop-2.png"
                height={544}
                width={900}
                alt="web application mock"
              />
            </div>
            <div className="mt-12 flex w-full items-center justify-between">
              <div data-aos="fade-left" data-aos-delay="400">
                <IndyGreaterThanIcon className="rotate-180 scale-125 fill-halloween-orange" />
              </div>
              <div className="space-y-3 font-circular-std font-bold" data-aos="fade-in">
                <div className="text-center  text-5xl font-black text-deep-space-sparkle">
                  Marketing Planner
                </div>
                <div className="max-w-4xl text-justify text-xl text-onyx">
                  Um, conse laccabore volupta estrumquod qui aperror sae plitium que es et endis es
                  volupta commos molore dolupta denim ressimo luptatas accuptas coreribus repra
                </div>
              </div>
              <div data-aos="fade-right" data-aos-delay="400">
                <IndyGreaterThanIcon className="scale-125 fill-halloween-orange" />
              </div>
            </div>
          </div>
        </section>
        <section id="tutorial" className="bg-saffron py-40">
          <div className="mx-auto flex max-w-8xl space-x-15">
            <div className="flex flex-1 flex-col justify-between">
              <div
                className="flex items-center space-x-3 font-circular-std text-6xl font-black text-deep-space-sparkle"
                data-aos="fade-right"
              >
                <IndyGreaterThanIcon className="scale-75 fill-deep-space-sparkle" />
                <span>Tutorial</span>
              </div>
              <div
                className="text-justify font-circular-std text-xl font-medium text-onyx"
                data-aos="fade-right"
              >
                Um, conse laccabore volupta estrumquod qui aperror sae plitium que es et endis es
                volupta commos molore dolupta denim ressimo luptatas accuptas coreribus repra
              </div>
            </div>
            <div className="relative h-175 w-260 bg-charleston-green">
              <IndyPlusIcon className="absolute -right-5 -top-5 scale-[5] fill-halloween-orange" />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-halloween-orange py-40">
          <div className="mx-auto grid max-w-8xl grid-cols-2">
            <div>
              <div
                className="mb-25 flex items-center space-x-3 font-circular-std text-6xl font-black text-saffron"
                data-aos="fade-right"
              >
                <IndyGreaterThanIcon className="scale-75 fill-saffron" />
                <span>Contact</span>
              </div>
              <div
                className="mb-20 font-circular-std text-6xl font-black text-white"
                data-aos="fade-right"
              >
                Get in touch and
                <br />
                let us change your
                <br />
                future
              </div>
              <div
                className="grid grid-cols-2 gap-3 pr-30 [&>input]:rounded-lg [&>input]:bg-transparent [&>input]:p-5 [&>input]:font-circular-std [&>input]:text-white [&>input]:outline [&>input]:outline-2 [&>input]:outline-white/75 [&>input]:placeholder:text-white/50"
                date-aos="fade-right"
              >
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="number" placeholder="Contact No." />
                <textarea
                  className="col-span-2 resize-none rounded-lg bg-transparent p-5 font-circular-std text-white outline outline-2 outline-white/75 placeholder:text-white/50 focus:outline focus:outline-2 focus:outline-white/75"
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
            <div className="grid h-[58.5rem] place-items-center">
              <IndyGreaterThanIcon className="col-span-full row-span-full scale-[18] fill-saffron" />
              <div className="col-span-full row-span-full mr-auto mt-auto" data-aos="fade-up">
                <Image
                  src="/images/phone-1.png"
                  height={670}
                  width={330}
                  alt="web application mock"
                />
              </div>
              <div className="col-span-full row-span-full ml-auto mb-auto" data-aos="fade-down">
                <Image
                  src="/images/phone-2.png"
                  height={670}
                  width={330}
                  alt="web application mock"
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="flex items-center justify-between bg-charleston-green p-16">
          <span className="mr-auto font-circular-std text-6xl font-black text-white after:text-halloween-orange after:content-['.']">
            Indy
          </span>
          <span className="mr-10 font-circular-std font-medium text-saffron">
            PARTNERED WITH DAILY PRESS GROUP |{' '}
            <Link href="#">
              <a>FOLLOW US</a>
            </Link>{' '}
            |{' '}
            <Link href="#">
              <a>FCONTACT US</a>
            </Link>
          </span>
          <Image
            src="/images/daily-press-logo-white.png"
            height={55}
            width={55}
            alt="Daily Press"
          />
        </footer>
      </main>
    </>
  )
}

export default HomePage
