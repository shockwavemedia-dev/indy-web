import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { PrinterStatusOptions } from '../../../constants/options/printer/PrinterStatusOptions'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { EditPrinterJobForm } from '../../../types/forms/EditPrinterJobForm.type'
import { PrinterJob } from '../../../types/PrinterJob.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { Checkbox } from '../../Checkbox'
import { ClipboardIcon } from '../../icons/ClipboardIcon'
import { DollarIcon } from '../../icons/DollarIcon'
import { FloppyDiskIcon } from '../../icons/FloppyDiskIcon'
import { LinkButton } from '../../LinkButton'
import { SelectNoFormik } from '../../SelectNoFormik'
import { TextInput } from '../../TextInput'
import { TitleValue } from '../../TitleValue'

const PrinterManagerPrinterJobPage = ({ printerId }: { printerId: number }) => {
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

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

  const submitForm = async (values: EditPrinterJobForm) => {
    try {
      const { status } = await axios.put(`/v1/printer-jobs/${printer?.id}`, values)
      if (status === 200) {
        queryClient.invalidateQueries(['printer', printer?.id])
        queryClient.invalidateQueries(['printerJobs'])
        showToast({
          type: 'success',
          message: `All changes was successfully saved!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

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

  const rubberBunds = printer?.additionalOptions?.filter(
    (option) => option.title === 'Bundling - Rubber Bands'
  )
  const shrinkwrapping = printer?.additionalOptions?.filter(
    (option) => option.title === 'Bundling - Shrink Wrapping'
  )
  const perforate = printer?.additionalOptions?.filter((option) => option.title === 'Perforate')
  const padding = printer?.additionalOptions?.filter(
    (option) => option.title === 'Padding - Inc BoxBoard (Number of Pads)'
  )
  const drilling = printer?.additionalOptions?.filter(
    (option) => option.title === 'Drilling - up to 5 X 4-6mm holes (specify in notes)'
  )

  if (!printer) return null

  return (
    <>
      <Head>
        <title>{`Indy - ${printer?.customerName}`}</title>
      </Head>
      <div className="mx-auto w-full">
        <Formik
          initialValues={{
            customerName: printer?.customerName,
            product: printer?.product,
            option: printer?.option,
            kinds: printer?.kinds,
            quantity: printer?.quantity,
            runOns: printer?.runOns,
            format: printer?.format,
            finalTrimSize: printer?.finalTrimSize,
            reference: printer?.reference,
            notes: printer?.notes,
            additionalOptions: printer?.additionalOptions,
            delivery: printer?.delivery,
            price: printer?.price,
            blindShipping: printer?.blindShipping,
            resellerSamples: printer?.resellerSamples,
            status: printer?.status,
            rubberBunds: rubberBunds?.[0].quantity,
            shrinkwrapping: shrinkwrapping?.[0].quantity,
            perforate: perforate?.[0].quantity,
            padding: padding?.[0].quantity,
            drilling: drilling?.[0].quantity,
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex w-full">
                <Card className="mr-8 h-fit w-9/12">
                  <div className="mb-2 w-fit text-base font-semibold text-halloween-orange">
                    Printer
                  </div>
                  <div className="mb-5 w-fit text-sm font-medium">
                    {printer?.printer !== null
                      ? printer?.printer.companyName
                      : 'No Printer Selected'}
                  </div>
                  <div className="mb-2 w-fit text-base font-semibold text-halloween-orange">
                    Status
                  </div>
                  <SelectNoFormik
                    name="status"
                    Icon={ClipboardIcon}
                    options={PrinterStatusOptions}
                    defaultValue={PrinterStatusOptions.find(
                      ({ value }) => value === printer?.status
                    )}
                    onChange={updateStatus}
                    className="mb-5"
                  />
                  <div className="mb-2 w-fit text-base font-semibold text-halloween-orange">
                    Price
                  </div>
                  <TextInput
                    type="text"
                    Icon={DollarIcon}
                    placeholder="Enter Price"
                    name="price"
                    className="mb-5"
                  />
                  <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                    Customer
                  </div>
                  <div className="mb-5 text-sm font-medium capitalize text-onyx">
                    {printer?.customerName}
                  </div>
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Specifications
                  </div>
                  <div className="space-y-4">
                    <TitleValue title="Product" className="mb-5 capitalize">
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
                  {printer?.additionalOptions && printer?.additionalOptions?.length > 0 && (
                    <div className="space-y-4">
                      <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                        Additional Options
                      </div>
                      {printer?.additionalOptions?.map(({ title, quantity }) => (
                        <TitleValue key={title} title={title ? title : ''}>
                          {quantity}
                        </TitleValue>
                      ))}
                    </div>
                  )}
                </Card>
                <div className="flex w-9/12  flex-col">
                  <Card className="mb-8 h-fit">
                    <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                      Delivery
                    </div>
                    <div className="mb-5 text-sm font-medium capitalize text-onyx">
                      {printer?.delivery}
                    </div>
                    <div className="mb-5 flex space-x-5">
                      <Checkbox
                        className="pointer-events-none"
                        name="blindShipping"
                        label="Blind Shipping"
                      />
                      <Checkbox
                        className="pointer-events-none"
                        name="resellerSamples"
                        label="Reseller Samples"
                      />
                    </div>
                    <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                      Reference
                    </div>
                    <div className="mb-5 text-sm font-medium capitalize text-onyx">
                      {printer?.reference}
                    </div>
                    <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                      Notes
                    </div>
                    <div className="mb-5 text-sm font-medium capitalize text-onyx">
                      {printer?.notes}
                    </div>
                    <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                      Description
                    </div>
                    <div className="mb-5 text-sm font-medium capitalize text-onyx">
                      {printer?.description}
                    </div>
                  </Card>
                  <Card className="h-fit">
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/dashboard" light />
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Update Order</div>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

PrinterManagerPrinterJobPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterManagerPrinterJobPage
