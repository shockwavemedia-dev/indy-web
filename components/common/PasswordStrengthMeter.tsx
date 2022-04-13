export const PasswordStrengthMeter = ({
  strength,
  className,
}: {
  strength: number
  className?: string
}) => {
  const getStrengthText = () => {
    if (strength < 2) {
      return 'Very Weak'
    } else if (strength < 3) {
      return 'Weak'
    } else if (strength < 4) {
      return 'Medium'
    } else if (strength < 5) {
      return 'Strong'
    }

    return 'Very Strong'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => {
          let color = 'bg-bright-gray'

          if (i < strength) {
            if (strength < 3) {
              color = 'bg-tart-orange'
            } else if (strength < 4) {
              color = 'bg-deep-saffron'
            } else {
              color = 'bg-jungle-green'
            }
          }

          return <div key={i} className={`h-1.5 w-8 rounded-3xl ${color}`} />
        })}
      </div>
      <div className="font-urbanist text-xxs font-medium text-waterloo">{getStrengthText()}</div>
    </div>
  )
}

export const computePasswordStrength = (password: string) => {
  let computedPasswordStrength = 0

  if (password.length > 7) {
    computedPasswordStrength++
  }

  if (password.match(/[a-z]/)) {
    computedPasswordStrength++
  }

  if (password.match(/[A-Z]/)) {
    computedPasswordStrength++
  }

  if (password.match(/[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    computedPasswordStrength++
  }

  if (password.match(/[0-9]/)) {
    computedPasswordStrength++
  }

  return computedPasswordStrength
}
