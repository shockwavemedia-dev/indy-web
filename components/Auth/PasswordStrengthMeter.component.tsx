const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
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
    <div className="flex items-center space-x-3">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => {
          let color = 'bg-gallery'

          if (i < strength) {
            if (strength < 3) {
              color = 'bg-red'
            } else if (strength < 4) {
              color = 'bg-schoolbusyellow'
            } else {
              color = 'bg-lapalma'
            }
          }

          return <div key={i} className={`h-1.5 w-6 rounded-3xl ${color}`} />
        })}
      </div>
      <div className="font-inter text-xxs font-normal text-nevada">{getStrengthText()}</div>
    </div>
  )
}

export default PasswordStrengthMeter
