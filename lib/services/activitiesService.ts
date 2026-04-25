import activities from '../data/activities'
import type { Activity } from '../data/activities'

export function getActivities(): Activity[] {
  return activities.filter(a => a.active)
}

export function getActivitiesByDestination(destinationId: string): Activity[] {
  return activities.filter(a => a.destinationId === destinationId && a.active)
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(a => a.id === id && a.active)
}
