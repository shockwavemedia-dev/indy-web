import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { TicketFile } from '../../../types/TicketFile.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { FileDisplay } from '../../FileDisplay'
import { CheckIcon } from '../../icons/CheckIcon'
import { DownloadIcon } from '../../icons/DownloadIcon'
import { PrintIcon } from '../../icons/PrintIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import {
  CreatePrinterJobModal,
  useCreatePrinterJobModalStore,
} from '../../modals/CreatePrinterJobModal'
import {
  RequestRevisionTicketFileModal,
  useRevisionRequestRevisionTicketFileModal,
} from '../../modals/RequestRevisionTicketFileModal'
import { Pill } from '../../Pill'
import { TitleValue } from '../../TitleValue'

export const ClientTicketFile = ({ ticketFileId }: { ticketFileId: number }) => {
  const { showToast } = useToastStore()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { data: session } = useSession()

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

  // const { data: fileFeedbacks } = useQuery(
  //   ['fileFeedbacks', ticketFileId],
  //   async () => {
  //     const {
  //       data: { data },
  //     } = await axios.get<{
  //       data: Array<TicketFileFeedback>
  //       page: Page
  //     }>(`/v1/ticket-files/${ticketFileId}/feedbacks`)

  //     return data
  //   },
  //   {
  //     enabled: ticketFileId !== -1,
  //   }
  // )

  const { toggleModal: toggleCreatePrinterJobModal } = useCreatePrinterJobModalStore()

  const { toggleModal: toggleRequestRevisionTicketFileModal } =
    useRevisionRequestRevisionTicketFileModal()

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

  // const submitForm = async (
  //   values: CreateFileFeedbackForm,
  //   { resetForm }: { resetForm: () => void }
  // ) => {
  //   try {
  //     const { status } = await axios.post(
  //       `/v1/ticket-files/${ticketFileId}/feedbacks`,
  //       objectWithFileToFormData(values)
  //     )

  //     if (status === 200) {
  //       queryClient.invalidateQueries(['fileFeedbacks', ticketFileId])
  //       resetForm()
  //       showToast({
  //         type: 'success',
  //         message: 'Feedback sent!',
  //       })
  //     }
  //   } catch (e) {
  //     showToast({
  //       type: 'error',
  //       message: get422And400ResponseError(e),
  //     })
  //   }
  // }

  const approveTicketFile = async () => {
    try {
      const { status } = await axios.post(`/v1/ticket-files/${ticketFileId}/approve`)

      if (status === 200) {
        queryClient.invalidateQueries(['ticketFile', ticketFileId])
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  // const removeTicketFile = async () => {
  //   try {
  //     const { status } = await axios.delete(`/v1/ticket-files/${ticketFileId}`)

  //     if (status === 200) {
  //       replace('/dashboard')
  //     }
  //   } catch (e) {
  //     showToast({
  //       type: 'error',
  //       message: get422And400ResponseError(e),
  //     })
  //   }
  // }

  useEffect(() => {
    setHeader('Ticket File')
  }, [])

  return (
    <>
      {!!ticketFile && ticketFileId !== -1 && (
        <div className="mx-auto flex w-full max-w-8xl space-x-6">
          <div className="w-175 space-y-5">
            <div>
              <FileDisplay
                src={ticketFile.signedUrl}
                type={ticketFile.fileType}
                imageSize="h-175 w-175"
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

                <div className="flex space-x-5">
                  {ticketFile.status === 'new' && (
                    <Button
                      className="w-1/2 text-bleu-de-france"
                      ariaLabel="Approve Ticket File"
                      type="button"
                      onClick={approveTicketFile}
                      light
                    >
                      <CheckIcon className="stroke-forest-green" />
                      <div className="stroke-forest-green text-forest-green">Approve</div>
                    </Button>
                  )}
                  {ticketFile.status === 'new' && (
                    <Button
                      ariaLabel="Request Edit"
                      type="button"
                      className="w-1/2 stroke-light-red-crimson"
                      onClick={() => {
                        toggleRequestRevisionTicketFileModal(ticketFile)
                      }}
                      light
                    >
                      <TrashIcon className="stroke-red-crimson" />
                      <div className="stroke-light-red-crimson text-red-crimson">Request Edit</div>
                    </Button>
                  )}
                </div>
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Download"
                    className="w-1/2 text-bleu-de-france"
                    type="button"
                    onClick={downloadFile}
                    light
                  >
                    <DownloadIcon className="stroke-bleu-de-france" />
                    <div>Download</div>
                  </Button>
                  {ticketFile.isApproved && (
                    <Button
                      type="button"
                      className="w-1/2 stroke-orchid"
                      ariaLabel="Print"
                      onClick={() => {
                        toggleCreatePrinterJobModal(
                          session!.user.userType.client.id,
                          ticketFile.fileId
                        )
                      }}
                      light
                    >
                      <PrintIcon className="stroke-orchid" />
                      <div className="text-orchid">Print</div>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      <CreatePrinterJobModal />
      <RequestRevisionTicketFileModal />
    </>
  )
}
