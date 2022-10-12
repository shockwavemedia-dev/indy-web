import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { LinkButton } from '../../components/LinkButton'
import { Select } from '../../components/Select'
import { SelectNoFormik } from '../../components/SelectNoFormik'
import { TextAreaInput } from '../../components/TextAreaInput'
import { TextInput } from '../../components/TextInput'
import { PrinterProductOptions } from '../../constants/options/printer/PrinterProductOptions'
import { PrinterStatusOptions } from '../../constants/options/printer/PrinterStatusOptions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { useToastStore } from '../../store/ToastStore'
import { EditPrinterJobForm } from '../../types/forms/EditPrinterJobForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { PrinterJob } from '../../types/PrinterJob.type'
import { SelectOption } from '../../types/SelectOption.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'

const PrinterPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: printer } = useQuery(
    ['printer', Number(id)],
    async () => {
      const { data } = await axios.get<PrinterJob>(`/v1/printer-jobs/${id}`)
      return data
    },
    {
      enabled: !!id,
    }
  )

  const submitForm = async (values: EditPrinterJobForm) => {
    const additionalOptions = [
      { quantity: values.rubberBunds ? values.rubberBunds : 0, title: 'Bundling - Rubber Bands' },
      {
        quantity: values.shrinkwrapping ? values.shrinkwrapping : 0,
        title: 'Bundling - Shrink Wrapping',
      },
      {
        quantity: values.drilling ? values.drilling : 0,
        title: 'Drilling - up to 5 X 4-6mm holes (specify in notes)',
      },
      {
        quantity: values.padding ? values.padding : 0,
        title: 'Padding - Inc BoxBoard (Number of Pads)',
      },
      { quantity: values.perforate ? values.perforate : 0, title: 'Perforate' },
    ]
    values.additionalOptions = additionalOptions

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
      setHeader(`Print Order ${printer.customerName}`)
    }
  }, [printer])

  if (!printer) return null

  const rubberBunds = printer.additionalOptions?.filter(
    (option) => option.title === 'Bundling - Rubber Bands'
  )
  const shrinkwrapping = printer.additionalOptions?.filter(
    (option) => option.title === 'Bundling - Shrink Wrapping'
  )
  const perforate = printer.additionalOptions?.filter((option) => option.title === 'Perforate')
  const padding = printer.additionalOptions?.filter(
    (option) => option.title === 'Padding - Inc BoxBoard (Number of Pads)'
  )
  const drilling = printer.additionalOptions?.filter(
    (option) => option.title === 'Drilling - up to 5 X 4-6mm holes (specify in notes)'
  )

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
                  <SelectNoFormik
                    label="Status"
                    name="status"
                    Icon={ClipboardIcon}
                    options={PrinterStatusOptions}
                    defaultValue={PrinterStatusOptions.find(
                      ({ value }) => value === printer?.status
                    )}
                    onChange={updateStatus}
                    className="mb-5"
                  />
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Customer
                  </div>
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Customer"
                    name="customerName"
                    className="mb-5"
                  />
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Specifications
                  </div>
                  <Select
                    label="Product"
                    name="product"
                    Icon={ClipboardIcon}
                    options={PrinterProductOptions}
                    defaultValue={PrinterProductOptions.find(
                      ({ value }) => value === printer?.product
                    )}
                    className="mb-5"
                  />
                  <div className="mb-8 flex space-x-5">
                    <Select
                      label="Option"
                      name="option"
                      Icon={ClipboardIcon}
                      options={PrinterProductOptions}
                      defaultValue={PrinterProductOptions.find(
                        ({ value }) => value === printer?.option
                      )}
                    />
                    <Select
                      label="Format"
                      name="format"
                      Icon={ClipboardIcon}
                      options={PrinterProductOptions}
                      defaultValue={PrinterProductOptions.find(
                        ({ value }) => value === printer?.format
                      )}
                    />
                  </div>

                  <div className="mb-8 flex space-x-5">
                    <TextInput
                      label="Kinds"
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Kinds"
                      name="kinds"
                    />
                    <TextInput
                      label="Quantity"
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Quantity"
                      name="quantity"
                    />
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <TextInput
                      label="Run Ons"
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Run Ons"
                      name="runOns"
                    />
                    <Select
                      label="Status"
                      name="status"
                      Icon={ClipboardIcon}
                      options={PrinterProductOptions}
                      defaultValue={PrinterProductOptions.find(
                        ({ value }) => value === printer?.format
                      )}
                    />
                  </div>
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Additional Options
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <TextInput
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Rubber Bands"
                      name="rubberBunds"
                      label="Bundling - Rubber Bands"
                    />
                    <TextInput
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Shrink Wrapping"
                      name="shrinkwrapping"
                      label="Bundling - Shrink Wrapping"
                    />
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <TextInput
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Perforate"
                      name="perforate"
                      label="Perforate"
                    />
                    <TextInput
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Padding"
                      name="padding"
                      label="Padding - Inc BoxBoard (Number of Pads)"
                    />
                  </div>
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Drilling"
                    name="drilling"
                    label="Drilling - up to 5 X 4-6mm holes (specify in notes)"
                    className="mb-5"
                  />
                </Card>
                <div className="flex w-9/12  flex-col">
                  <Card className="mb-8 h-fit">
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                      Delivery
                    </div>
                    <Select
                      label="Delivery"
                      name="delivery"
                      Icon={ClipboardIcon}
                      options={PrinterProductOptions}
                      defaultValue={PrinterProductOptions.find(
                        ({ value }) => value === printer?.delivery
                      )}
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <Checkbox name="blindShipping" label="Blind Shipping" />
                      <Checkbox name="resellerSamples" label="Reseller Samples" />
                    </div>
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                      Reference
                    </div>
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Reference"
                      name="reference"
                      className="mb-5"
                    />
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                      Notes
                    </div>
                    <TextAreaInput
                      Icon={EditIcon}
                      placeholder="Enter Notes"
                      name="notes"
                      className="mb-5"
                    />
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                      Description
                    </div>
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Description"
                      name="description"
                      className="mb-5"
                    />
                  </Card>
                  <Card className="h-fit">
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/print" light />
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

PrinterPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterPage
