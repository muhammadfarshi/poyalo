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

  // 2. TONE: ROAST | ERA: 1950s
  {
    id: 'story-creek-roast-1950s',
    placeId: 'poi-creek-abra',
    placeName: 'Khor Dubai Dredging Trench',
    cityName: 'Dubai',
    eraLayer: '1950s',
    tone: 'roast',
    title: 'Digging Mud with Borrowed Shillings',
    tagline: 'When bankers asked for oil collateral and Dubai offered them silt and sheer stubbornness.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: '1954: BRITISH BANK CONSULTANT VISITS...',
        panelScene: 'A bespectacled banker holding a ledger while sweating through his wool suit.',
        illustrationEmoji: '💼',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Bank Inspector',
            avatarEmoji: '🧐',
            text: 'You want a £400,000 loan to scoop silt out of a ditch? Where is your oil? Where is the paperwork?',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Local Merchant',
            avatarEmoji: '👳🏽‍♂️',
            text: 'My paperwork is 2,000 dhows waiting to dock. Sign the bond and watch the magic!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'SPLAT!',
          color: '#FF5722',
          rotationDeg: -5
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'THE STEAM DREDGER STARTS CHUGGING...',
        panelScene: 'Heavy industrial pipes spewing seawater and sludge across the sandbar.',
        illustrationEmoji: '🏗️',
        illustrationBgColor: '#E0F2FE',
        speechBubbles: [
          {
            speaker: 'Chief Engineer',
            avatarEmoji: '👷🏽‍♂️',
            text: 'If this silt bank doesn’t clear, we have officially created the world’s most expensive mud castle!',
            type: 'shout',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Tea Boy',
            avatarEmoji: '☕',
            text: 'Don’t worry boss, extra cardamom in your Karak will make the pumps run faster.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'CHUG-CHUG!',
          color: '#1B3FFF',
          rotationDeg: 6
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: '1958: FIRST OCEAN STEAMER SQUEEZES IN...',
        panelScene: 'A giant commercial freighter docking right outside the spice souk.',
        illustrationEmoji: '🚢',
        illustrationBgColor: '#DCFCE7',
        speechBubbles: [
          {
            speaker: 'Bank Inspector',
            avatarEmoji: '😳',
            text: 'I say... they actually did it. The customs duties paid off the entire debt in three years!',
            type: 'thought',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Dhow Sailor',
            avatarEmoji: '😎',
            text: 'Never bet against a creek with an attitude!',
            type: 'shout',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'HONKKKK!',
          color: '#10B981',
          rotationDeg: -4
        }
      }
    ],
    sources: ['Halcrow Engineering Archives (1954)', 'Dubai Customs Revenue Records']
  },

  // 3. TONE: ROAST | ERA: MODERN
  {
    id: 'story-creek-roast-modern',
    placeId: 'poi-creek-abra',
    placeName: 'Downtown & The Marina Skyline',
    cityName: 'Dubai',
    eraLayer: 'modern',
    tone: 'roast',
    title: 'Gold Dust, Drones & The 1-Dirham Abra',
    tagline: 'How 140 years of progress turned pearl diving into \$50 gold cappuccinos.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'AT THE TOP OF BURJ KHALIFA (LEVEL 148)...',
        panelScene: 'An influencer balancing on one foot taking a selfie with a gold latte.',
        illustrationEmoji: '☕',
        illustrationBgColor: '#FEF9C3',
        speechBubbles: [
          {
            speaker: 'Influencer',
            avatarEmoji: '🤳',
            text: 'My phone overheated in 4 seconds, but my gold-leaf croissant has never looked more aesthetic!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Phone Battery',
            avatarEmoji: '🪫',
            text: '1% remaining. May the desert heat have mercy on your feed.',
            type: 'thought',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'CLICK!',
          color: '#F59E0B',
          rotationDeg: 8
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'DOWN AT THE CREEK CROSSING...',
        panelScene: 'A \$40 million mega yacht gets overtaken by a humble 1-dirham wooden abra.',
        illustrationEmoji: '🚤',
        illustrationBgColor: '#DBEAFE',
        speechBubbles: [
          {
            speaker: 'Yacht Owner',
            avatarEmoji: '🧐',
            text: 'My fuel costs \$8,000 an hour! How are you moving faster than me?!',
            type: 'shout',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Abra Captain',
            avatarEmoji: '🧔🏽‍♂️',
            text: 'Because wooden boats don’t need 12 computer calibrations to start, my friend! One dirham please!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'VRRRR!',
          color: '#1B3FFF',
          rotationDeg: -6
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'INDOOR SKI RESORT VS 45°C DESERT DUNE...',
        panelScene: 'A confused penguin looking through the glass window at the sun-baked sand.',
        illustrationEmoji: '🐧',
        illustrationBgColor: '#F3E8FF',
        speechBubbles: [
          {
            speaker: 'Ski Dubai Penguin',
            avatarEmoji: '🐧',
            text: 'Outside is literally Mars, but inside I am eating imported salmon on real snow. Humans are wild.',
            type: 'thought',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Local Falcon',
            avatarEmoji: '🦅',
            text: 'Welcome to modern Dubai, penguin bro. Tomorrow we fly on autonomous drone taxis.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'BRRRR!',
          color: '#9333EA',
          rotationDeg: 4
        }
      }
    ],
    sources: ['Dubai Tourism Statistical Bulletin 2026', 'Aviation & Marine Transit Bureau']
  },

  // 4. TONE: STORYTELLER | ERA: 1800s
  {
    id: 'story-creek-story-1800s',
    placeId: 'poi-creek-abra',
    placeName: 'Persian Gulf Pearl Banks',
    cityName: 'Dubai',
    eraLayer: '1800s',
    tone: 'storyteller',
    title: 'Hymns of the Nahham Diver',
    tagline: 'When the sea singer’s voice carried the hopes of an entire coast across midnight waters.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'NIGHTFALL ON THE "AL JALBOOT" DHOW...',
        panelScene: 'Forty men huddled under the stars as the wooden timbers groan against the tide.',
        illustrationEmoji: '🌌',
        illustrationBgColor: '#1E293B',
        speechBubbles: [
          {
            speaker: 'The Nahham (Sea Singer)',
            avatarEmoji: '👳🏽‍♂️',
            text: 'O deep sea, hold our sons gently. Return them to their mothers with the pearly riches of the deep.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Young Rope Puller (Saib)',
            avatarEmoji: '🪵',
            text: 'His song gives us strength when our hands bleed from the hemp ropes.',
            type: 'thought',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'WHOOSH...',
          color: '#38BDF8',
          rotationDeg: -3
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'THE DESCENDING DEEP (AL GHAUS)...',
        panelScene: 'A diver descends silently into turquoise abyss with nothing but a stone weight.',
        illustrationEmoji: '🤿',
        illustrationBgColor: '#0F172A',
        speechBubbles: [
          {
            speaker: 'Narrator',
            avatarEmoji: '📜',
            text: 'Two tugs on the lifeline means oxygen is spent. One tug means pull with the speed of thunder.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'THUMP-THUMP',
          color: '#06B6D4',
          rotationDeg: 5
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'THE CORAL WATCHTOWERS IN SIGHT...',
        panelScene: 'Women and children on the shores of Khor Dubai greeting the white dhow sails.',
        illustrationEmoji: '🏰',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Grandmother',
            avatarEmoji: '👵🏽',
            text: 'They have returned! Light the frankincense and prepare the dates for the brave divers!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Diver',
            avatarEmoji: '🤍',
            text: 'We brought the finest Al Dana pearls for Dubai.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'ALHAMDULILLAH!',
          color: '#10B981',
          rotationDeg: -4
        }
      }
    ],
    sources: ['Traditional UAE Maritime Songs (Al Nahma)', 'Sharjah Heritage Museum Archives']
  },

  // 5. TONE: STORYTELLER | ERA: 1950s
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

  // 6. TONE: STORYTELLER | ERA: MODERN
  {
    id: 'story-creek-story-modern',
    placeId: 'poi-creek-abra',
    placeName: 'The Futuristic Coastline & Beyond',
    cityName: 'Dubai',
    eraLayer: 'modern',
    tone: 'storyteller',
    title: 'Mirage to Global Crossroads',
    tagline: 'From pearl diving dhows to humanity’s gateway to the solar system.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'TWILIGHT OVER DOWNTOWN SPIRES...',
        panelScene: 'The Burj Khalifa illuminated against the Arabian night sky.',
        illustrationEmoji: '✨',
        illustrationBgColor: '#1E1B4B',
        speechBubbles: [
          {
            speaker: 'Traveler',
            avatarEmoji: '🧳',
            text: 'Is this real or a dream built from light? How did this rise from bare dunes in a single lifetime?',
            type: 'thought',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'SHINE!',
          color: '#818CF8',
          rotationDeg: -5
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'WHERE 200 NATIONALITIES MEET...',
        panelScene: 'People from every continent sharing Karak tea and laughter along the promenade.',
        illustrationEmoji: '🌍',
        illustrationBgColor: '#EFF6FF',
        speechBubbles: [
          {
            speaker: 'Emirati Host',
            avatarEmoji: '🤝',
            text: 'Our ancestors welcomed dhows from Zanzibar and Bombay. Today we welcome the entire world.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Global Explorer',
            avatarEmoji: '🎒',
            text: 'We came as strangers, but this city makes you feel like an explorer of the future.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ]
      },
      {
        panelNumber: 3,
        narrativeCaption: 'NEXT HORIZON: MARS 2117...',
        panelScene: 'A mock habitat at the Mohammed Bin Rashid Space Centre aiming for the red planet.',
        illustrationEmoji: '🚀',
        illustrationBgColor: '#FEE2E2',
        speechBubbles: [
          {
            speaker: 'Space Engineer',
            avatarEmoji: '👩🏽‍🚀',
            text: 'Our grandfathers navigated by the stars on the Gulf. Now our children are charting courses between them.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'LIFTOFF!',
          color: '#DC2626',
          rotationDeg: 7
        }
      }
    ],
    sources: ['UAE Space Agency Records', 'Mohammed Bin Rashid Library Archives']
  },

  // 7. TONE: PROFESSOR | ERA: 1800s
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
        narrativeCaption: 'GLOBAL TRADE CORRIDOR: MARITIME SILK ROUTE',
        panelScene: 'Dhow trading routes connecting Dubai, Bombay, and the ports of East Africa.',
        illustrationEmoji: '🗺️',
        illustrationBgColor: '#ECFDF5',
        speechBubbles: [
          {
            speaker: 'Historian Archon',
            avatarEmoji: '🧐',
            text: 'Pearls traveled via merchant dhows to the Royal Courts of Europe and India, cementing Dubai Creek as the nexus of Gulf maritime trade.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      }
    ],
    sources: ['Dr. Frauke Heard-Bey: From Trucial States to UAE', 'Archaeological Survey of the Gulf']
  },

  // 8. TONE: PROFESSOR | ERA: 1950s
  {
    id: 'story-creek-prof-1950s',
    placeId: 'poi-creek-abra',
    placeName: 'Khor Dubai Estuarine Engineering',
    cityName: 'Dubai',
    eraLayer: '1950s',
    tone: 'professor',
    title: 'Hydrology of Khor Dubai Silt Channeling',
    tagline: 'Civil engineering breakdown of Sir William Halcrow’s 1954 tidal dredging project.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'THE HYDRODYNAMIC SEDIMENTATION DILEMMA',
        panelScene: 'Cross-section showing tidal littoral drift depositing sandbars at the creek mouth.',
        illustrationEmoji: '📐',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Dr. Halcrow',
            avatarEmoji: '👨🏽‍🏫',
            text: 'Littoral sand transport was depositing 60,000 m³ of sediment annually. Low tide draft dropped below 1.6 meters, grounding laden dhows.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      },
      {
        panelNumber: 2,
        narrativeCaption: 'TWIN TRAINING BREAKWATERS & HYDRAULIC SUCTION',
        panelScene: 'Steel sheet piles driven into seabed to construct breakwaters directing the outgoing tide.',
        illustrationEmoji: '⚙️',
        illustrationBgColor: '#E0F2FE',
        speechBubbles: [
          {
            speaker: 'Dr. Halcrow',
            avatarEmoji: '👨🏽‍🏫',
            text: 'By erecting twin sheet-pile breakwaters, we harnessed natural tidal scouring velocities to maintain a guaranteed 2.8m navigable channel.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'SCOURING!',
          color: '#1B3FFF',
          rotationDeg: -5
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'THE ECONOMIC MULTIPLIER PRINCIPLE',
        panelScene: 'Graph showing customs revenue spiking 600% after completion in 1960.',
        illustrationEmoji: '📈',
        illustrationBgColor: '#DCFCE7',
        speechBubbles: [
          {
            speaker: 'Dr. Halcrow',
            avatarEmoji: '👨🏽‍🏫',
            text: 'Dredged spoil was reclaimed to create the new Deira and Bur Dubai commercial quaysides, generating revenue before oil was ever tapped.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      }
    ],
    sources: ['Sir William Halcrow & Partners Technical Papers (1955)', 'Gulf Economic Review']
  },

  // 9. TONE: PROFESSOR | ERA: MODERN
  {
    id: 'story-creek-prof-modern',
    placeId: 'poi-creek-abra',
    placeName: 'Megastructure Engineering & Solar Desal',
    cityName: 'Dubai',
    eraLayer: 'modern',
    tone: 'professor',
    title: 'Aerodynamics & Microclimate of the Vertical Desert',
    tagline: 'Structural vortex shedding, passive wind tower physics, and solar desalination.',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'VORTEX SHEDDING IN HYPER-TALL TOWERS',
        panelScene: 'Wind tunnel simulation showing air vortex patterns around the stepped Burj Khalifa core.',
        illustrationEmoji: '🌪️',
        illustrationBgColor: '#EFF6FF',
        speechBubbles: [
          {
            speaker: 'Structural Analyst',
            avatarEmoji: '👩🏽‍🔬',
            text: 'Notice the Y-shaped buttressed core with stepping setbacks. It confuses high-altitude vortex shedding, neutralizing resonant oscillation.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'AERO-DYNAMIC!',
          color: '#3B82F6',
          rotationDeg: 5
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'THERMODYNAMICS OF THE HISTORIC "BARJEEL"',
        panelScene: 'Thermal diagram of a traditional Al Fahidi wind tower creating convective downdrafts.',
        illustrationEmoji: '💨',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Structural Analyst',
            avatarEmoji: '👩🏽‍🔬',
            text: 'Centuries prior, Emirati Barjeel towers exploited Bernoulli’s principle: funneling ambient breeze downward while drawing warm interior air out.',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ]
      },
      {
        panelNumber: 3,
        narrativeCaption: 'CLOSED-LOOP DESALINATION & SMART WATER NETWORKS',
        panelScene: 'Reverse osmosis plants powered by Mohammed bin Rashid Al Maktoum Solar Park.',
        illustrationEmoji: '💧',
        illustrationBgColor: '#ECFDF5',
        speechBubbles: [
          {
            speaker: 'Structural Analyst',
            avatarEmoji: '👩🏽‍🔬',
            text: 'Modern Dubai operates 5,000 MW of solar capacity, driving seawater reverse osmosis microgrids with near-zero thermal brine pollution.',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ]
      }
    ],
    sources: ['Council on Tall Buildings and Urban Habitat (CTBUH)', 'DEWA Sustainability Compendium']
  },

  // 10. TONE: KID | ERA: 1800s
  {
    id: 'story-creek-kid-1800s',
    placeId: 'poi-creek-abra',
    placeName: 'The Secret Pearl Lagoon',
    cityName: 'Dubai',
    eraLayer: '1800s',
    tone: 'kid',
    title: 'Pip the Oyster & The Shiny Pearl Secret!',
    tagline: 'Join Pip the baby oyster and Captain Crab on a bubbly treasure hunt in the ancient sea!',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'MEET PIP THE SMILEY OYSTER!',
        panelScene: 'A cute little clam shell grinning under the gentle sea waves.',
        illustrationEmoji: '🦪',
        illustrationBgColor: '#E0F2FE',
        speechBubbles: [
          {
            speaker: 'Pip the Oyster',
            avatarEmoji: '🦪',
            text: 'Tickle tickle! Inside my shell is a tiny shiny secret: a rainbow pearl!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Captain Crab',
            avatarEmoji: '🦀',
            text: 'Clickity clack! Don’t lose it Pip, we have to show the friendly dhow sailors!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'BUBBLE-POP!',
          color: '#0284C7',
          rotationDeg: -6
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'THE COLORFUL CORAL REEF DANCE!',
        panelScene: 'Neon clownfish and sea turtles dancing around the seafloor.',
        illustrationEmoji: '🐠',
        illustrationBgColor: '#FEF9C3',
        speechBubbles: [
          {
            speaker: 'Tilly Turtle',
            avatarEmoji: '🐢',
            text: 'Swimming high, swimming low! Look at the wooden dhow sailing way up above!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'SWISH!',
          color: '#10B981',
          rotationDeg: 6
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'SAFE HOME AT SUNSET OASIS!',
        panelScene: 'Pip and friends waving at the cozy palm trees along the creek shore.',
        illustrationEmoji: '🌴',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Pip the Oyster',
            avatarEmoji: '🦪',
            text: 'Goodnight little creek! Tomorrow we will find more shiny treasures!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'YAYYY!',
          color: '#F59E0B',
          rotationDeg: -4
        }
      }
    ],
    sources: ['UAE Heritage Fairytales for Children', 'Pearl of Arabia Folklore Collection']
  },

  // 11. TONE: KID | ERA: 1950s
  {
    id: 'story-creek-kid-1950s',
    placeId: 'poi-creek-abra',
    placeName: 'Big Barnaby’s Mud Playground',
    cityName: 'Dubai',
    eraLayer: '1950s',
    tone: 'kid',
    title: 'Barnaby the Big Dredging Crane!',
    tagline: 'Barnaby loves scooping mud and making super-fast water slides for his boat friends!',
    panels: [
      {
        panelNumber: 1,
        narrativeCaption: 'WAKE UP BARNABY!',
        panelScene: 'A giant friendly cartoon excavator crane with big smiley headlights.',
        illustrationEmoji: '🏗️',
        illustrationBgColor: '#FEF3C7',
        speechBubbles: [
          {
            speaker: 'Barnaby the Crane',
            avatarEmoji: '🚜',
            text: 'Beep beep! Today I am building the biggest water playground in the whole world!',
            type: 'speech',
            pointerDirection: 'bottom-left'
          },
          {
            speaker: 'Timmy Tugboat',
            avatarEmoji: '🚢',
            text: 'Can you scoop out the big mud puddle so I can zoom through?',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'BEEP-BEEP!',
          color: '#F97316',
          rotationDeg: -7
        }
      },
      {
        panelNumber: 2,
        narrativeCaption: 'SPLISH! SPLASH! SCOOP!',
        panelScene: 'Barnaby lifting a giant scoop of sand while seagulls cheer.',
        illustrationEmoji: '🌊',
        illustrationBgColor: '#DBEAFE',
        speechBubbles: [
          {
            speaker: 'Barnaby the Crane',
            avatarEmoji: '🚜',
            text: 'One scoop for Deira! One scoop for Bur Dubai! And a splash for the fishies!',
            type: 'shout',
            pointerDirection: 'bottom-left'
          }
        ],
        soundEffect: {
          text: 'KER-SPLASH!',
          color: '#2563EB',
          rotationDeg: 8
        }
      },
      {
        panelNumber: 3,
        narrativeCaption: 'THE BIG HAPPY BOAT PARADE!',
        panelScene: 'Boats of all shapes and colors sailing down the sparkling deep water channel.',
        illustrationEmoji: '🎉',
        illustrationBgColor: '#DCFCE7',
        speechBubbles: [
          {
            speaker: 'All the Boats',
            avatarEmoji: '⛵',
            text: 'Honk honk! Thank you Barnaby! The creek is wide and ready for party!',
            type: 'speech',
            pointerDirection: 'bottom-right'
          }
        ],
        soundEffect: {
          text: 'HOORAY!',
          color: '#16A34A',
          rotationDeg: -5
        }
      }
    ],
    sources: ['Kids Guide to Dubai History', 'Adventures on Khor Dubai']
  },

  // 12. TONE: KID | ERA: MODERN
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
  // Fallback to closest tone match
  const toneMatch = DUBAI_COMIC_STORIES.find(s => s.tone === tone);
  if (toneMatch) return toneMatch;
  return DUBAI_COMIC_STORIES[0];
}
