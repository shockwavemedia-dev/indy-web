import axios from 'axios'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { PrinterJob } from '../../../types/PrinterJob.type'
import { Card } from '../../Card'
import { CheckboxNoFormik } from '../../CheckboxNoFormik'
import { Pill } from '../../Pill'
import { TitleValue } from '../../TitleValue'

const AdminPrinterJobPage = ({ printerId }: { printerId: number }) => {
  const { setHeader } = usePanelLayoutStore()

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
                <div className="text-sm font-medium capitalize text-onyx">{printer?.status}</div>
              </div>
              <div className="mb-5 space-y-1">
                <div className="flex space-x-2">
                  <div className=" text-sm font-medium text-halloween-orange">Price</div>
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
    </>
  )
}

AdminPrinterJobPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default AdminPrinterJobPage
