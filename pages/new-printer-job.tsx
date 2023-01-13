import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { FileDropZone } from '../components/FileDropZone'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { LinkButton } from '../components/LinkButton'
import { Select } from '../components/Select'
import { SelectNoFormik } from '../components/SelectNoFormik'
import { TextAreaInput } from '../components/TextAreaInput'
import { TextInput } from '../components/TextInput'
import { CodingOptions } from '../constants/options/printer/CodingOptions'
import { FormatOptions } from '../constants/options/printer/FormatOptions'
import { OptionOptions } from '../constants/options/printer/OptionOptions'
import { PrinterProductOptions } from '../constants/options/printer/PrinterProductOptions'
import { StockOptions } from '../constants/options/printer/StockOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { NewPrinterForm } from '../types/forms/NewPrinterForm.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SelectOption } from '../types/SelectOption.type'
import { get422And400ResponseError } from '../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewPrinterPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

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
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries(['printerJobs'])
        replace('/print')
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

  useEffect(() => {
    setHeader('New Printer')
    setCrumbsNavigation([])
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
            delivery: 'To Venue',
            price: '',
            blindShipping: false,
            resellerSamples: false,
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex w-full">
                <Card className="mr-8 h-fit w-9/12">
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Description
                  </div>
                  <TextAreaInput
                    Icon={EditIcon}
                    placeholder="Enter Description"
                    name="description"
                    className="mb-5"
                  />
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Specifications
                  </div>
                  <SelectNoFormik
                    label="Product"
                    name="product"
                    Icon={ClipboardIcon}
                    options={PrinterProductOptions}
                    onChange={(product: SingleValue<SelectOption<string>>) => {
                      setFieldValue('product', product?.value)
                    }}
                    className="mb-5"
                  />
                  <div className="mb-8 flex space-x-5">
                    <Select
                      label="Option"
                      name="option"
                      Icon={ClipboardIcon}
                      options={OptionOptions}
                      className="mb-5"
                    />
                    <Select
                      label="Format"
                      name="format"
                      Icon={ClipboardIcon}
                      options={FormatOptions}
                      className="mb-5"
                    />
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <Select
                      label="Stocks"
                      name="stocks"
                      Icon={ClipboardIcon}
                      options={StockOptions}
                      className="mb-5"
                    />
                    <Select
                      label="Coding"
                      name="coding"
                      Icon={ClipboardIcon}
                      options={CodingOptions}
                      className="mb-5"
                    />
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <TextInput
                      label="Quantity"
                      type="number"
                      Icon={EditIcon}
                      placeholder="Enter Number"
                      name="quantity"
                    />
                  </div>
                </Card>
                <div className="flex w-9/12  flex-col">
                  <Card className="mb-8 h-fit">
                    <div className="mb-3 w-fit text-base font-semibold text-halloween-orange">
                      Delivery
                    </div>
                    <TextAreaInput
                      Icon={EditIcon}
                      label="Address"
                      placeholder="Enter Address"
                      name="address"
                      className="mb-5"
                    />
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                      Purchase Order Number or Name
                    </div>
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Purchase Order Number or Name"
                      name="purchaseOrderNumber"
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
                      Attachments
                    </div>
                    <FileDropZone
                      label="Upload"
                      name="attachments"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                      multiple
                      className="mb-8"
                    />
                  </Card>
                  <Card className="h-fit">
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/print" light />
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Quote/Order</div>
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
