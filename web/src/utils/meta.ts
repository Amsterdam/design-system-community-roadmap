const MAX_META_DESCRIPTION_LENGTH = 160

export function metaDescription(content: string): string {
  const normalized = content.replace(/\s+/g, ' ').trim()
  if (normalized.length <= MAX_META_DESCRIPTION_LENGTH) return normalized
  return `${normalized.slice(0, MAX_META_DESCRIPTION_LENGTH - 1).trimEnd()}…`
}
