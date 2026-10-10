export interface MurphyScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  impactText: string;
}

export const MURPHY_SCENARIOS: MurphyScenario[] = [
  {
    id: 'monsoon-rain',
    title: 'Flash Cloudburst & Street Flooding',
    icon: '⛈️',
    description: 'A sudden unseasonal torrential downpour drenches Dubai Creek. Outdoor walkways, abras, and souks are flooded.',
    impactText: 'Outdoor stops flagged as severe hazard! Auto-Repair will pivot to indoor museums and tea houses.'
  },
  {
    id: 'flight-delay',
    title: 'Flight CCJ ➔ DXB 3-Hour Layover Delay',
    icon: '✈️',
    description: 'Baggage handling delays at Terminal 1 push your arrival back by 180 minutes. Morning plans are blown.',
    impactText: 'Morning schedule compressed. Afternoon stops require immediate re-sequencing.'
  },
  {
    id: 'bridge-closure',
    title: 'Al Maktoum Bridge Maintenance Closure',
    icon: '🚧',
    description: 'Emergency bridge maintenance halts vehicular traffic crossing Dubai Creek between Bur Dubai and Deira.',
    impactText: 'Transit times across the creek quadrupled! Walking or Abra boat required.'
  }
];

export function getRandomMurphyScenario(): MurphyScenario {
  return MURPHY_SCENARIOS[0]; // Primary demo: monsoon downpour
}
