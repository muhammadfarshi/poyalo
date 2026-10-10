# API.md — POYALO External & Internal API Contracts

> **Protocol Standards:** REST over HTTPS, Supabase Realtime over WebSockets, JSON Payloads  
> **Client Identifier Header:** `x-device-id: <uuid>`  

---

## 1. Endpoints & Channels Overview

| Channel / Endpoint | Protocol | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST /api/parse-plan` | HTTPS | Extracts structured stops from messy text using Gemini | None |
| `POST /api/reality-check` | HTTPS | Validates itinerary & flags errors | None |
| `GET /api/comic/:placeId` | HTTPS | Fetches multi-panel comic story for place, era & tone | None |
| `GET /api/game/districts/:slug`| HTTPS | Fetches 3D district metadata and collectible coordinates | None |
| `POST /api/game/scores` | HTTPS | Submits player score & updates district leaderboard | None |
| `game:district-dubai` | WebSocket | Real-time player presence, avatar movement & proximity emotes | None |
| `POST /api/provider-request`| HTTPS | Submits booking request to a guide/photographer | None |

---

## 2. 3D Game & Comic Endpoint Specifications

### 2.1 GET `/api/comic/:placeId`
Fetches pre-generated comic panels with speech bubbles, character dialogs, narrative captions, and sound decals.

#### Request
```http
GET /api/comic/fort-kochi-dutch-palace?era=colonial&tone=roast HTTP/1.1
```

#### Response (200 OK)
```json
{
  "placeId": "fort-kochi-dutch-palace",
  "era": "colonial",
  "tone": "roast",
  "title": "The Palace That Wasn't Dutch",
  "panels": [
    {
      "panelNumber": 1,
      "narrativeCaption": "1555: THE PORTUGUESE NEED TO APOLOGIZE...",
      "illustrationUrl": "/comics/palace-panel-1.webp",
      "speechBubbles": [
        {
          "speaker": "Portuguese Commander",
          "text": "We plundered the temple... so we built the Raja this palace as an apology gift!",
          "type": "speech",
          "pointerDirection": "bottom-left"
        }
      ],
      "soundEffect": {
        "text": "BRIBE!",
        "color": "#FF5722",
        "rotationDeg": -8
      }
    },
    {
      "panelNumber": 2,
      "narrativeCaption": "1663: THE DUTCH ARRIVE...",
      "illustrationUrl": "/comics/palace-panel-2.webp",
      "speechBubbles": [
        {
          "speaker": "Dutch Trader",
          "text": "We merely renovated the roof, yet tourists will call it the DUTCH Palace forever. Stonks!",
          "type": "speech",
          "pointerDirection": "bottom-right"
        }
      ]
    }
  ],
  "sources": ["Archaeological Survey of India Records", "Kerala State Archives"]
}
```

---

### 2.2 GET `/api/game/districts/:slug`
Fetches collectible item coordinates and 3D scene parameters for the specified UAE district.

#### Request
```http
GET /api/game/districts/old-dubai HTTP/1.1
```

#### Response (200 OK)
```json
{
  "slug": "old-dubai",
  "name": "Old Dubai & Al Fahidi Creek",
  "gltfModelUrl": "/models/al-fahidi-lowpoly.glb",
  "ambientAudioUrl": "/audio/creek-ambience.mp3",
  "spawnPoint": { "x": 0.0, "y": 0.0, "z": 0.0 },
  "collectibles": [
    {
      "id": "c1",
      "itemType": "pearl",
      "points": 100,
      "x": 12.4,
      "y": 0.5,
      "z": -8.2,
      "culturalFact": "Natural pearls were harvested from the warm shallow waters of the Arabian Gulf for over 7,000 years."
    },
    {
      "id": "c2",
      "itemType": "dallah",
      "points": 75,
      "x": -6.1,
      "y": 0.5,
      "z": 14.8,
      "culturalFact": "The traditional Dallah coffee pot is engraved on the UAE 1 Dirham coin as a symbol of hospitality."
    }
  ]
}
```

---

### 2.3 Supabase Realtime WebSocket Protocol (`game:district-dubai`)

#### Event: `presence:sync`
Fires when players connect/disconnect to keep the active player count and avatar list updated:
```json
{
  "event": "presence_state",
  "state": {
    "usr_48a": [{ "displayName": "Rohan", "avatarColor": "#1B3FFF", "x": 12.4, "z": -8.2 }],
    "usr_91b": [{ "displayName": "Priya", "avatarColor": "#FF5722", "x": 15.1, "z": -9.0 }]
  }
}
```

#### Event: `broadcast:move`
Broadcasts live player coordinate deltas at 10 Hz when moving:
```json
{
  "type": "broadcast",
  "event": "player_move",
  "payload": {
    "playerId": "usr_48a",
    "x": 12.8,
    "y": 0.0,
    "z": -8.5,
    "rotationY": 1.45
  }
}
```

#### Event: `broadcast:emote`
Broadcasts proximity greetings to nearby players within 5 meters:
```json
{
  "type": "broadcast",
  "event": "player_emote",
  "payload": {
    "senderId": "usr_48a",
    "senderName": "Rohan",
    "emote": "Marhaba! 👋",
    "x": 12.8,
    "y": 1.8,
    "z": -8.5
  }
}
```
