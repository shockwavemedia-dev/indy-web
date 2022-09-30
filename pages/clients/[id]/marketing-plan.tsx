import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Checkbox } from '../../../components/Checkbox'
import { CountCard } from '../../../components/CountCard'
import { EditIcon } from '../../../components/icons/EditIcon'
import { MonitorIcon } from '../../../components/icons/MonitorIcon'
import { SwitchButton } from '../../../components/SwitchButton'
import { TextInput } from '../../../components/TextInput'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { EditClientMarketingForm } from '../../../types/forms/EditClientMarketingPlanForm'
import { Page } from '../../../types/Page.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Service } from '../../../types/Service.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'

const ClientMarketingPlanPage: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const {
    query: { id },
  } = useRouter()
  const { showToast } = useToastStore()

  const { data: clientServices } = useQuery(['services', Number(id)], async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${id}/services`)

    return data
  })

  const { data: services } = useQuery(['services'], async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>('/v1/services')

    return data.reduce((newServices, { id, ...rest }) => {
      newServices[id] = rest

      return newServices
    }, {} as Record<number, Omit<Service, 'id'>>)
  })

  const submitForm = async (values: EditClientMarketingForm) => {
    try {
      const { status } = await axios.put(`/v1/clients/${id}/services`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['services', Number(id)])
        queryClient.invalidateQueries(['services'])
        showToast({
          type: 'success',
          message: 'All changes were successfully saved!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  if (!clientServices) return null

  if (!services) return null

  return (
    <>
      <div className="mx-auto w-full max-w-8xl space-y-5">
        {clientServices?.map(({ id, serviceId, serviceName, totalUsed }, i) => (
          <Card key={`${id}-${serviceId}`}>
            <Formik
              initialValues={{
                clientServices: clientServices.map(
                  ({
                    id,
                    serviceId,
                    serviceName,
                    marketingQuota,
                    extraQuota,
                    totalUsed,
                    isEnabled,
                    extras,
                  }) => ({
                    id,
                    serviceId,
                    serviceName,
                    marketingQuota,
                    extraQuota,
                    totalUsed,
                    isEnabled,
                    extras,
                  })
                ),
              }}
              onSubmit={submitForm}
              enableReinitialize
            >
              {({ isSubmitting, resetForm, dirty, getFieldProps }) => (
                <Form>
                  <SwitchButton
                    name={`clientServices[${i}].isEnabled`}
                    label={serviceName}
                    className="mb-5"
                  />
                  <div
                    className={`flex space-y-5 flex-col${
                      !getFieldProps<boolean>(`clientServices[${i}].isEnabled`).value
                        ? ' pointer-events-none opacity-40'
                        : ''
                    }`}
                  >
                    <CountCard
                      Icon={
                        <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg border border-halloween-orange">
                          <MonitorIcon className="stroke-halloween-orange" />
                        </div>
                      }
                      value={totalUsed}
                      description="Total (Used/Total)"
                      className="w-62 border border-halloween-orange"
                    />
                    <div className="flex w-130 space-x-5">
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder=""
                        label="Marketing Quota"
                        name={`clientServices[${i}].marketingQuota`}
                      />
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder=""
                        label="Extra Quota"
                        name={`clientServices[${i}].extraQuota`}
                      />
                    </div>
                    <div className="space-y-2">
                      {services[serviceId].extras.map((extra, index) => (
                        <Checkbox
                          key={`${extra}-${serviceId}-${index}`}
                          name={`clientServices[${i}].extras`}
                          label={extra}
                          value={extra}
                        />
                      ))}
                    </div>
                  </div>
                  {dirty && (
                    <div className="mt-8 ml-auto flex w-130 space-x-5">
                      <Button ariaLabel="Cancel" onClick={resetForm} type="button" light>
                        Cancel
                      </Button>
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        Submit
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Card>
        ))}
      </div>
    </>
  )
}

ClientMarketingPlanPage.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientMarketingPlanPage
