import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Checkbox } from '../../../components/Checkbox'
import { CountCard } from '../../../components/CountCard'
import { FloppyDiskIcon } from '../../../components/icons/FloppyDiskIcon'
import { MonitorIcon } from '../../../components/icons/MonitorIcon'
import { SquareDollarIcon } from '../../../components/icons/SquareDollarIcon'
import { SwitchButton } from '../../../components/SwitchButton'
import { TextInput } from '../../../components/TextInput'
import { AdvertisingExtraOptions } from '../../../constants/options/AdvertisingExtraOptions'
import { AnimationExtraOptions } from '../../../constants/options/AnimationExtraOptions'
import { GraphicExtraOptions } from '../../../constants/options/GraphicExtraOptions'
import { SocialMediaExtraOptions } from '../../../constants/options/SocialMediaExtraOptions'
import { WebsiteExtraOptions } from '../../../constants/options/WebsiteExtraOptions'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { useToastStore } from '../../../store/ToastStore'
import { EditClientMarketingForm } from '../../../types/forms/EditClientMarketingPlanForm'
import { Page } from '../../../types/Page.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Service } from '../../../types/Service.type'

const ClientMarketingPlan: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()

  const { showToast } = useToastStore()

  const { data: services } = useQuery(['services', Number(id)], async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${Number(id)}/services`)

    return data
  })

  const submitForm = async (values: EditClientMarketingForm) => {
    try {
      const { status } = await axios.put(`/v1/clients/${Number(id)}/services`, values)

      if (status === 200) {
        showToast({
          type: 'success',
          message: 'All changes was successfully saved',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-8xl">
        {services?.map(
          ({
            id,
            serviceId,
            serviceName,
            totalUsed,
            extras,
            extraQuota,
            marketingQuota,
            isEnabled,
          }) => (
            <Formik
              key={`service-${id}`}
              initialValues={{
                serviceId: serviceId,
                extras: extras,
                isEnabled: isEnabled,
                marketingQuota: marketingQuota,
                extraQuota: extraQuota,
              }}
              onSubmit={submitForm}
            >
              <Form>
                <div>
                  <Card
                    key={`service-${id}`}
                    className="mb-5 flex h-fit flex-1 cursor-default flex-col border border-halloween-orange"
                  >
                    <SwitchButton
                      value={isEnabled}
                      name="isEnabled"
                      label={serviceName}
                      className="mb-5"
                    />
                    <div
                      className={`flex flex-col ${
                        !isEnabled ? 'cursor-none opacity-40 disabled:opacity-50' : ''
                      }`}
                    >
                      <div className="w-3/6">
                        <CountCard
                          Icon={
                            <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-alice-blue">
                              <MonitorIcon className="stroke-bleu-de-france" />
                            </div>
                          }
                          value={totalUsed}
                          description="Total (Used/Total)"
                          className="w-54"
                        />
                        <div className="mb-5 flex space-x-5">
                          <TextInput
                            type="text"
                            Icon={SquareDollarIcon}
                            placeholder="Marketing Quota"
                            name="marketingQuota"
                            className="mb-5"
                            label="Marketing Quota"
                          />
                          <TextInput
                            type="text"
                            Icon={SquareDollarIcon}
                            placeholder="Extra Quota"
                            name="extraQuota"
                            className="mb-5"
                            label="Extra Quota"
                          />
                        </div>
                      </div>
                      {serviceId &&
                        serviceId == 1 &&
                        GraphicExtraOptions?.map(({ value, label }) => (
                          <Checkbox
                            className="mb-2"
                            key={`${value}-${serviceId}`}
                            name="extras"
                            label={label}
                            value={value}
                          />
                        ))}
                      {serviceId &&
                        serviceId == 2 &&
                        AnimationExtraOptions?.map(({ value, label }) => (
                          <Checkbox
                            className="mb-2"
                            key={`${value}-${serviceId}`}
                            name="extras"
                            label={label}
                            value={value}
                          />
                        ))}
                      {serviceId &&
                        serviceId == 4 &&
                        SocialMediaExtraOptions?.map(({ value, label }) => (
                          <Checkbox
                            className="mb-2"
                            key={`${value}-${serviceId}`}
                            name="extras"
                            label={label}
                            value={value}
                          />
                        ))}
                      {serviceId &&
                        serviceId == 5 &&
                        WebsiteExtraOptions?.map(({ value, label }) => (
                          <Checkbox
                            className="mb-2"
                            key={`${value}-${serviceId}`}
                            name="extras"
                            label={label}
                            value={value}
                          />
                        ))}
                      {serviceId &&
                        serviceId == 6 &&
                        AdvertisingExtraOptions?.map(({ value, label }) => (
                          <Checkbox
                            className="mb-2"
                            key={`${value}-${serviceId}`}
                            name="extras"
                            label={label}
                            value={value}
                          />
                        ))}
                    </div>
                  </Card>
                </div>
              </Form>
            </Formik>
          )
        )}
        <Card className="flex w-1/4 flex-1 flex-col">
          <Button ariaLabel="Submit" type="submit">
            <FloppyDiskIcon className="stroke-white" />
            <div>Save</div>
          </Button>
        </Card>
      </div>
    </>
  )
}

ClientMarketingPlan.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientMarketingPlan
