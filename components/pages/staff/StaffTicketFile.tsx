import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { TicketFile } from '../../../types/TicketFile.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { FileDisplay } from '../../FileDisplay'
import { DownloadIcon } from '../../icons/DownloadIcon'
import { Pill } from '../../Pill'
import { TitleValue } from '../../TitleValue'

export const StaffTicketFile = ({ ticketFileId }: { ticketFileId: number }) => {
  const { setHeader } = usePanelLayoutStore()

  const { data: ticketFile } = useQuery(
    ['ticketFile', ticketFileId],
    async () => {
      const { data } = await axios.get<TicketFile>(`/v1/ticket-files/${ticketFileId}`)

      return data
    },
    {
      enabled: ticketFileId !== -1,
    }
  )

  const downloadFile = () => {
    if (!!ticketFile && ticketFile?.signedUrl !== null) {
      window.open(ticketFile.signedUrl, '_blank')
      // fetch(ticketFile.signedUrl)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const url = window.URL.createObjectURL(blob)
      //     const link = document.createElement('a')
      //     link.href = url
      //     link.setAttribute('download', ticketFile.name)
      //     document.body.appendChild(link)
      //     link.click()
      //   })
    }
  }

  useEffect(() => {
    setHeader('Ticket File')
  }, [])

  return (
    <>
      {!!ticketFile && ticketFileId !== -1 && (
        <div className="mx-auto flex w-full max-w-8xl space-x-6">
          <div className="w-140 space-y-5">
            <div>
              <FileDisplay
                src={ticketFile.signedUrl}
                type={ticketFile.fileType}
                imageSize="h-144 w-144"
                imageAlt={ticketFile.name}
                videoClassName="w-140 rounded-xl"
              />
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <Card>
              <div className="space-y-2">
                <TitleValue title="ID" className="flex items-center justify-between">
                  {ticketFile.id}
                </TitleValue>
                <TitleValue title="Name" className="flex items-center justify-between">
                  {ticketFile.name}
                </TitleValue>
                <TitleValue title="Status" className="flex items-center justify-between">
                  <Pill
                    twBackgroundColor={(() => {
                      switch (ticketFile.status) {
                        case 'approved':
                          return 'bg-honeydew'
                        case 'back from review':
                          return 'bg-alice-blue'
                        case 'deleted':
                          return 'bg-light-tart-orange'
                        case 'in progress':
                          return 'bg-honeydew'
                        case 'for review':
                          return 'bg-light-navy'
                        case 'new':
                          return 'bg-alice-blue'
                      }
                    })()}
                    twTextColor={(() => {
                      switch (ticketFile.status) {
                        case 'approved':
                          return 'text-jungle-green'
                        case 'back from review':
                          return 'text-bleu-de-france'
                        case 'deleted':
                          return 'text-tart-orange'
                        case 'in progress':
                          return 'text-jungle-green'
                        case 'for review':
                          return 'text-bleu-de-france'
                        case 'new':
                          return 'text-bleu-de-france'
                      }
                    })()}
                    value={ticketFile.status}
                  />
                </TitleValue>
                <TitleValue title="Approval Status" className="flex items-center justify-between">
                  <Pill
                    twBackgroundColor={
                      ticketFile.isApproved ? 'bg-honeydew' : 'bg-light-tart-orange'
                    }
                    twTextColor={ticketFile.isApproved ? 'text-jungle-green' : 'text-tart-orange'}
                    value={ticketFile.isApproved ? 'Approved' : 'For Approval'}
                  />
                </TitleValue>
                <Button
                  ariaLabel="Download"
                  className="text-bleu-de-france"
                  type="button"
                  onClick={downloadFile}
                  light
                >
                  <DownloadIcon className="stroke-bleu-de-france" />
                  <div>Download</div>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
