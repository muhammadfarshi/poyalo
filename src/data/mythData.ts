export interface TravelMyth {
  id: string;
  city: string;
  country: string;
  category: 'humans' | 'monuments' | 'food' | 'traditional' | 'safety';
  categoryLabel: string;
  emoji: string;
  myth: string;
  reality: string;
  insiderTip: string;
  severity: 'high' | 'medium' | 'fun';
}

export const CURATED_MYTHS: Record<string, TravelMyth[]> = {
  'Dubai': [
    {
      id: 'dxb-1',
      city: 'Dubai',
      country: 'United Arab Emirates',
      category: 'humans',
      categoryLabel: 'People & Society',
      emoji: '🏎️',
      myth: 'Everyone in Dubai is an Emirati billionaire driving gold-plated supercars.',
      reality: 'Over 85% of Dubai\'s population consists of everyday working expats from 200+ nations. Most residents take the spotless Dubai Metro and drive standard Japanese sedans.',
      insiderTip: 'Emiratis are known for warm hospitality. If invited for Gahwa (Arabic coffee) and dates, always receive the cup with your right hand.',
      severity: 'fun'
    },
    {
      id: 'dxb-2',
      city: 'Dubai',
      country: 'United Arab Emirates',
      category: 'traditional',
      categoryLabel: 'Culture & Nightlife',
      emoji: '🍹',
      myth: 'Alcohol is completely illegal and you cannot enjoy evening nightlife.',
      reality: 'Hundreds of licensed lounges, beach clubs, rooftop bars, and Michelin-starred venues operate legally across hotels and designated tourist zones.',
      insiderTip: 'Public drunkenness or disorderly street conduct has strictly zero tolerance. Enjoy within licensed venues and use taxis to travel.',
      severity: 'medium'
    },
    {
      id: 'dxb-3',
      city: 'Dubai',
      country: 'United Arab Emirates',
      category: 'monuments',
      categoryLabel: 'Burj Khalifa & Landmarks',
      emoji: '🏗️',
      myth: 'The Burj Khalifa has no sewage pipes and requires endless trucks to empty it daily.',
      reality: 'This is a viral urban myth from a brief 2009 opening delay. The Burj Khalifa has been directly connected to Dubai\'s modern municipal sewerage network for over a decade.',
      insiderTip: 'Book level 124+ tickets online at least 10 days early for 17:30 sunset slots to avoid paying double walk-in surge pricing.',
      severity: 'fun'
    },
    {
      id: 'dxb-4',
      city: 'Dubai',
      country: 'United Arab Emirates',
      category: 'traditional',
      categoryLabel: 'Dress Code & Customs',
      emoji: '👗',
      myth: 'Female travelers must wear full abayas and cover their hair at all times.',
      reality: 'Normal contemporary modest clothing (shorts, t-shirts, summer dresses, swimwear at pools) is standard everywhere across malls, streets, and resorts.',
      insiderTip: 'Modest dress (shoulders and knees covered, hair scarf) is only required when visiting religious mosques like the Grand Mosque, where complimentary abayas are provided.',
      severity: 'high'
    },
    {
      id: 'dxb-5',
      city: 'Dubai',
      country: 'United Arab Emirates',
      category: 'food',
      categoryLabel: 'Dining & Etiquette',
      emoji: '🪙',
      myth: 'Gold leaf steaks and expensive hotel buffets are the only food available.',
      reality: 'Old Dubai (Deira & Karama) is a legendary street food paradise where you can get authentic Pakistani nihari, Iranian kebabs, or fresh shawarma for under $3-$5.',
      insiderTip: 'Cross the Dubai Creek on a traditional wooden Abra boat for just 1 AED (~$0.27) to visit the Spice and Gold Souks.',
      severity: 'fun'
    }
  ],
  'Tokyo': [
    {
      id: 'tyo-1',
      city: 'Tokyo',
      country: 'Japan',
      category: 'traditional',
      categoryLabel: 'Tipping & Etiquette',
      emoji: '💴',
      myth: 'Leaving a generous 15-20% cash tip at restaurants shows deep respect.',
      reality: 'Tipping does not exist in Japan and is considered confusing or even insulting. Excellent service is standard and built into the price.',
      insiderTip: 'If you leave cash on the table, waitstaff will sprint down the street after you to return the money you accidentally "forgot"!',
      severity: 'high'
    },
    {
      id: 'tyo-2',
      city: 'Tokyo',
      country: 'Japan',
      category: 'humans',
      categoryLabel: 'People & Interaction',
      emoji: '🤝',
      myth: 'Japanese people are cold and deliberately avoid talking to foreign visitors.',
      reality: 'Japanese culture is deeply rooted in "Omotenashi" (mindful hospitality). Locals may hesitate to speak simply out of modesty or shyness regarding their English skills.',
      insiderTip: 'Use a translation app and start with polite phrases like "Sumimasen" (Excuse me) or "Arigato gozaimasu" (Thank you)—doors will open instantly.',
      severity: 'fun'
    },
    {
      id: 'tyo-3',
      city: 'Tokyo',
      country: 'Japan',
      category: 'traditional',
      categoryLabel: 'Public Spaces',
      emoji: '🗑️',
      myth: 'Tokyo streets are spotless because trash cans are placed on every street corner.',
      reality: 'There are virtually NO public trash cans in Tokyo (removed after the 1995 subway incident). Citizens carry their rubbish home in their daypacks.',
      insiderTip: 'Always carry a small plastic bag in your bag to hold your trash until you return to your hotel or find a convenience store recycling bin.',
      severity: 'medium'
    },
    {
      id: 'tyo-4',
      city: 'Tokyo',
      country: 'Japan',
      category: 'food',
      categoryLabel: 'Dining on a Budget',
      emoji: '🍱',
      myth: 'Eating well in Tokyo requires a huge budget and reservations months ahead.',
      reality: 'Convenience stores (7-Eleven, Lawson, FamilyMart) and conveyor belt sushi joints offer Michelin-grade quality onigiri, egg sandwiches, and bento for under $4-$7.',
      insiderTip: 'Visit department store basement food halls ("depachika") after 19:30 for 30% to 50% discount stickers on gourmet bento boxes.',
      severity: 'fun'
    }
  ],
  'Rome': [
    {
      id: 'rom-1',
      city: 'Rome',
      country: 'Italy',
      category: 'food',
      categoryLabel: 'Culinary Traditions',
      emoji: '☕',
      myth: 'Ordering a cappuccino after a heavy pasta dinner is standard practice.',
      reality: 'Italians strictly drink milky coffee (cappuccino, latte) only before 11:00 AM. After lunch or dinner, they only order plain espresso ("un caffè") to aid digestion.',
      insiderTip: 'Never ask for grated parmesan cheese on seafood pasta—Italian chefs consider mixing dairy and fresh fish a cardinal culinary sin.',
      severity: 'medium'
    },
    {
      id: 'rom-2',
      city: 'Rome',
      country: 'Italy',
      category: 'monuments',
      categoryLabel: 'Ancient Monuments',
      emoji: '🏛️',
      myth: 'The Roman Colosseum was built entirely by chained amateur slaves.',
      reality: 'While Jewish captives provided heavy labor, the structure was engineered and erected by highly organized, paid Roman union guilds and master masonry engineers.',
      insiderTip: 'Fill your water bottle for free at any of Rome\'s 2,500+ ancient street fountains ("nasoni")—the mountain spring water is ice-cold and 100% potable.',
      severity: 'fun'
    },
    {
      id: 'rom-3',
      city: 'Rome',
      country: 'Italy',
      category: 'safety',
      categoryLabel: 'Tourist Traps',
      emoji: '🍝',
      myth: 'Any restaurant with laminated pictures of pasta outside is authentic traditional trattoria.',
      reality: 'Restaurants displaying photos of food, multilingual menus outside, or waiters begging you to enter are classic tourist traps serving frozen pre-made dishes.',
      insiderTip: 'Look for spots packed with local Italian elders, menus written in Italian that change daily, and tucked 2-3 alleys away from the main piazzas.',
      severity: 'high'
    }
  ],
  'Paris': [
    {
      id: 'par-1',
      city: 'Paris',
      country: 'France',
      category: 'humans',
      categoryLabel: 'Locals & Etiquette',
      emoji: '🥖',
      myth: 'Parisians are inherently rude and hostile to English-speaking travelers.',
      reality: 'Parisians adhere to a strict social code: walking into a store or asking for directions without saying "Bonjour Madame/Monsieur" is considered rude. If you greet first, service is lovely.',
      insiderTip: 'Always say "Bonjour" first before asking a question in English. It instantly transforms your interaction.',
      severity: 'high'
    },
    {
      id: 'par-2',
      city: 'Paris',
      country: 'France',
      category: 'food',
      categoryLabel: 'Water & Dining',
      emoji: '💧',
      myth: 'You must pay €8 for bottled mineral water at cafes because tap water isn\'t served.',
      reality: 'By French law, every restaurant must provide free, chilled municipal tap water upon request. Eau de Paris is among Europe\'s highest-quality drinking waters.',
      insiderTip: 'Confidently ask for "Une carafe d\'eau, s\'il vous plaît" (a carafe of tap water) and save your money for dessert.',
      severity: 'fun'
    },
    {
      id: 'par-3',
      city: 'Paris',
      country: 'France',
      category: 'monuments',
      categoryLabel: 'The Louvre',
      emoji: '🖼️',
      myth: 'You can easily see the Mona Lisa and tour the entire Louvre museum in one afternoon.',
      reality: 'The Louvre covers 73,000 square meters with over 35,000 artworks. Spending 30 seconds on each piece would take over 100 continuous days!',
      insiderTip: 'Enter via the Carrousel du Louvre underground entrance instead of the main glass pyramid line to skip 45-minute security queues.',
      severity: 'medium'
    }
  ],
  'Bangkok': [
    {
      id: 'bkk-1',
      city: 'Bangkok',
      country: 'Thailand',
      category: 'food',
      categoryLabel: 'Street Food Safety',
      emoji: '🍲',
      myth: 'Eating from street food carts will inevitably give you severe food poisoning.',
      reality: 'Street food vendors cook at scorching wok temperatures with ingredients bought fresh each morning from morning wet markets. Turnover is often much higher than hotel buffets.',
      insiderTip: 'Eat where local Thai office workers and school kids queue up. High turnaround means fresh, sizzling ingredients.',
      severity: 'medium'
    },
    {
      id: 'bkk-2',
      city: 'Bangkok',
      country: 'Thailand',
      category: 'safety',
      categoryLabel: 'Tuk-Tuk Scams',
      emoji: '🛺',
      myth: 'A friendly local outside a temple telling you "The Grand Palace is closed today for Buddha Day" is just being helpful.',
      reality: 'This is Bangkok\'s most infamous scam! The Palace is almost never closed. They will steer you into a 20-Baht tuk-tuk that detours to high-pressure gem and suit shops.',
      insiderTip: 'Ignore friendly strangers near temple gates and walk straight to the official ticket counter yourself.',
      severity: 'high'
    },
    {
      id: 'bkk-3',
      city: 'Bangkok',
      country: 'Thailand',
      category: 'traditional',
      categoryLabel: 'Sacred Customs',
      emoji: '🧘',
      myth: 'Touching a monk\'s shoulder or pointing your feet at a Buddha statue is harmless.',
      reality: 'In Thai Theravada Buddhism, feet are considered spiritually lowest and the head is the most sacred. Pointing feet at monks or Buddha statues is considered deeply offensive.',
      insiderTip: 'When sitting in temples, tuck your feet behind you or sit cross-legged with soles pointed away from the altar.',
      severity: 'high'
    }
  ],
  'London': [
    {
      id: 'lon-1',
      city: 'London',
      country: 'United Kingdom',
      category: 'traditional',
      categoryLabel: 'Tube Commuting Code',
      emoji: '🚇',
      myth: 'You can casually stand on either side of the London Underground escalator.',
      reality: 'Standing on the left side of a Tube escalator is a violation of London\'s sacred unwritten commuting code! The left is strictly for walking.',
      insiderTip: 'Always stand on the RIGHT, walk on the LEFT. Violating this will earn you immediate sharp sighs and "Excuse me, please!"',
      severity: 'high'
    },
    {
      id: 'lon-2',
      city: 'London',
      country: 'United Kingdom',
      category: 'food',
      categoryLabel: 'British Cuisine',
      emoji: '🥧',
      myth: 'British cuisine is bland, boiled, and among the worst in the world.',
      reality: 'London is today one of the world\'s premier culinary capitals, renowned for modern British gastronomy, Sunday roasts with Yorkshire puddings, and Borough Market artisans.',
      insiderTip: 'Visit Brick Lane or Tooting for world-class curries, or an authentic Victorian pub for a Sunday roast with beef and rich gravy.',
      severity: 'fun'
    },
    {
      id: 'lon-3',
      city: 'London',
      country: 'United Kingdom',
      category: 'monuments',
      categoryLabel: 'Big Ben & Landmarks',
      emoji: '🕰️',
      myth: 'The giant clock tower next to the British Parliament is officially named Big Ben.',
      reality: 'The tower is named Elizabeth Tower. "Big Ben" is solely the nickname of the 13.7-tonne Great Bell inside that rings the hour!',
      insiderTip: 'London\'s world-renowned museums (British Museum, Natural History Museum, Tate Modern) are 100% free of charge to enter.',
      severity: 'fun'
    }
  ],
  'Kozhikode': [
    {
      id: 'koz-1',
      city: 'Kozhikode',
      country: 'India (Malabar Coast)',
      category: 'humans',
      categoryLabel: 'Hospitality & Honesty',
      emoji: '🛺',
      myth: 'Auto-rickshaw drivers in Indian cities always overcharge tourists and refuse meters.',
      reality: 'Kozhikode auto drivers are legendary across India for strict honesty: they automatically turn on the digital meter, return forgotten items, and happily recommend the best local eateries.',
      insiderTip: 'Pay the exact metered fare; rounding up is welcomed, but drivers take genuine pride in transparent fares and will hand back exact change.',
      severity: 'fun'
    },
    {
      id: 'koz-2',
      city: 'Kozhikode',
      country: 'India (Malabar Coast)',
      category: 'food',
      categoryLabel: 'Malabar Biryani & Sulaimani',
      emoji: '🍚',
      myth: 'All Indian biryani is overwhelmingly fiery red and uses long basmati rice.',
      reality: 'Authentic Kozhikode/Thalassery Biryani is made with fragrant short-grain Khaima (Jeerakasala) rice, gentle spices, pure ghee, fried cashews, and raisins. It is celebrated for delicate aroma rather than chili heat.',
      insiderTip: 'Order authentic mutton or chicken biryani at Paragon or Rahmath, and conclude your feast with a piping-hot Sulaimani (black spiced tea with mint).',
      severity: 'fun'
    },
    {
      id: 'koz-3',
      city: 'Kozhikode',
      country: 'India (Malabar Coast)',
      category: 'traditional',
      categoryLabel: 'SM Street & Halwa Lore',
      emoji: '🍯',
      myth: 'SM Street (Sweetmeat Street) is just a standard shopping market.',
      reality: 'Mittayi Theruvu has been an active pedestrian trading alley since the Zamorin era, where sweetmakers cooked translucent black wheat halwa in coconut oil for Arab and European merchants for over 500 years.',
      insiderTip: 'Walk through Sankaran Bakery on SM Street for free tastings of authentic tender coconut and black halwa served on fresh banana leaves.',
      severity: 'fun'
    }
  ]
};

export const POPULAR_DESTINATIONS = [
  { name: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { name: 'Rome', country: 'Italy', flag: '🇮🇹' },
  { name: 'Paris', country: 'France', flag: '🇫🇷' },
  { name: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  { name: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Kozhikode', country: 'India (Malabar)', flag: '🇮🇳' }
];
