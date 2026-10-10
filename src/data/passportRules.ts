import { PassportCheckInput, PassportCheckResult } from '../types/itinerary';

export interface CountryRule {
  code: string;
  countryName: string;
  status: PassportCheckResult['visaStatus'];
  notes: string;
}

export const COUNTRY_VISA_MATRIX: Record<string, CountryRule> = {
  IN: {
    code: 'IN',
    countryName: 'India',
    status: 'eVisa Required',
    notes: '30/60-day tourist visa required prior to arrival. (Holders of US B1/B2, Green Card, or UK/EU residence permit are eligible for 14-day Visa on Arrival).'
  },
  US: {
    code: 'US',
    countryName: 'United States',
    status: 'Visa on Arrival (30 Days)',
    notes: 'Free 30-day visa on arrival stamped directly at airport immigration.'
  },
  GB: {
    code: 'GB',
    countryName: 'United Kingdom',
    status: 'Visa on Arrival (30 Days)',
    notes: 'Free 30-day visa on arrival with 10-day extension grace period.'
  },
  AE: {
    code: 'AE',
    countryName: 'United Arab Emirates',
    status: 'Visa-Free',
    notes: 'National / Citizen of UAE.'
  },
  SA: {
    code: 'SA',
    countryName: 'Saudi Arabia',
    status: 'Visa-Free',
    notes: 'GCC National. Freedom of movement with National ID or Passport.'
  },
  PH: {
    code: 'PH',
    countryName: 'Philippines',
    status: 'Pre-Arranged Visa',
    notes: 'Pre-arranged tourist visa required via airline, hotel, or certified tour operator.'
  },
  DE: {
    code: 'DE',
    countryName: 'Germany / EU',
    status: 'Visa on Arrival (30 Days)',
    notes: '90-day visa-free entry within 180 days for Schengen passport holders.'
  },
  CA: {
    code: 'CA',
    countryName: 'Canada',
    status: 'Visa on Arrival (30 Days)',
    notes: 'Free 30-day tourist entry on arrival at all UAE international airports.'
  },
  PK: {
    code: 'PK',
    countryName: 'Pakistan',
    status: 'Pre-Arranged Visa',
    notes: 'Pre-arranged tourist visa required with verified return ticket and proof of funds.'
  }
};

export function evaluatePassportRules(input: PassportCheckInput): PassportCheckResult {
  const tripDate = new Date(input.tripStartDate || new Date());
  const expiryDate = new Date(input.passportExpiryDate);

  const diffTime = expiryDate.getTime() - tripDate.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const countryRule = COUNTRY_VISA_MATRIX[input.nationality] || {
    code: input.nationality,
    countryName: 'International Traveler',
    status: 'eVisa Required',
    notes: 'Standard tourist visa required prior to departure.'
  };

  const sixMonthsRulePassed = daysRemaining >= 180;

  if (isNaN(daysRemaining) || daysRemaining <= 0) {
    return {
      valid: false,
      daysRemaining: 0,
      sixMonthsRulePassed: false,
      visaStatus: countryRule.status,
      message: 'Passport has ALREADY EXPIRED! Border entry will be flatly rejected at boarding.',
      badgeColor: 'bg-red-500 text-white'
    };
  }

  if (!sixMonthsRulePassed) {
    return {
      valid: false,
      daysRemaining,
      sixMonthsRulePassed: false,
      visaStatus: countryRule.status,
      message: `CRITICAL RED ALERT: Passport has only ${daysRemaining} days validity remaining. Immigration authorities mandate at least 180 days (6 months) beyond entry date. Airlines will deny check-in!`,
      badgeColor: 'bg-red-500 text-white'
    };
  }

  if (input.nationality === input.destinationCountry) {
    return {
      valid: true,
      daysRemaining,
      sixMonthsRulePassed: true,
      visaStatus: 'Visa-Free',
      message: `Domestic Entry: You are traveling within your home country/region. No international visa or passport buffer required.`,
      badgeColor: 'bg-emerald-500 text-white'
    };
  }

  return {
    valid: true,
    daysRemaining,
    sixMonthsRulePassed: true,
    visaStatus: countryRule.status,
    message: `Entry Pass Validated for ${input.destinationCountry}: ${daysRemaining} days passport buffer meets international border regulations. ${countryRule.notes}`,
    badgeColor: 'bg-emerald-500 text-white'
  };
}
