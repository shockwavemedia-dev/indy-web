export function parseDates(data: Record<string, unknown>) {
  if (data === null || data === undefined || typeof data !== 'object') {
    return data
  }

  for (const key of Object.keys(data)) {
    const value = data[key]

    if (value && typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value)) {
      const date = new Date(value)

      if (!isNaN(date.getTime())) {
        data[key] = date
      }
    } else if (typeof value === 'object') {
      parseDates(value as Record<string, unknown>)
    }
  }
}
