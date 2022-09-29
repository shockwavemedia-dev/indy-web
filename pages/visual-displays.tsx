import Head from 'next/head'
import { default as Image } from 'next/image'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import {
  ImageFileDisplayModal,
  useImageFileDisplayModalStore,
} from '../components/modals/ImageFileDisplayModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { VisualDisplayList } from '../constants/options/VisualDisplayList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const VisualDisplaysPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { toggleShowImageFileModal } = useImageFileDisplayModalStore()

  useEffect(() => {
    setHeader('Visual Displays')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Visual Displays</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex space-x-6">
          <Card className="h-fit w-full min-w-0 flex-1">
            <div className="flex h-fit w-fit grid-cols-2 flex-wrap place-content-center gap-5">
              {VisualDisplayList?.map(({ image, name }) => {
                const toggleFile = () => toggleShowImageFileModal(image, name)

                return (
                  <button type="button" key={`${name}-visual`} onClick={toggleFile}>
                    <Image className="rounded-xl" src={image} height={166} width={214} alt={name} />
                  </button>
                )
              })}
            </div>
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
      <ImageFileDisplayModal />
    </>
  )
}

VisualDisplaysPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default VisualDisplaysPage
