import SunCalc from 'suncalc';
import { ItineraryStop, POI, RealityCheckFlag, RealityCheckResult } from '../types/itinerary';
import { DUBAI_POIS } from '../data/mockPlaces';

// Haversine distance in kilometers
export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Convert "HH:MM" to minutes from midnight
export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Convert minutes to "HH:MM"
export function minutesToTime(minutes: number): string {
  const clamped = Math.max(0, Math.min(24 * 60 - 1, minutes));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function auditItinerary(
  stops: ItineraryStop[],
  tripDateStr: string = '2026-10-16', // A Friday to test closed day edge cases
  isMurphyActive: boolean = false,
  activeDisruption?: string
): RealityCheckResult {
  const flags: RealityCheckFlag[] = [];
  const tripDate = new Date(tripDateStr);
  const dayOfWeek = tripDate.getDay(); // 0=Sun, 5=Fri, 6=Sat

  // Golden hour calculation via SunCalc for Dubai (approx 25.26, 55.30)
  const sunTimes = SunCalc.getTimes(tripDate, 25.2635, 55.2972);
  const goldenHourMinutes = sunTimes.goldenHour ? sunTimes.goldenHour.getHours() * 60 + sunTimes.goldenHour.getMinutes() : 18 * 60 + 15;
  const goldenHourStr = minutesToTime(goldenHourMinutes);

  let deduction = 0;

  stops.forEach((stop, idx) => {
    const poi = DUBAI_POIS.find(p => p.id === stop.poiId);
    const stopStartMin = timeToMinutes(stop.startTime);
    const stopEndMin = timeToMinutes(stop.endTime);

    // 1. CHECK OPERATING HOURS
    if (poi) {
      const openMin = timeToMinutes(poi.openTime);
      const closeMin = timeToMinutes(poi.closeTime);

      if (stopStartMin < openMin || stopStartMin > closeMin) {
        deduction += 20;
        flags.push({
          id: `flag-hours-${stop.id}`,
          type: 'CLOSED_VENUE',
          severity: 'error',
          stopId: stop.id,
          stopName: stop.name,
          title: `Arriving Outside Opening Hours`,
          message: `${stop.name} is scheduled at ${stop.startTime}, but official hours are ${poi.openTime} – ${poi.closeTime}.`,
          roastComment: `Did you plan to break in through the window? You'll be standing outside staring at a padlock.`,
          fixSuggestion: `Adjust timing to arrive between ${poi.openTime} and ${poi.closeTime}.`
        });
      }

      // 2. CHECK WEEKLY CLOSED DAYS
      if (poi.closedDays.includes(dayOfWeek)) {
        deduction += 25;
        flags.push({
          id: `flag-closed-day-${stop.id}`,
          type: 'CLOSED_VENUE',
          severity: 'error',
          stopId: stop.id,
          stopName: stop.name,
          title: `Venue Closed on Fridays`,
          message: `${stop.name} is strictly shuttered on Friday mornings / audited rest days.`,
          roastComment: `Rookie mistake! Friday prayers & morning closures in the historic quarter are real.`,
          fixSuggestion: `Swap with Al Seef Promenade or schedule after 16:30.`
        });
      }
    }

    // 3. TRANSIT PHYSICS AUDIT (consecutive stops)
    if (idx < stops.length - 1) {
      const nextStop = stops[idx + 1];
      const distKm = calculateHaversineDistance(stop.lat, stop.lng, nextStop.lat, nextStop.lng);
      const nextStartMin = timeToMinutes(nextStop.startTime);
      const availableTransitMinutes = nextStartMin - stopEndMin;

      if (availableTransitMinutes <= 0) {
        deduction += 20;
        flags.push({
          id: `flag-teleport-${stop.id}`,
          type: 'TRANSIT_SPEED',
          severity: 'error',
          stopId: stop.id,
          stopName: stop.name,
          title: `Zero Buffer Transit (Instant Teleportation)`,
          message: `Scheduled to leave ${stop.name} at ${stop.endTime} and arrive at ${nextStop.name} at ${nextStop.startTime} (0 mins buffer for ${distKm.toFixed(1)} km).`,
          roastComment: `Unless Elon Musk installed a pneumatic hyperloop tube in your pocket, humans cannot teleport.`,
          fixSuggestion: `Add at least ${Math.max(15, Math.ceil(distKm * 3))} minutes travel buffer.`
        });
      } else {
        const impliedSpeedKmH = (distKm / (availableTransitMinutes / 60));
        if (impliedSpeedKmH > 70 && distKm > 2) {
          deduction += 15;
          flags.push({
            id: `flag-speed-${stop.id}`,
            type: 'TRANSIT_SPEED',
            severity: 'warning',
            stopId: stop.id,
            stopName: stop.name,
            title: `Unrealistic City Transit Speed (${impliedSpeedKmH.toFixed(0)} km/h)`,
            message: `Requires covering ${distKm.toFixed(1)} km across dense Dubai Creek traffic in ${availableTransitMinutes} mins.`,
            roastComment: `Even an Italian supercar with sirens will get stuck on Al Maktoum Bridge at this hour.`,
            fixSuggestion: `Allocate at least 30 minutes for cross-creek transit.`
          });
        }
      }
    }

    // 4. GOLDEN HOUR / SUNSET ALIGNMENT
    if (poi?.idealForSunset || stop.idealForSunset) {
      const diffFromGoldenHour = Math.abs(stopStartMin - goldenHourMinutes);
      if (diffFromGoldenHour > 150) {
        deduction += 12;
        flags.push({
          id: `flag-sunset-${stop.id}`,
          type: 'GOLDEN_HOUR_MISSED',
          severity: 'warning',
          stopId: stop.id,
          stopName: stop.name,
          title: `Prime Sunset Viewpoint Scheduled at Noon`,
          message: `${stop.name} is scheduled at ${stop.startTime}, but Golden Hour is at ${goldenHourStr}.`,
          roastComment: `Enjoying a panoramic scenic viewpoint under blinding 42°C midday sun? Your photos will be 100% glare and squinting.`,
          fixSuggestion: `Move this stop to ${goldenHourStr} for peak golden-hour reflections over the water.`
        });
      }
    }

    // 5. MURPHY MODE DISRUPTIONS
    if (isMurphyActive && stop.isOutdoor) {
      deduction += 15;
      flags.push({
        id: `flag-murphy-${stop.id}`,
        type: 'WEATHER_CLASH',
        severity: 'error',
        stopId: stop.id,
        stopName: stop.name,
        title: `Murphy Alert: ${activeDisruption || 'Sudden Torrential Downpour'}`,
        message: `Outdoor stop ${stop.name} is impacted by emergency weather disruption!`,
        roastComment: `Desert flash flood alert! Your open-air walk is now an improvised synchronized swimming event.`,
        fixSuggestion: `Auto-Repair will replace this outdoor stop with an indoor cultural sanctuary.`
      });
    }
  });

  const finalScore = Math.max(10, Math.min(100, 100 - deduction));
  const status: RealityCheckResult['status'] = 
    finalScore >= 80 ? 'approved' : finalScore >= 55 ? 'caution' : 'critical';

  let roastVerdict = '';
  let professorVerdict = '';

  if (finalScore >= 80) {
    roastVerdict = "Miracle of miracles. Your itinerary actually obeys the laws of physics, opening hours, and human anatomy. You might actually enjoy this trip!";
    professorVerdict = "Itinerary validated. Temporal spacing, daylight alignment, and geographic proximity parameters conform to optimal transit efficiency.";
  } else if (finalScore >= 55) {
    roastVerdict = "You're cutting it dangerously close. A couple of missed closing times and tight connections. You'll survive, but you'll probably yell at your travel companion.";
    professorVerdict = "Moderate friction detected. Several venue closures and transit bottlenecks warrant structural re-sequencing.";
  } else {
    roastVerdict = "Absolute planning chaos! This itinerary looks like it was generated by a malfunctioning bot that thinks humans don't sleep, venues don't close, and traffic doesn't exist.";
    professorVerdict = "Critical architectural failure. Multiple deterministic violations detected: closed operating windows and impossible velocity vectors.";
  }

  return {
    score: finalScore,
    status,
    flags,
    roastVerdict,
    professorVerdict,
    goldenHourTime: goldenHourStr,
    isMurphyActive,
    activeDisruption
  };
}
