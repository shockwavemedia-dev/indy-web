import { serialize } from 'object-to-formdata'
import snakecaseKeys from 'snakecase-keys'

export const objectWithFileToFormData = (object: Object) => {
  const files: Array<{
    key: string
    file: File
  }> = []

  const formData = serialize(
    snakecaseKeys(
      Object.entries(object).reduce<Record<string, unknown>>((newObject, [key, value]) => {
        if (value instanceof File) {
          files.push({
            key,
            file: value,
          })
        } else if (Array.isArray(value) && value.every((file) => file instanceof File)) {
          value.forEach((file) => {
            files.push({
              key: `${key}[]`,
              file,
            })
          })
        } else {
          newObject[key] = value
        }

        return newObject
      }, {}),
      { deep: true, exclude: ['_method'] }
    ),
    {
      indices: true,
    }
  )

  files.forEach(({ key, file }) => formData.append(key, file))

  return formData
}

export const richTextEmptyCheck = (value?: string) =>
  !!value && !/^{"blocks":\[{"key":"[a-z0-9]{5}","text":""/.test(value)
