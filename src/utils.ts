export const formatDate = (date: Date, includeTime: boolean = false, short: boolean = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }
  if (short) {
    options.year = '2-digit';
  } else {
    options.weekday = 'short';
  }

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return date.toLocaleDateString('es-MX', options)
}