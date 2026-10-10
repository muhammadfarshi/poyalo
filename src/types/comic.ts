export type ComicTone = 'professor' | 'storyteller' | 'roast' | 'kid';

export type EraLayer = '1800s' | '1950s' | 'modern';

export interface ComicSpeechBubble {
  speaker: string;
  avatarEmoji?: string;
  text: string;
  type: 'speech' | 'thought' | 'shout';
  pointerDirection: 'bottom-left' | 'bottom-right' | 'top';
}

export interface ComicSoundEffect {
  text: string;
  color: string;
  rotationDeg: number;
}

export interface ComicPanel {
  panelNumber: number;
  narrativeCaption?: string;
  panelScene: string; // Theme description
  illustrationEmoji: string;
  illustrationBgColor: string;
  speechBubbles: ComicSpeechBubble[];
  soundEffect?: ComicSoundEffect;
}

export interface ComicStory {
  id: string;
  placeId: string;
  placeName: string;
  cityName: string;
  eraLayer: EraLayer;
  tone: ComicTone;
  title: string;
  tagline: string;
  panels: ComicPanel[];
  sources: string[];
}
