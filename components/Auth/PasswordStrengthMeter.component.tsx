const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
  function getStrengthText() {
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
    <div className="flex select-none items-center space-x-[12px]">
      <div className="flex space-x-[8px]">
        {[...Array(5)].map((_, i) => {
          let color = 'bg-brightgray'

          if (i < strength) {
            if (strength < 3) {
              color = 'bg-kucrimson'
            } else if (strength < 4) {
              color = 'bg-schoolbusyellow'
            } else {
              color = 'bg-yellowgreen'
            }
          }

          return <div key={i} className={`h-[6px] w-[24px] rounded-[24px] ${color}`} />
        })}
      </div>
      <div className="font-inter text-[10px] font-normal text-darksilver">{getStrengthText()}</div>
    </div>
  )
}

export default PasswordStrengthMeter
