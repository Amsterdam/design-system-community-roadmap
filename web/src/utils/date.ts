export function formatDateRange(start?: string, end?: string | null): string {
  if (!start) return 'Onbekend'
  const startFormatted = new Date(start).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
  if (!end) return startFormatted
  const endFormatted = new Date(end).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
  return `${startFormatted} - ${endFormatted}`
}
