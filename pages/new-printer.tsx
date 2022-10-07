import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { LinkButton } from '../components/LinkButton'
import { Select } from '../components/Select'
import { TextInput } from '../components/TextInput'
import { PrinterProductOptions } from '../constants/options/PrinterProductOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { NewPrinterForm } from '../types/forms/NewPrinterForm.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { get422And400ResponseError } from '../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../utils/FormHelpers'
const NewPrinterPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const submitForm = async (values: NewPrinterForm) => {
    try {
      const { status } = await axios.post<NewPrinterForm>(
        `/v1/clients/${session?.user.userType.client.id}/printer-jobs`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries('printers')
        replace('/printer')
        showToast({
          type: 'success',
          message: `New Printer successfully created!`,
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
  }, [])

  return (
    <>
      <Head>
        <title>Indy - New Printer</title>
      </Head>
      <div className="mx-auto w-full">
        <Formik
          initialValues={{
            printerId: -1,
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
            additionalOptions: '',
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
                    name="customer"
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
                    className="mb-5"
                  />
                  <Select
                    label="Option"
                    name="option"
                    Icon={ClipboardIcon}
                    options={PrinterProductOptions}
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Kinds"
                    name="kinds"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Quantity"
                    name="quantity"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Run Ons"
                    name="runOns"
                    className="mb-5"
                  />
                  <Select
                    label="Format"
                    name="format"
                    Icon={ClipboardIcon}
                    options={PrinterProductOptions}
                    className="mb-5"
                  />
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Additional Options
                  </div>
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Bundling - Rubber Bands"
                    name="additionalOptions"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Bundling - Shrink Wrapping"
                    name="additionalOptions"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Drilling - up to 5 X 4-6mm holes (specify in notes)"
                    name="additionalOptions"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Padding - Inc BoxBoard (Number of Pads)"
                    name="additionalOptions"
                    className="mb-5"
                  />
                  <TextInput
                    type="number"
                    Icon={EditIcon}
                    placeholder="Enter Perforate"
                    name="additionalOptions"
                    className="mb-5"
                  />
                </Card>
                <div className="flex w-9/12  flex-col">
                  <Card className="mb-8 h-fit">
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
                    <TextInput
                      type="text"
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
                      <LinkButton title="Save" href="/printer" light />
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
