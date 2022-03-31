export function parseDates(data: any) {
  if (data === null || data === undefined || typeof data !== 'object') {
    return data
  }

  for (const key of Object.keys(data)) {
    const value = data[key]

    if (value && typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value)) {
      data[key] = new Date(value)
    } else if (typeof value === 'object') {
      parseDates(value)
    }
  }
}
