import { ComicStory, ComicTone, EraLayer } from '../types/comic';

export const DUBAI_COMIC_STORIES: ComicStory[] = [
  // 1. TONE: ROAST | ERA: 1800s
  {
    id: 'story-creek-roast-1800s',
    placeId: 'poi-creek-abra',
    placeName: 'Dubai Creek & Pearl Banks',
    cityName: 'Dubai',
    eraLayer: '1800s',
    tone: 'roast',
    title: 'The Great Oyster Gamble',
    tagline: 'When 40 dives a day earned you half a dried date and turtle-shell nose clips.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: '1880: THE CREEK BEFORE AIR CONDITIONING...',
        panelScene: 'A wooden dhow preparing for a 4-month voyage into the sweltering Gulf.',
        illustrationEmoji: '⛵',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Captain (Nokhada)',
            avatarEmoji: '🧔🏽‍♂️',
            text: 'Welcome aboard lads! 4 months at sea, 50°C heat, and your only safety equipment is a turtle clip on your nose!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Young Diver (Ghays)',
            avatarEmoji: '🏊🏽‍♂️',
            text: 'Wait... do we get dental insurance or at least drinking water?',
            type: 'thought',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'SPLASH!',
          color: '#1B3FFF',
          rotationDeg: -6
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: '20 METERS DEEP IN THE PERSIAN GULF...',
        panelScene: 'Diver grabbing oysters frantically before oxygen runs out.',
        illustrationEmoji: '🦪',
        illustrationBgColor: '#DBEAFE',
        speechBubbles: [
          {
            speaker: 'Young Diver',
            avatarEmoji: '🏊🏽‍♂️',
            text: 'I found an oyster! I am going to buy a camel and retire in the oasis!',
            type: 'thought',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Passing Sea Turtle',
            avatarEmoji: '🐢',
            text: 'Bro, that is literally a clump of sea moss. Good luck paying off your boat loan.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'GULP!',
          color: '#10B981',
          rotationDeg: 8
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'MEANWHILE, AT THE SOUK AUCTION...',
        panelScene: 'The wealthy pearl merchant weighing goods with copper scales.',
        illustrationEmoji: '⚖️',
        illustrationBgColor: '#FEE2E2',
        speechBubbles: [
          {
            speaker: 'Pearl Merchant (Tawwash)',
            avatarEmoji: '👳🏽‍♂️',
            text: 'Splendid natural luster! Paris and Bombay will pay 50,000 rupees. Here is your 2 dirhams diver, don’t spend it all on dates.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Young Diver',
            avatarEmoji: '😵‍💫',
            text: 'Capitalism was invented in 1885 right here on Dubai Creek, I swear.',
            type: 'shout',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'CHA-CHING!',
          color: '#FF5722',
          rotationDeg: -4
        }
      }
    ],
    sources: ['Dubai Pearl Museum Archives', 'Lorimer’s Gazetteer of the Persian Gulf (1908)']
  },

  // 2. TONE: PROFESSOR | ERA: 1800s
  {
    id: 'story-creek-prof-1800s',
    placeId: 'poi-creek-abra',
    placeName: 'Dubai Creek & Pearl Banks',
    cityName: 'Dubai',
    eraLayer: '1800s',
    tone: 'professor',
    title: 'The Thermodynamics of Pearl Mercantilism',
    tagline: 'An anatomical breakdown of the 19th-century pearling fleet and wind-tower physics.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'THE ECOSYSTEM OF THE "GHUWAS" FLEET',
        panelScene: 'Over 300 pearling boats anchored in Khor Dubai during the annual dive season (Al Ghaus Al Kabir).',
        illustrationEmoji: '📜',
        illustrationBgColor: '#FEF9C3',
        speechBubbles: [
          {
            speaker: 'Historian Archon',
            avatarEmoji: '🧐',
            text: 'By 1890, pearling accounted for over 95% of Dubai’s export revenue. The entire economy hinged on benthic oyster beds (Hayrat).',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      },
      {
        panelNumber: 2,
        narrativeCaption: 'PHYSIOLOGY OF FREE-DIVING AT 15-20 METERS',
        panelScene: 'Schematic cross-section of a diver utilizing the "Fitam" clip and heavy stone weights.',
        illustrationEmoji: '🤿',
        illustrationBgColor: '#EFF6FF',
        speechBubbles: [
          {
            speaker: 'Historian Archon',
            avatarEmoji: '🧐',
            text: 'Divers used "Haswah" (lead sinker stones) for rapid descent. Each dive lasted 90-120 seconds, repeated 30 to 40 times daily under immense ambient pressure.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'PRESSURE!',
          color: '#1B3FFF',
          rotationDeg: 4
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'GLOBAL TRADE CORRIDOR: CCJ TO DXB',
        panelScene: 'Dhow trading routes connecting Dubai, Calicut (Kozhikode), and Bombay.',
        illustrationEmoji: '🗺️',
        illustrationBgColor: '#ECFDF5',
        speechBubbles: [
          {
            speaker: 'Historian Archon',
            avatarEmoji: '🧐',
            text: 'Pearls traveled via Calicut spice dhows to the Royal Courts of Europe and India, cementing the maritime corridor between Kerala and the Gulf.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      }
    ],
    sources: ['Dr. Frauke Heard-Bey: From Trucial States to UAE', 'Archaeological Survey of the Gulf']
  },

  // 3. TONE: STORYTELLER | ERA: 1950s
  {
    id: 'story-creek-story-1950s',
    placeId: 'poi-creek-abra',
    placeName: 'Dubai Creek Dredging & Al Maktoum Legacy',
    cityName: 'Dubai',
    eraLayer: '1950s',
    tone: 'storyteller',
    title: 'The Gamble that Carved a Nation',
    tagline: 'When silt choked the creek, one ruler risked everything on a bold dredging wager.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: '1954: SILT BLOCKS THE LIFEBLOOD OF DUBAI...',
        panelScene: 'The creek is shallowing; big merchant ships can no longer dock.',
        illustrationEmoji: '🌊',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Sheikh Rashid bin Saeed',
            avatarEmoji: '👑',
            text: 'If the creek chokes with mud, our merchants will starve and our city will vanish beneath the sands.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'RUMBLE!',
          color: '#FF5722',
          rotationDeg: -5
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'AN AUDACIOUS £400,000 GAMBLE...',
        panelScene: 'Heavy dredging cranes digging into the saltwater channel.',
        illustrationEmoji: '🏗️',
        illustrationBgColor: '#F3E8FF',
        speechBubbles: [
          {
            speaker: 'Chief Engineer',
            avatarEmoji: '👷🏽‍♂️',
            text: 'Your Highness, borrowing this much money before oil is discovered is considered impossible madness!',
            type: 'shout',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Sheikh Rashid',
            avatarEmoji: '👑',
            text: 'What is good for the merchants is good for Dubai. Dig the creek deeper than any port in the Gulf!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'YALLA!',
          color: '#FBBF24',
          rotationDeg: 6
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'THE SHIPS RETURN IN TRIUMPH...',
        panelScene: 'Massive ocean liners and trade dhows filling the deep sapphire waters.',
        illustrationEmoji: '🚢',
        illustrationBgColor: '#E0F2FE',
        speechBubbles: [
          {
            speaker: 'Old Sailor',
            avatarEmoji: '🧭',
            text: 'The gamble paid off a thousandfold. The creek became the beating heart of world trade.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ]
      }
    ],
    sources: ['Dubai Historical Society', 'Records of British Political Agency, Dubai']
  },

  // 4. TONE: KID | ERA: MODERN
  {
    id: 'story-creek-kid-modern',
    placeId: 'poi-creek-abra',
    placeName: 'VG World & The Modern Creek',
    cityName: 'Dubai',
    eraLayer: 'modern',
    tone: 'kid',
    title: 'The 1-Dirham Abra Magic Carpet!',
    tagline: 'Meet Abra-Cadabra the Wooden Boat and the Flying Seagulls of Deira!',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'MEET ABRA-CADABRA THE LITTLE WOODEN BOAT!',
        panelScene: 'A cute little wooden boat with big cartoon eyes smiling at the pier.',
        illustrationEmoji: '🚤',
        illustrationBgColor: '#E0F2FE',
        speechBubbles: [
          {
            speaker: 'Abra the Boat',
            avatarEmoji: '🚤',
            text: 'Toot toot! Hop on friends! For just ONE shiny dirham, I’ll take you across the sparkly water!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Sammy the Seagull',
            avatarEmoji: '🐦',
            text: 'Did someone say French fries on the deck?!',
            type: 'shout',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'HONK-HONK!',
          color: '#1B3FFF',
          rotationDeg: -8
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'THE TALL TOWERS SAY HELLO!',
        panelScene: 'Shiny tall skyscrapers waving in the background sunshine.',
        illustrationEmoji: '🏙️',
        illustrationBgColor: '#FEF9C3',
        speechBubbles: [
          {
            speaker: 'Burj Spire',
            avatarEmoji: '🗼',
            text: 'I’m so tall I can tickle the passing clouds! Can you see me from the creek?',
            type: 'speech',
            pointerDirection: 'bottom-right'
          },
          {
            speaker: 'Little Explorer',
            avatarEmoji: '🎒',
            text: 'Woah! It looks like a giant rocket ship ready for outer space!',
            type: 'thought',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'ZOOM!',
          color: '#FF5722',
          rotationDeg: 7
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'GOLDEN ICE CREAM AT THE SPICE SOUK!',
        panelScene: 'Landing safely at Deira with delicious sweets and saffron treats.',
        illustrationEmoji: '🍦',
        illustrationBgColor: '#FDF2F8',
        speechBubbles: [
          {
            speaker: 'Abra the Boat',
            avatarEmoji: '🚤',
            text: 'We made it! Go find the hidden pearls in VG WORLD and earn high score stickers!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'YAYYY!',
          color: '#10B981',
          rotationDeg: -4
        }
      }
    ],
    sources: ['Kids Guide to UAE Heritage', 'Children’s Museum of Dubai']
  }
];

export function getComicForSelection(tone: ComicTone, era: EraLayer): ComicStory {
  const match = DUBAI_COMIC_STORIES.find(s => s.tone === tone && s.eraLayer === era);
  if (match) return match;
  // Fallback to closest match
  const toneMatch = DUBAI_COMIC_STORIES.find(s => s.tone === tone);
  if (toneMatch) return toneMatch;
  return DUBAI_COMIC_STORIES[0];
}
