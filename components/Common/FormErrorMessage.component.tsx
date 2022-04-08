import { ErrorMessage } from 'formik'

const FormErrorMessage = ({ name }: { name: string }) => (
  <ErrorMessage name={name}>
    {(errorMessage) => (
      <div className="mt-1 font-urbanist text-xs font-medium text-tart-orange first-letter:capitalize">
        {errorMessage}
      </div>
    )}
  </ErrorMessage>
)

export default FormErrorMessage
