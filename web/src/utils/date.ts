export function getProgressStatus(start?: string, end?: string | null): 'completed' | 'current' | undefined {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date())
  if (end && end < today) return 'completed'
  if (start && start <= today) return 'current'
  return undefined
}

export function formatDateRange(start?: string, end?: string | null): string {
  if (!start) return 'Onbekend'
  const startFormatted = new Date(start).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
  if (!end) return startFormatted
  const endFormatted = new Date(end).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
  return `${startFormatted} - ${endFormatted}`
}

export function formatRelativeTime(iso?: string): string {
  if (!iso) return ''
  const diffMs = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(diffMs)) return ''

  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'zojuist'
  if (minutes < 60) return `${minutes} min geleden`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} uur geleden`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'dag' : 'dagen'} geleden`

  return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
}
