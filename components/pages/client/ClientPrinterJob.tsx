import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { CodingOptions } from '../../../constants/options/printer/CodingOptions'
import { PrinterOptions } from '../../../constants/options/printer/PrinterOptions'
import { PrinterProductOptions } from '../../../constants/options/printer/PrinterProductOptions'
import { PrinterStatusOptions } from '../../../constants/options/printer/PrinterStatusOptions'
import { StockOptions } from '../../../constants/options/printer/StockOptions'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { EditPrinterJobForm } from '../../../types/forms/EditPrinterJobForm.type'
import { PrinterJob } from '../../../types/PrinterJob.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { CheckIcon } from '../../icons/CheckIcon'
import { ClipboardIcon } from '../../icons/ClipboardIcon'
import { CloseModalIcon } from '../../icons/CloseModalIcon'
import { DollarIcon } from '../../icons/DollarIcon'
import { EditIcon } from '../../icons/EditIcon'
import { FloppyDiskIcon } from '../../icons/FloppyDiskIcon'
import { PlusIcon } from '../../icons/PlusIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import { LinkButton } from '../../LinkButton'
import {
  DeletePrinterJobModal,
  useDeleteDeletePrinterJobModalModalStore,
} from '../../modals/DeletePrinterJobModal'
import {
  PrinterFileUploadModal,
  usePrinterFileUploadModal,
} from '../../modals/PrinterFileUploadModal'
import { PrinterJobFileModal, usePrinterJobFileModalStore } from '../../modals/PrinterJobFileModal'
import { PhotographyVideographyFileButton } from '../../PhotographyVideographyFileButton'
import { Pill } from '../../Pill'
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

  const { toggleShowPrinterJobFileModal } = usePrinterJobFileModalStore()

  const { setVisible } = usePrinterFileUploadModal()

  const togglePrinterUploadFile = () => setVisible(true, printer)

  const declinePrice = async () => {
    try {
      const { status } = await axios.put(`/v1/printers/${printer?.id}/decline-offer`)

      if (status === 200) {
        queryClient.invalidateQueries(['printer', printer?.id])
        queryClient.invalidateQueries(['printerJobs'])
        showToast({
          type: 'success',
          message: 'Price successfully declined!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  const approvePrice = async () => {
    try {
      const { status } = await axios.put(`/v1/printers/${printer?.id}/approve-offer`)

      if (status === 200) {
        queryClient.invalidateQueries(['printer', printer?.id])
        queryClient.invalidateQueries(['printerJobs'])
        showToast({
          type: 'success',
          message: 'Price successfully approved!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  // if (printer && printer.product !== null) {
  //   const filterProduct = PrinterOptions?.filter((option) => option.product === printer.product)
  //   console.log(filterProduct[0])
  //   const option =
  //     filterProduct[0].option.map((name) => ({
  //       label: name,
  //       value: name,
  //     })) ?? []

  //   const format =
  //     filterProduct[0].format.map((name) => ({
  //       label: name,
  //       value: name,
  //     })) ?? []

  //   setOption(option)
  //   setFormat(format)
  // }

  useEffect(() => {
    if (printer) {
      setHeader(`Print`)
    }
  }, [printer])

  if (!printer) return null

  return (
    <>
      <Head>
        <title>Indy Print</title>
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
            additionalOptions: [],
            delivery: printer?.delivery,
            price: printer?.price,
            blindShipping: printer?.blindShipping,
            resellerSamples: printer?.resellerSamples,
            status: printer?.status,
            stocks: printer?.stocks,
            coding: printer?.coding,
            address: printer?.address,
            purchaseOrderNumber: printer?.purchaseOrderNumber,
            description: printer?.description,
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
                  <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                    Description
                  </div>
                  <TextAreaInput
                    Icon={EditIcon}
                    placeholder="Enter Description"
                    name="description"
                    className="mb-5"
                  />
                  <>
                    <div className="mb-5 flex space-x-5">
                      <div className="mb-2 w-fit text-base font-semibold text-halloween-orange">
                        Price Offer
                      </div>
                      {printer?.price === null && (
                        <Pill
                          twBackgroundColor="bg-light-deep-saffron"
                          twTextColor="text-deep-saffron"
                          value="No Price Offered Yet"
                        />
                      )}
                      {printer?.isApproved !== null && (
                        <>
                          <Pill
                            twBackgroundColor={
                              printer?.isApproved === 1 ? 'bg-honeydew' : 'bg-light-tart-orange'
                            }
                            twTextColor={
                              printer?.isApproved === 1 ? 'text-jungle-green' : 'text-tart-orange'
                            }
                            value={printer?.isApproved === 1 ? 'Approved' : 'Declined'}
                          />
                        </>
                      )}
                    </div>
                    {printer?.price !== null && (
                      <div className="mb-5 flex space-x-5">
                        <TextInput
                          type="text"
                          Icon={DollarIcon}
                          placeholder="Print Price"
                          name="price"
                          className="pointer-events-none"
                        />
                        {printer?.isApproved === null && (
                          <>
                            <Button ariaLabel="decline" type="button" onClick={declinePrice}>
                              <CloseModalIcon className="stroke-white" />
                              <div>Decline</div>
                            </Button>
                            <Button
                              ariaLabel="approved"
                              type="button"
                              className="!bg-jungle-green"
                              onClick={approvePrice}
                            >
                              <CheckIcon className="stroke-white" />
                              <div>Approve</div>
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </>
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
                    {optionSelect.length > 0 && (
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
                    )}
                    {formatSelect.length > 0 && (
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
                    )}
                  </div>

                  <div className="mb-8 flex space-x-5">
                    <Select
                      label="Stocks"
                      name="stocks"
                      Icon={ClipboardIcon}
                      options={StockOptions}
                      defaultValue={StockOptions.find(({ value }) => value === printer?.stocks)}
                      className="mb-5"
                    />
                    <Select
                      label="Coding"
                      name="coding"
                      Icon={ClipboardIcon}
                      options={CodingOptions}
                      defaultValue={CodingOptions.find(({ value }) => value === printer?.coding)}
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
                    <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
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
                    <Card className="mb-5 h-fit w-full">
                      <div className="mb-5 w-fit text-base font-semibold text-halloween-orange">
                        Attachments
                      </div>
                      <button
                        onClick={togglePrinterUploadFile}
                        className="absolute top-6 right-6 flex space-x-2"
                        type="button"
                      >
                        <PlusIcon className="stroke-halloween-orange" />
                        <div className=" text-sm font-semibold text-halloween-orange">
                          Upload File
                        </div>
                      </button>
                      <div className="flex flex-wrap gap-4">
                        {!!printer.attachments && printer.attachments.length > 0 ? (
                          printer.attachments.map(
                            ({ printerJobAttachmentId, url, thumbnailUrl, name, fileType }) => {
                              const toggleFile = () =>
                                toggleShowPrinterJobFileModal(
                                  url,
                                  fileType,
                                  name,
                                  printerJobAttachmentId,
                                  printer.id
                                )

                              return (
                                <>
                                  <PhotographyVideographyFileButton
                                    key={`socialMediaFile-${printerJobAttachmentId}`}
                                    className="h-35 w-35"
                                    url={url}
                                    fileType={fileType}
                                    name={name}
                                    thumbnailUrl={thumbnailUrl}
                                    onClick={toggleFile}
                                  />
                                </>
                              )
                            }
                          )
                        ) : (
                          <div className="m-auto text-sm text-metallic-silver">No files found.</div>
                        )}
                      </div>
                    </Card>
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
      <PrinterJobFileModal />
      <PrinterFileUploadModal />
    </>
  )
}

ClientPrinterJobPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientPrinterJobPage
