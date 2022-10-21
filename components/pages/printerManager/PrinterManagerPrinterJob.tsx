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
import { CheckboxNoFormik } from '../../CheckboxNoFormik'
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
  const { setHeader } = usePanelLayoutStore()
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
      setHeader(`Printer Job ${printer.customerName}`)
    }
  }, [printer])
  if (!printer) return null

  return (
    <>
      <Head>
        <title>{`Indy - ${printer?.customerName}`}</title>
      </Head>
      <div className="mx-auto flex w-full">
        <Card title="Printer Job Details" className="w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Printer</div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.printer !== null ? printer?.printer.companyName : 'No Printer Selected'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Customer</div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.customerName}
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
              <TitleValue title="Option" className="capitalize">
                {printer?.option}
              </TitleValue>
              <TitleValue title="Format" className="capitalize">
                {printer?.format}
              </TitleValue>
              <TitleValue title="Kinds" className="capitalize">
                {printer?.kinds}
              </TitleValue>
              <TitleValue title="Quantity" className="capitalize">
                {printer?.quantity}
              </TitleValue>
              <TitleValue title="Run Ons" className="capitalize">
                {printer?.runOns}
              </TitleValue>
            </div>
            <div className="space-y-4">
              {printer?.additionalOptions && printer?.additionalOptions?.length > 0 && (
                <div className="space-y-4">
                  <div className=" text-sm font-medium text-halloween-orange">
                    Additional Options
                  </div>
                  {printer?.additionalOptions?.map(({ title, quantity }) => (
                    <TitleValue key={title} title={title ? title : ''}>
                      {quantity}
                    </TitleValue>
                  ))}
                </div>
              )}
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">To Venue</div>
                <div className="text-sm font-medium capitalize text-onyx">{printer?.delivery}</div>
              </div>
              <div className="mb-5 flex space-x-5">
                <CheckboxNoFormik
                  label="Blind Shipping"
                  className="pointer-events-none"
                  checked={printer.blindShipping}
                />
                <CheckboxNoFormik
                  label="Reseller Samples"
                  className="pointer-events-none"
                  checked={printer.resellerSamples}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Reference</div>
                <div className="text-sm font-medium capitalize text-onyx">{printer?.reference}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Notes</div>
                <div className="text-sm font-medium capitalize text-onyx">{printer?.notes}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-halloween-orange">Description</div>
                <div className="text-sm font-medium capitalize text-onyx">
                  {printer?.description}
                </div>
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
