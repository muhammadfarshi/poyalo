export interface DestinationVisaRule {
  id: string;
  countryName: string;
  countryCode: string;
  flag: string;
  continent: 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Americas';
  tier: 'easy' | 'evisa' | 'concierge';
  tierLabel: 'Instant VOA / Visa-Free' | 'Fast eVisa (Online)' | 'The Visa Guy Concierge Required';
  uaeResidentRule: string;
  passportNotes: string;
  processingTimeDays: number;
  visaGuyPerks: string[];
  inquirySlug: string;
  stressFactor: 'low' | 'medium' | 'high';
  estimatedCostAED: number;
}

export const DESTINATION_VISA_RULES: DestinationVisaRule[] = [
  // TIER 1: EASY / INSTANT FOR UAE RESIDENTS
  {
    id: 'georgia',
    countryName: 'Georgia',
    countryCode: 'GE',
    flag: '🇬🇪',
    continent: 'Europe',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Visa-free entry up to 90 days for all valid UAE Residence Visa holders regardless of passport nationality.',
    passportNotes: 'Passport must have at least 180 days validity beyond entry date. UAE residency visa must be valid upon entry.',
    processingTimeDays: 0,
    visaGuyPerks: ['Free entry consultation', 'Flight + Hotel hold vouchers for border control', 'Travel health insurance policy'],
    inquirySlug: 'georgia-quick-trip',
    stressFactor: 'low',
    estimatedCostAED: 0
  },
  {
    id: 'armenia',
    countryName: 'Armenia',
    countryCode: 'AM',
    flag: '🇦🇲',
    continent: 'Asia',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Visa on Arrival stamped directly at Yerevan airport for UAE residence visa holders.',
    passportNotes: 'Requires valid UAE Emirates ID / Residence Visa and 6-month passport buffer.',
    processingTimeDays: 0,
    visaGuyPerks: ['Border desk checklist packet', 'Pre-departure document verification'],
    inquirySlug: 'armenia-voa',
    stressFactor: 'low',
    estimatedCostAED: 40
  },
  {
    id: 'azerbaijan',
    countryName: 'Azerbaijan',
    countryCode: 'AZ',
    flag: '🇦🇿',
    continent: 'Asia',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Visa on Arrival directly at Baku airport (GYD) for UAE residence visa holders (valid minimum 3 months).',
    passportNotes: 'Takes 10 minutes at the electronic kiosk at Baku airport.',
    processingTimeDays: 0,
    visaGuyPerks: ['Fast-track airport terminal guide', 'Travel insurance bundle'],
    inquirySlug: 'azerbaijan-baku',
    stressFactor: 'low',
    estimatedCostAED: 95
  },
  {
    id: 'oman',
    countryName: 'Oman',
    countryCode: 'OM',
    flag: '🇴🇲',
    continent: 'Middle East',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Visa-free / 14-day Visa on Arrival for GCC residents in approved commercial, technical, and executive professions.',
    passportNotes: 'Available at Hatta / Al Ain land borders and Muscat airport.',
    processingTimeDays: 0,
    visaGuyPerks: ['Profession title eligibility check', 'Land border crossing tips'],
    inquirySlug: 'oman-road-trip',
    stressFactor: 'low',
    estimatedCostAED: 50
  },
  {
    id: 'maldives',
    countryName: 'Maldives',
    countryCode: 'MV',
    flag: '🇲🇻',
    continent: 'Asia',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Free 30-day Visa on Arrival granted to all nationalities upon arrival at Male airport.',
    passportNotes: 'Requires confirmed hotel booking, return flight ticket, and IMUGA declaration submitted within 96 hours.',
    processingTimeDays: 0,
    visaGuyPerks: ['IMUGA traveler declaration assistance', 'Resort transit guidance'],
    inquirySlug: 'maldives-getaway',
    stressFactor: 'low',
    estimatedCostAED: 0
  },
  {
    id: 'seychelles',
    countryName: 'Seychelles',
    countryCode: 'SC',
    flag: '🇸🇨',
    continent: 'Africa',
    tier: 'easy',
    tierLabel: 'Instant VOA / Visa-Free',
    uaeResidentRule: 'Visa-free country for all travelers. A visitor permit is issued upon arrival.',
    passportNotes: 'Must complete online Seychelles Travel Authorization prior to boarding.',
    processingTimeDays: 0,
    visaGuyPerks: ['Travel Authorization filing', 'Island hopping itinerary check'],
    inquirySlug: 'seychelles-permit',
    stressFactor: 'low',
    estimatedCostAED: 0
  },

  // TIER 2: FAST EVISA
  {
    id: 'saudi-arabia',
    countryName: 'Saudi Arabia',
    countryCode: 'SA',
    flag: '🇸🇦',
    continent: 'Middle East',
    tier: 'evisa',
    tierLabel: 'Fast eVisa (Online)',
    uaeResidentRule: 'Instant 1-Year Multiple Entry Tourist eVisa for all GCC Residents with valid residency of at least 3 months.',
    passportNotes: 'Passport must be valid for minimum 6 months. Covers tourism, family visits, and Umrah.',
    processingTimeDays: 1,
    visaGuyPerks: ['24-hour express eVisa processing', 'Umrah permit integration guidance', 'Nusuk portal sync'],
    inquirySlug: 'saudi-gcc-evisa',
    stressFactor: 'medium',
    estimatedCostAED: 380
  },
  {
    id: 'turkey',
    countryName: 'Turkey',
    countryCode: 'TR',
    flag: '🇹🇷',
    continent: 'Europe',
    tier: 'evisa',
    tierLabel: 'Fast eVisa (Online)',
    uaeResidentRule: 'Eligible for instant single-entry eVisa if holding valid US, UK, Schengen, or Ireland visa/residency, or direct sticker visa.',
    passportNotes: 'Indian and Filipino passports can get instant eVisa if holding active Schengen/US/UK visa.',
    processingTimeDays: 2,
    visaGuyPerks: ['Eligibility audit (Sticker vs eVisa)', 'Express Istanbul embassy appointment booking', 'Travel insurance'],
    inquirySlug: 'turkey-evisa-audit',
    stressFactor: 'medium',
    estimatedCostAED: 220
  },
  {
    id: 'egypt',
    countryName: 'Egypt',
    countryCode: 'EG',
    flag: '🇪🇬',
    continent: 'Africa',
    tier: 'evisa',
    tierLabel: 'Fast eVisa (Online)',
    uaeResidentRule: 'Visa on arrival for UAE residents holding valid residency of at least 6 months, or online eVisa.',
    passportNotes: 'Requires confirmed hotel booking and min 2,000 USD or equivalent funds for certain nationalities.',
    processingTimeDays: 2,
    visaGuyPerks: ['Cairo airport clearance verification', 'Nile cruise visa paperwork check'],
    inquirySlug: 'egypt-residence-entry',
    stressFactor: 'medium',
    estimatedCostAED: 110
  },
  {
    id: 'thailand',
    countryName: 'Thailand',
    countryCode: 'TH',
    flag: '🇹🇭',
    continent: 'Asia',
    tier: 'evisa',
    tierLabel: 'Fast eVisa (Online)',
    uaeResidentRule: 'Official eVisa portal for UAE residents. Select passports enjoy 60-day visa-free entry.',
    passportNotes: 'Requires 6 months passport validity and digital photograph.',
    processingTimeDays: 4,
    visaGuyPerks: ['Fast-track Thai eVisa application check', 'Proof of funds template'],
    inquirySlug: 'thailand-evisa',
    stressFactor: 'medium',
    estimatedCostAED: 160
  },

  // TIER 3: CONCIERGE REQUIRED ("THE VISA GUY" EXCLUSIVE SUPPORT)
  {
    id: 'schengen',
    countryName: 'Schengen Area (France, Italy, Spain, Switzerland, Germany)',
    countryCode: 'EU',
    flag: '🇪🇺',
    continent: 'Europe',
    tier: 'concierge',
    tierLabel: 'The Visa Guy Concierge Required',
    uaeResidentRule: 'Strict biometric submission at VFS Global / TLScontact in Dubai or Abu Dhabi. Appointment slots sell out within seconds.',
    passportNotes: 'Requires 6-month bank statements stamped by UAE bank, employer NOC letter, confirmed flight/hotel bookings, and 30,000 EUR insurance.',
    processingTimeDays: 15,
    visaGuyPerks: [
      '⚡ Automated VFS/TLS appointment slot bot & premium alert',
      '📑 Full document pre-audit (guaranteeing zero paperwork rejection)',
      '🏨 Verifiable flight & hotel itineraries without upfront purchase risk',
      '✍️ Customized Schengen travel cover letter drafted by visa lawyers',
      '🚨 Emergency escalation for corporate/urgent family travel'
    ],
    inquirySlug: 'schengen-vip-concierge',
    stressFactor: 'high',
    estimatedCostAED: 650
  },
  {
    id: 'united-kingdom',
    countryName: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    continent: 'Europe',
    tier: 'concierge',
    tierLabel: 'The Visa Guy Concierge Required',
    uaeResidentRule: 'VFS Dubai / Abu Dhabi biometric appointment required. Complex online GOV.UK financial disclosure portal.',
    passportNotes: 'Requires extensive financial ties evidence, origin country ties, and certified salary bank credits.',
    processingTimeDays: 21,
    visaGuyPerks: [
      '💼 6-Month / 2-Year / 5-Year Visitor Visa strategy consultation',
      '📂 GOV.UK portal filing & biometric appointment locking',
      '📑 Financial tie documentation structuring to prevent refusal under paragraph V4.2',
      '⚡ Priority (5-day) and Super Priority (24-hour) biometric escalation'
    ],
    inquirySlug: 'uk-visitor-concierge',
    stressFactor: 'high',
    estimatedCostAED: 750
  },
  {
    id: 'united-states',
    countryName: 'United States (B1/B2 Tourist)',
    countryCode: 'US',
    flag: '🇺🇸',
    continent: 'Americas',
    tier: 'concierge',
    tierLabel: 'The Visa Guy Concierge Required',
    uaeResidentRule: 'Consulate General Dubai or US Embassy Abu Dhabi in-person interview. Appointment wait times often exceed 8 months without slot monitoring.',
    passportNotes: 'DS-160 application must match exact employment and travel history.',
    processingTimeDays: 30,
    visaGuyPerks: [
      '🎯 DS-160 flawless filing (eliminating inconsistency red-flags)',
      '⚡ US Consulate appointment slot rescheduling bot (bringing dates forward by months)',
      '🎙️ 1-on-1 consular interview preparation & mock interview session with former visa consultants',
      '👨‍👩‍👧 Family group appointment synchronization'
    ],
    inquirySlug: 'us-b1b2-concierge',
    stressFactor: 'high',
    estimatedCostAED: 850
  },
  {
    id: 'japan',
    countryName: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    continent: 'Asia',
    tier: 'concierge',
    tierLabel: 'The Visa Guy Concierge Required',
    uaeResidentRule: 'Official eVisa portal for UAE residents via JAPAN eVISA system, or physical submission at VFS Wafi Mall.',
    passportNotes: 'Requires detailed daily itinerary schedule (Schedule of Stay), UAE bank statements, and company NOC.',
    processingTimeDays: 7,
    visaGuyPerks: [
      '🎌 Exact Schedule of Stay daily planning formatting',
      '📱 JAPAN eVISA system filing and verification',
      '⚡ 5-day turnaround guarantee'
    ],
    inquirySlug: 'japan-evisa-concierge',
    stressFactor: 'medium',
    estimatedCostAED: 350
  },
  {
    id: 'canada',
    countryName: 'Canada (Visitor Visa / TRV)',
    countryCode: 'CA',
    flag: '🇨🇦',
    continent: 'Americas',
    tier: 'concierge',
    tierLabel: 'The Visa Guy Concierge Required',
    uaeResidentRule: 'Online IRCC portal application + VFS Dubai biometric collection.',
    passportNotes: 'High refusal rates for self-applicants failing to prove dual-intent and strong UAE economic ties.',
    processingTimeDays: 35,
    visaGuyPerks: [
      '🍁 IRCC portal document structuring and purpose of visit letter',
      '💼 Economic tie verification (employment contract, tenancy, family status)',
      '⚡ Biometric appointment coordination'
    ],
    inquirySlug: 'canada-trv-concierge',
    stressFactor: 'high',
    estimatedCostAED: 700
  }
];

export interface UAEProfessionRule {
  category: string;
  isEligibleForOmanVOA: boolean;
  isEligibleForSaudiGCC: boolean;
  notes: string;
}

export const UAE_RESIDENCY_TIERS = [
  { id: 'golden', label: '🌟 UAE Golden Visa (10-Year)', perk: 'Highest approval rating, eligible for streamlined GCC & European tourist applications' },
  { id: 'resident', label: '🇦🇪 UAE Resident (Employment / Partner Visa)', perk: 'Eligible for Georgia, Armenia, Azerbaijan, Oman, and Saudi GCC fast-tracks' },
  { id: 'gcc_citizen', label: '👑 GCC National / Citizen', perk: 'Freedom of movement across GCC & visa-free entry to 80+ countries' },
  { id: 'tourist', label: '✈️ Non-Resident / Tourist in UAE', perk: 'Evaluated solely on passport nationality; concierge services available for international visas' }
];
