import activities from '../data/activities'
import type { Activity } from '../data/activities'

export function getActivities(): Activity[] {
  return activities.filter(activity => activity.active)
}

export function getActivitiesByDestination(destinationId: string): Activity[] {
  return activities.filter(activity => activity.destinationId === destinationId && activity.active)
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(activity => activity.id === id && activity.active)
}
