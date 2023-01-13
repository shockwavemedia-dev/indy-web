import { Tooltip } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { PrinterStatusOptions } from '../../../constants/options/printer/PrinterStatusOptions'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { PrinterJob } from '../../../types/PrinterJob.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { Card } from '../../Card'
import { FileDisplay } from '../../FileDisplay'
import { ClipboardIcon } from '../../icons/ClipboardIcon'
import { EditIcon } from '../../icons/EditIcon'
import {
  AddPrinterJobPriceModal,
  useAddPrinterJoPricebModalModalStore,
} from '../../modals/AddPrinterJobPriceModal'
import { Pill } from '../../Pill'
import { SelectNoFormik } from '../../SelectNoFormik'
import { TitleValue } from '../../TitleValue'

const PrinterManagerPrinterJobPage = ({ printerId }: { printerId: number }) => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { toggleModal: togglePrinterJobPriceModal } = useAddPrinterJoPricebModalModalStore()

  const { data: printer } = useQuery(
    ['printer', printerId],
    async () => {
      const { data } = await axios.get<PrinterJob>(`/v1/printer-jobs/${printerId}`)
      return data
    },
    {
      enabled: !!printerId,
    }
  )

  const updateStatus = async (newValue: SingleValue<SelectOption<string>>) => {
    try {
      const { status } = await axios.put(`/v1/printer-jobs/${printer?.id}/change-status`, {
        status: newValue?.value,
      })
      if (status === 200) {
        queryClient.invalidateQueries(['printer', printer?.id])
        queryClient.invalidateQueries(['printerJobs'])
        showToast({
          type: 'success',
          message: `Status successfully saved!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  useEffect(() => {
    if (printer) {
      setHeader(`Print`)
      setCrumbsNavigation([])
    }
  }, [printer])
  if (!printer) return null

  return (
    <>
      <Head>
        <title>Indy Print</title>
      </Head>
      <div className="mx-auto flex w-full">
        <Card title="Print Details" className="w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Printer</div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.printer !== null ? printer?.printer.companyName : 'No Printer Selected'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Description</div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.description}
                </div>
              </div>
              <div className="space-y-1">
                <div className=" text-sm font-medium text-halloween-orange">Status</div>
                {printer?.isApproved && printer?.isApproved === 1 ? (
                  <SelectNoFormik
                    Icon={ClipboardIcon}
                    options={PrinterStatusOptions}
                    defaultValue={PrinterStatusOptions.find(
                      ({ value }) => value === printer?.status
                    )}
                    onChange={updateStatus}
                    className="mb-5 mt-3 !w-2/4"
                  />
                ) : (
                  <div className="text-sm font-medium capitalize text-onyx">{printer?.status}</div>
                )}
              </div>
              <div className="mb-5 space-y-1">
                <div className="flex space-x-2">
                  <div className=" text-sm font-medium text-halloween-orange">Price</div>
                  {printer?.isApproved === null && (
                    <Tooltip title="Add/Update Price" placement="top">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePrinterJobPriceModal(printer)
                        }}
                        className="group"
                      >
                        <EditIcon className="stroke-bright-navy-blue group-hover:stroke-halloween-orange" />
                      </button>
                    </Tooltip>
                  )}
                </div>

                <div className="flex space-x-2">
                  <div className="text-sm font-medium capitalize text-onyx">{printer?.price}</div>
                  {printer?.price && printer?.price !== null ? (
                    <Pill
                      twBackgroundColor={(() => {
                        switch (printer?.isApproved) {
                          case 1:
                            return 'bg-honeydew'
                          case null:
                            return 'bg-light-golden-rod'
                          case 0:
                            return 'bg-light-tart-orange'
                        }
                      })()}
                      twTextColor={(() => {
                        switch (printer?.isApproved) {
                          case 1:
                            return 'text-jungle-green'
                          case null:
                            return 'text-golden-rod'
                          case 0:
                            return 'text-tart-orange'
                        }
                      })()}
                      value={(() => {
                        switch (printer?.isApproved) {
                          case 1:
                            return 'Approved'
                          case null:
                            return 'Awaiting Acceptance'
                          case 0:
                            return 'Declined'
                        }
                      })()}
                    />
                  ) : (
                    <Pill
                      twBackgroundColor="bg-light-deep-saffron"
                      twTextColor="text-deep-saffron"
                      value="No Price Offered Yet"
                    />
                  )}
                </div>
              </div>
              <div className=" text-sm font-medium text-halloween-orange">Specifications</div>
              <TitleValue title="Product" className="capitalize">
                {printer?.product}
              </TitleValue>
              <TitleValue title="Stocks" className="capitalize">
                {printer?.stocks}
              </TitleValue>
              <TitleValue title="Coding" className="capitalize">
                {printer?.coding}
              </TitleValue>
              <TitleValue title="Quantity" className="capitalize">
                {printer?.quantity}
              </TitleValue>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Delivery</div>
                <TitleValue title="Address" className="capitalize">
                  {printer?.address}
                </TitleValue>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">
                  Purchase Order Number or Name
                </div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.purchaseOrderNumber}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Notes</div>
                <div className="text-sm font-medium capitalize text-onyx">{printer?.notes}</div>
              </div>
              <div className="text-sm font-medium text-halloween-orange">Attachment</div>
              <div className="flex h-fit w-257.5 flex-wrap gap-5">
                {!!printer!.attachments && printer!.attachments?.length > 0 ? (
                  printer!.attachments?.map((attachment) => (
                    <FileDisplay
                      key={`attachment-${attachment.url}`}
                      src={attachment.url}
                      type={attachment.fileType}
                      imageSize="h-44 w-44"
                      imageAlt={attachment.url}
                      href={attachment.url}
                      videoClassName="h-44 w-78.5 cursor-pointer rounded-xl"
                      failedToLoadClassName="h-44 w-78.5"
                    />
                  ))
                ) : (
                  <div className=" text-xs text-metallic-silver">No attachment to display.</div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <AddPrinterJobPriceModal />
    </>
  )
}

PrinterManagerPrinterJobPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterManagerPrinterJobPage
