import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Checkbox } from '../components/Checkbox'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { LinkButton } from '../components/LinkButton'
import { Select } from '../components/Select'
import { TextAreaInput } from '../components/TextAreaInput'
import { TextInput } from '../components/TextInput'
import { PrinterDeliveryOptions } from '../constants/options/printer/PrinterDeliveryOptions'
import { PrinterOptions } from '../constants/options/printer/PrinterOptions'
import { PrinterProductOptions } from '../constants/options/printer/PrinterProductOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { NewPrinterForm } from '../types/forms/NewPrinterForm.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SelectOption } from '../types/SelectOption.type'
import { get422And400ResponseError } from '../utils/ErrorHelpers'

const NewPrinterPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [option, setOption] = useState<Array<{ label: string; value: string }>>([])
  const [format, setFormat] = useState<Array<{ label: string; value: string }>>([])

  const submitForm = async (values: NewPrinterForm) => {
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
      const { status } = await axios.post<NewPrinterForm>(
        `/v1/clients/${session?.user.userType.client.id}/printer-jobs`,
        values
      )
      if (status === 200) {
        queryClient.invalidateQueries(['printerJobs'])
        replace('/printer-jobs')
        showToast({
          type: 'success',
          message: `New Printer Order successfully created!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  const updateFilter = (newValue: SingleValue<SelectOption<string>>) => {
    const filterProduct = PrinterOptions?.filter((option) => option.product === newValue?.value)

    const option =
      filterProduct[0].option.map((name) => ({
        label: name,
        value: name,
      })) ?? []

    const format =
      filterProduct[0].format.map((name) => ({
        label: name,
        value: name,
      })) ?? []

    setOption(option)
    setFormat(format)
  }

  useEffect(() => {
    setHeader('New Printer')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - New Printer Order</title>
      </Head>
      <div className="mx-auto w-full">
        <Formik
          initialValues={{
            customerName: '',
            product: '',
            option: '',
            kinds: '',
            quantity: '',
            runOns: '',
            format: '',
            finalTrimSize: '',
            reference: '',
            notes: '',
            additionalOptions: [],
            delivery: '',
            price: '',
            blindShipping: false,
            resellerSamples: false,
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex w-full">
                <Card className="mr-8 h-fit w-9/12">
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
                    onChange={updateFilter}
                    className="mb-5"
                  />
                  <div className="mb-8 flex space-x-5">
                    <Select label="Option" name="option" Icon={ClipboardIcon} options={option} />
                    <Select label="Format" name="format" Icon={ClipboardIcon} options={format} />
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
                      options={PrinterDeliveryOptions}
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
                      <LinkButton title="Cancel" href="/printer-jobs" light />
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Order</div>
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

NewPrinterPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewPrinterPage
