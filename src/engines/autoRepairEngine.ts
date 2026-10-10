import { ItineraryStop } from '../types/itinerary';
import { DUBAI_POIS } from '../data/mockPlaces';
import { calculateHaversineDistance, timeToMinutes, minutesToTime } from './realityCheckEngine';

export function autoRepairItinerary(
  currentStops: ItineraryStop[],
  goldenHourStr: string = '18:15',
  isMurphyMode: boolean = false
): ItineraryStop[] {
  if (currentStops.length === 0) return [];

  // Clone stops to modify
  let repaired = currentStops.map(s => ({ ...s }));

  // 1. If Murphy Mode is active (e.g. sudden monsoon rain), replace outdoor venues with indoor sanctuaries
  if (isMurphyMode) {
    repaired = repaired.map(stop => {
      if (stop.isOutdoor) {
        const indoorAlternative = DUBAI_POIS.find(p => !p.isOutdoor && p.id !== stop.poiId) || DUBAI_POIS[4]; // Arabian Tea House
        return {
          ...stop,
          poiId: indoorAlternative.id,
          name: `${indoorAlternative.name} (Rain Sanctuary Swap)`,
          category: indoorAlternative.category,
          isOutdoor: false,
          idealForSunset: false
        };
      }
      return stop;
    });
  }

  // 2. Replace venues that are closed on Fridays (e.g. Friday morning souk or mosque)
  repaired = repaired.map(stop => {
    if (stop.poiId === 'poi-spice-souk' || stop.poiId === 'poi-museum') {
      const openAlternative = DUBAI_POIS.find(p => p.id === 'poi-tea-house') || DUBAI_POIS[0];
      return {
        ...stop,
        poiId: openAlternative.id,
        name: openAlternative.name,
        category: openAlternative.category,
        isOutdoor: openAlternative.isOutdoor,
        notes: 'Auto-swapped: Replaced venue closed on Friday morning with open heritage tearoom.'
      };
    }
    return stop;
  });

  // 3. Separate the designated sunset viewpoint (if any)
  let sunsetStop = repaired.find(s => s.idealForSunset);
  let otherStops = repaired.filter(s => s !== sunsetStop);

  // 4. Greedy Nearest-Neighbor Route Optimization for other stops
  if (otherStops.length > 1) {
    const sortedStops: ItineraryStop[] = [otherStops[0]];
    const remaining = otherStops.slice(1);

    while (remaining.length > 0) {
      const last = sortedStops[sortedStops.length - 1];
      let nearestIdx = 0;
      let minDistance = calculateHaversineDistance(last.lat, last.lng, remaining[0].lat, remaining[0].lng);

      for (let i = 1; i < remaining.length; i++) {
        const dist = calculateHaversineDistance(last.lat, last.lng, remaining[i].lat, remaining[i].lng);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      sortedStops.push(remaining.splice(nearestIdx, 1)[0]);
    }
    otherStops = sortedStops;
  }

  // 5. Re-synthesize realistic schedule timeline starting at 10:00 AM
  let currentClockMin = 10 * 60; // 10:00 AM
  const finalSequence: ItineraryStop[] = [];

  const goldenHourMin = timeToMinutes(goldenHourStr);

  otherStops.forEach((stop, index) => {
    // If approaching golden hour and we have a sunset stop, insert it at golden hour
    if (sunsetStop && currentClockMin >= goldenHourMin - 60 && !finalSequence.includes(sunsetStop)) {
      const sunsetStart = goldenHourMin - 30; // 17:45
      const sunsetEnd = goldenHourMin + 45;   // 19:00
      finalSequence.push({
        ...sunsetStop,
        startTime: minutesToTime(sunsetStart),
        endTime: minutesToTime(sunsetEnd),
        durationMinutes: 75,
        notes: `✨ Snapped to Golden Hour (${goldenHourStr}) for optimal sunset photography!`
      });
      currentClockMin = sunsetEnd + 30; // 30 min buffer
      sunsetStop = undefined; // inserted
    }

    const duration = stop.durationMinutes || 60;
    const stopStart = currentClockMin;
    const stopEnd = stopStart + duration;

    finalSequence.push({
      ...stop,
      startTime: minutesToTime(stopStart),
      endTime: minutesToTime(stopEnd),
      travelTimeMinutesToNext: 20
    });

    currentClockMin = stopEnd + 25; // 25-minute comfortable travel buffer
  });

  // If sunset stop wasn't inserted yet, append it now
  if (sunsetStop) {
    const sunsetStart = Math.max(currentClockMin, goldenHourMin - 30);
    const sunsetEnd = sunsetStart + 60;
    finalSequence.push({
      ...sunsetStop,
      startTime: minutesToTime(sunsetStart),
      endTime: minutesToTime(sunsetEnd),
      durationMinutes: 60,
      notes: `✨ Snapped to Golden Hour (${goldenHourStr})!`
    });
  }

  return finalSequence;
}
