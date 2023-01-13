import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { MultiValue } from 'react-select'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateSelectNoFormik } from '../components/CreateSelectNoFormik'
import { DateInput } from '../components/DateInput'
import { FileDropZone } from '../components/FileDropZone'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { LinkButton } from '../components/LinkButton'
import { Select } from '../components/Select'
import { TextInput } from '../components/TextInput'
import { TimeInput } from '../components/TimeInput'
import { SocialMediaChannelOptions } from '../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../constants/options/SocialMediaStatusOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateSocialMediaFormSchema } from '../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateSocialMediaForm } from '../types/forms/CreateSocialMediaForm.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SelectOption } from '../types/SelectOption.type'
import { get422And400ResponseError } from '../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewSocialMediaPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreateSocialMediaForm) => {
    if (values.postDate && values.postTime) {
      const postDate = new Date(values.postDate)
      const postTime = new Date(values.postTime)
      const postDateTime = Date.UTC(
        postDate.getUTCFullYear(),
        postDate.getUTCMonth(),
        postDate.getUTCDate(),
        postTime.getUTCHours(),
        postTime.getUTCMinutes(),
        postTime.getUTCSeconds()
      )

      values.postDate = values.postTime = new Date(postDateTime)
    }

    try {
      const { status } = await axios.post<CreateSocialMediaForm>(
        `/v1/clients/${session?.user.userType.client.id}/social-media`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
        replace('/social-media')
        showToast({
          type: 'success',
          message: `New Social Media successfully created!`,
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
    setHeader('New Social Media')
    setCrumbsNavigation([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - New Social Media</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          validationSchema={CreateSocialMediaFormSchema}
          initialValues={{
            post: '',
            postDate: null,
            postTime: null,
            attachments: [],
            copy: '',
            status: '',
            channels: [],
            notes: '',
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex w-full">
                <Card className="h-fit w-9/12">
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Post Topic"
                    name="post"
                    className="mb-5"
                  />
                  <div className="mb-5 flex space-x-5">
                    <DateInput name="postDate" placeholder="Select Post Date" />
                    <TimeInput name="postTime" placeholder="Select Time" />
                  </div>
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Copy"
                    name="copy"
                    className="mb-5"
                  />
                  <Select
                    label="Status"
                    name="status"
                    Icon={ClipboardIcon}
                    options={SocialMediaStatusOptions}
                    className="mb-5"
                  />
                  <CreateSelectNoFormik
                    options={SocialMediaChannelOptions}
                    className="mb-5"
                    placeholder="Select Channel"
                    name="channels"
                    isMulti
                    onChange={(channel: MultiValue<SelectOption<string>>) => {
                      setFieldValue(
                        'channels',
                        channel.map((option) => option.value)
                      )
                    }}
                  />
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Notes"
                    name="notes"
                    className="mb-5"
                  />
                  <FileDropZone
                    label="Upload Attachment"
                    name="attachments"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                    multiple
                    className="mb-8"
                  />
                  <div className="flex space-x-5">
                    <LinkButton title="Cancel" href="/social-media" light />
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      <FloppyDiskIcon className="stroke-white" />
                      <div>Save</div>
                    </Button>
                  </div>
                </Card>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

NewSocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewSocialMediaPage
