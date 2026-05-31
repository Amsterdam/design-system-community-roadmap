export function toProgressStepStatus(status?: string | null): 'completed' | 'current' | undefined {
  if (status === 'Voltooid') return 'completed'
  if (status === 'Bezig') return 'current'
  return undefined
}

export function getStatusBadge(status?: string | null): { color?: 'azure' | 'lime'; label: string } {
  if (status === 'Voltooid') return { color: 'lime', label: 'Voltooid' }
  if (status === 'Bezig') return { color: 'azure', label: 'In uitvoering' }
  return { label: 'Gepland' }
}
