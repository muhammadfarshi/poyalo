import { POI } from '../types/itinerary';

export const DUBAI_POIS: POI[] = [
  {
    id: 'poi-fahidi',
    name: 'Al Fahidi Historical Neighbourhood',
    city: 'Dubai',
    category: 'heritage',
    openTime: '09:00',
    closeTime: '20:00',
    closedDays: [], // Open every day
    lat: 25.2635,
    lng: 55.2972,
    isOutdoor: true,
    durationMinutes: 90,
    description: 'Traditional 19th-century gypsum and coral stone architecture with wind towers (Barajeel).',
    entryCostAED: 0
  },
  {
    id: 'poi-creek-abra',
    name: 'Dubai Creek Traditional Abra Crossing',
    city: 'Dubai',
    category: 'heritage',
    openTime: '06:00',
    closeTime: '23:30',
    closedDays: [], // Daily
    lat: 25.2678,
    lng: 55.2995,
    isOutdoor: true,
    durationMinutes: 30,
    description: 'Iconic 1-dirham wooden abra boat ride across the historic saltwater inlet separating Bur Dubai and Deira.',
    entryCostAED: 1
  },
  {
    id: 'poi-spice-souk',
    name: 'Deira Grand Spice Souk',
    city: 'Dubai',
    category: 'souk',
    openTime: '10:00',
    closeTime: '22:00',
    closedDays: [5], // Friday mornings closed (opens at 16:00)
    lat: 25.2692,
    lng: 55.2981,
    isOutdoor: false,
    durationMinutes: 60,
    description: 'Heaps of Iranian saffron, frankincense, sumac, and Persian dried limes in historic shaded sikkas.',
    entryCostAED: 0
  },
  {
    id: 'poi-museum',
    name: 'Al Fahidi Fort & Dubai Museum',
    city: 'Dubai',
    category: 'museum',
    openTime: '08:30',
    closeTime: '20:30',
    closedDays: [5], // Closed Friday morning for restoration audits
    lat: 25.2638,
    lng: 55.2978,
    isOutdoor: false,
    durationMinutes: 60,
    description: 'The oldest existing building in Dubai (built 1787) showcasing pre-oil bedouin life and pearl diving relics.',
    entryCostAED: 3
  },
  {
    id: 'poi-tea-house',
    name: 'Arabian Tea House Cafe',
    city: 'Dubai',
    category: 'food',
    openTime: '07:30',
    closeTime: '23:00',
    closedDays: [],
    lat: 25.2629,
    lng: 55.2965,
    isOutdoor: false,
    durationMinutes: 75,
    description: 'Authentic Emirati breakfast under turquoise pergolas: fresh regag bread, date syrup, and saffron karak.',
    entryCostAED: 65
  },
  {
    id: 'poi-seef-sunset',
    name: 'Al Seef Promenade Sunset Point',
    city: 'Dubai',
    category: 'viewpoint',
    openTime: '08:00',
    closeTime: '23:59',
    closedDays: [],
    lat: 25.2605,
    lng: 55.3055,
    isOutdoor: true,
    idealForSunset: true,
    durationMinutes: 90,
    description: 'A 1.8km waterfront promenade where vintage dhows sail past against the golden evening light.',
    entryCostAED: 0
  },
  {
    id: 'poi-burj-promenade',
    name: 'Burj Khalifa Lake & Fountain Plaza',
    city: 'Dubai',
    category: 'viewpoint',
    openTime: '10:00',
    closeTime: '23:00',
    closedDays: [],
    lat: 25.1972,
    lng: 55.2744,
    isOutdoor: true,
    idealForSunset: true,
    durationMinutes: 90,
    description: 'World tallest spire standing at 828 meters beside dancing fountains and modern marvels.',
    entryCostAED: 0
  },
  {
    id: 'poi-jumeirah-mosque',
    name: 'Jumeirah Grand Mosque',
    city: 'Dubai',
    category: 'heritage',
    openTime: '10:00',
    closeTime: '14:00',
    closedDays: [5], // Closed to tours on Fridays
    lat: 25.2338,
    lng: 55.2655,
    isOutdoor: false,
    durationMinutes: 60,
    description: 'Fatimid-style white stone mosque welcoming non-Muslim visitors under "Open Doors, Open Minds".',
    entryCostAED: 35
  }
];
