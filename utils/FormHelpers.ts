import { serialize } from 'object-to-formdata'
import snakecaseKeys from 'snakecase-keys'

export const objectWithFileToFormData = (object: Object) => {
  const files: Array<{
    key: string
    file: File
  }> = []

  const formData = serialize(
    snakecaseKeys(
      Object.entries(object)
        .filter(([key, value]) => {
          if (value instanceof File) {
            files.push({
              key,
              file: value,
            })

            return false
          }

          return true
        })
        .reduce<Record<string, unknown>>((newObject, [key, value]) => {
          newObject[key] = value

          return newObject
        }, {}),
      { deep: true }
    ),
    {
      indices: true,
    }
  )

  files.forEach(({ key, file }) => formData.set(key, file))

  return formData
}

export const richTextEmptyCheck = (value?: string) =>
  !!value && !/^{"blocks":\[{"key":"[a-z0-9]{5}","text":""/.test(value)
