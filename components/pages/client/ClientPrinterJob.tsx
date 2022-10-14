import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { PrinterDeliveryOptions } from '../../../constants/options/printer/PrinterDeliveryOptions'
import { PrinterOptions } from '../../../constants/options/printer/PrinterOptions'
import { PrinterProductOptions } from '../../../constants/options/printer/PrinterProductOptions'
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
import { EditIcon } from '../../icons/EditIcon'
import { FloppyDiskIcon } from '../../icons/FloppyDiskIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import { LinkButton } from '../../LinkButton'
import {
  DeletePrinterJobModal,
  useDeleteDeletePrinterJobModalModalStore,
} from '../../modals/DeletePrinterJobModal'
import { Select } from '../../Select'
import { SelectNoFormik } from '../../SelectNoFormik'
import { TextAreaInput } from '../../TextAreaInput'
import { TextInput } from '../../TextInput'

const ClientPrinterJobPage = ({ printerId }: { printerId: number }) => {
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { toggleModal: togglePrinterModal } = useDeleteDeletePrinterJobModalModalStore()
  const [optionSelect, setOption] = useState<Array<{ label: string; value: string }>>([])
  const [formatSelect, setFormat] = useState<Array<{ label: string; value: string }>>([])

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
    if (printer && printer.product !== null) {
      const filterProduct = PrinterOptions?.filter((option) => option.product === printer.product)

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
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex w-full">
                <Card className="mr-8 h-fit w-9/12">
                  <div className="absolute top-6 right-6 space-x-2">
                    <Tooltip title="Delete" placement="top">
                      <button
                        type="button"
                        className="group"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePrinterModal(printer)
                        }}
                      >
                        <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
                      </button>
                    </Tooltip>
                  </div>
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
                  <SelectNoFormik
                    label="Product"
                    name="product"
                    Icon={ClipboardIcon}
                    options={PrinterProductOptions}
                    onChange={(product: SingleValue<SelectOption<string>>) => {
                      setFieldValue('product', product?.value)
                      updateFilter(product)
                    }}
                    defaultValue={PrinterProductOptions.find(
                      ({ value }) => value === printer?.product
                    )}
                    className="mb-5"
                  />
                  <div className="mb-8 flex space-x-5">
                    <SelectNoFormik
                      label="Option"
                      name="option"
                      Icon={ClipboardIcon}
                      options={optionSelect}
                      onChange={(option: SingleValue<SelectOption<string>>) => {
                        setFieldValue('option', option?.value)
                      }}
                      defaultValue={optionSelect.find(({ value }) => value === printer?.option)}
                    />
                    <SelectNoFormik
                      label="Format"
                      name="format"
                      Icon={ClipboardIcon}
                      options={formatSelect}
                      onChange={(format: SingleValue<SelectOption<string>>) => {
                        setFieldValue('format', format?.value)
                      }}
                      defaultValue={formatSelect.find(({ value }) => value === printer?.format)}
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
                      <LinkButton title="Cancel" href="/printer-jobs" light />
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
      <DeletePrinterJobModal />
    </>
  )
}

ClientPrinterJobPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientPrinterJobPage
