import { ErrorMessage } from 'formik'

export const FormErrorMessage = ({
  name,
  className,
}: {
  name: string
  className?: string | null
}) => (
  <ErrorMessage name={name}>
    {(errorMessage) => (
      <div
        className={`mt-1 text-xs font-medium text-tart-orange first-letter:uppercase ${className}`}
      >
        {errorMessage}
      </div>
    )}
  </ErrorMessage>
)
