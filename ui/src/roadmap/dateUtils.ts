import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfYear,
  format,
  isFirstDayOfMonth,
  isMonday,
  max,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns'
import { nl } from 'date-fns/locale'

export type RoadmapStory = {
  documentId: string
  endDate: string | null
  id: number
  startDate: string
  title: string
}

export type RoadmapFeature = {
  documentId: string
  endDate: string
  id: number
  startDate: string
  stories: RoadmapStory[]
  title: string
}

export type RoadmapGranularity = 'day' | 'week' | 'month' | 'year'

export type RoadmapViewRange = {
  start: Date
  end: Date
}

export const GRANULARITY_THRESHOLDS = {
  day: 14,
  month: 180,
  week: 60,
}

export function getGranularity(range: RoadmapViewRange): RoadmapGranularity {
  const daysCount = differenceInCalendarDays(range.end, range.start)
  if (daysCount <= GRANULARITY_THRESHOLDS.day) return 'day'
  if (daysCount <= GRANULARITY_THRESHOLDS.week) return 'week'
  if (daysCount <= GRANULARITY_THRESHOLDS.month) return 'month'
  return 'year'
}

export function getDays(range: RoadmapViewRange): Date[] {
  return eachDayOfInterval({ start: range.start, end: range.end })
}

export function getDayIndex(date: Date | string, rangeStart: Date): number {
  const normalizedDate = typeof date === 'string' ? startOfDay(new Date(date)) : startOfDay(date)
  return differenceInCalendarDays(normalizedDate, rangeStart) + 1
}

export function clampToRange(index: number, total: number): number {
  if (index < 1) return 1
  if (index > total + 1) return total + 1
  return index
}

type TimelineBand = {
  end: number
  label: string
  start: number
}

export function getMonthBands(days: Date[]): TimelineBand[] {
  if (days.length === 0) return []

  return eachMonthOfInterval({ start: days[0], end: days[days.length - 1] }).map((monthStart) => {
    const start = Math.max(1, differenceInCalendarDays(startOfMonth(monthStart), days[0]) + 1)
    const end = Math.min(days.length, differenceInCalendarDays(endOfMonth(monthStart), days[0]) + 1)
    return { end: end + 1, label: format(monthStart, 'MMMM yyyy', { locale: nl }), start }
  })
}

export function getYearBands(days: Date[]): TimelineBand[] {
  if (days.length === 0) return []

  return eachYearOfInterval({ start: days[0], end: days[days.length - 1] }).map((yearStart) => {
    const start = Math.max(1, differenceInCalendarDays(startOfYear(yearStart), days[0]) + 1)
    const end = Math.min(days.length, differenceInCalendarDays(endOfYear(yearStart), days[0]) + 1)
    return { end: end + 1, label: format(yearStart, 'yyyy', { locale: nl }), start }
  })
}

export function formatDayLabel(date: Date, granularity: RoadmapGranularity): string {
  if (granularity === 'day') return format(date, 'EEE d', { locale: nl })
  if (granularity === 'year') return format(date, 'MMM', { locale: nl }).slice(0, 3)
  return `W${format(date, 'I')}`
}

export function shouldShowDayLabel(granularity: RoadmapGranularity, date: Date): boolean {
  if (granularity === 'year') return isFirstDayOfMonth(date)
  if (granularity === 'month' || granularity === 'week') return isMonday(date)
  return true
}

export function getDefaultRange(): RoadmapViewRange {
  const start = startOfMonth(new Date())
  const end = endOfMonth(addDays(start, 3 * 31))
  return { start, end }
}

export function getDefaultRangeForFeatures(
  features: RoadmapFeature[],
  standaloneStories: RoadmapStory[],
): RoadmapViewRange {
  const baseRange = getDefaultRange()

  const allEndDates: Date[] = [
    ...features.map((feature) => new Date(feature.endDate)),
    ...features.flatMap((feature) =>
      feature.stories.flatMap((story) => (story.endDate ? [new Date(story.endDate)] : [])),
    ),
    ...standaloneStories.flatMap((story) => (story.endDate ? [new Date(story.endDate)] : [])),
  ]

  if (allEndDates.length === 0) return baseRange

  return { start: baseRange.start, end: max([baseRange.end, ...allEndDates]) }
}

export function zoomRange(range: RoadmapViewRange, factor: number, pivotDate: Date): RoadmapViewRange {
  const pivotIndex = differenceInCalendarDays(pivotDate, range.start)
  const totalDays = differenceInCalendarDays(range.end, range.start)
  const newTotalDays = Math.max(3, Math.min(730, Math.round(totalDays * factor)))

  const beforePivot = totalDays > 0 ? Math.round((pivotIndex / totalDays) * newTotalDays) : Math.round(newTotalDays / 2)
  const afterPivot = newTotalDays - beforePivot

  return {
    start: addDays(pivotDate, -beforePivot),
    end: addDays(pivotDate, afterPivot),
  }
}

export function panRange(range: RoadmapViewRange, daysCount: number): RoadmapViewRange {
  return {
    start: addDays(range.start, daysCount),
    end: addDays(range.end, daysCount),
  }
}
