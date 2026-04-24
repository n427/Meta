# Meta Glasses Voice UI Prototype

A single-page HUD prototype for Meta smart glasses. Uses the Web Speech API for wake-word detection and ElevenLabs for voice responses.

---

## Quick Start

### 1. Serve locally (mic requires HTTPS or localhost)

**Option A — VS Code Live Server**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

**Option B — Python**
```bash
cd meta-glasses
python3 -m http.server 8080
# open http://localhost:8080
```

**Option C — npx**
```bash
npx serve meta-glasses
```

### 2. Add your ElevenLabs key

**In-browser (recommended for prototyping)**
1. Click the ⚙ gear icon (top-right of the phone)
2. Paste your API key from [elevenlabs.io](https://elevenlabs.io)
3. Optionally change the Voice ID (defaults to Rachel)
4. Click **Save to Browser** — stored in `localStorage`

**Or edit `config.js` directly**
```js
const ELEVENLABS_API_KEY = "sk-your-key-here";
const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel
```

---

## Usage

| Method | How |
|---|---|
| **Voice** | Click the mic button, say *"Hey Meta, heart rate"* |
| **Quick test** | Tap any of the 4 test buttons (no mic needed) |
| **Chips** | Tap the command chips in the idle card |

### Supported commands
| Phrase | Shows |
|---|---|
| "Hey Meta, heart rate" | 72 BPM |
| "Hey Meta, steps" | 8,432 steps |
| "Hey Meta, what time" | Current time |
| "Hey Meta, calories" | 1,840 cal burned |

---

## Swapping in your Figma animations

The `animations/` folder contains placeholder Lottie JSONs. Replace them with your real exports:

1. In Figma, install the **[LottieFiles](https://www.figma.com/community/plugin/809860933081065308/LottieFiles)** plugin
2. Select your animation frame → Plugins → LottieFiles → **Export**
3. Save the exported `.json` over the matching placeholder:

```
animations/heartrate.json   ← heart rate animation
animations/steps.json       ← steps / walking animation
animations/time.json        ← clock / time animation
animations/calories.json    ← flame / calories animation
```

No code changes needed — the app loads them by filename.

---

## File structure

```
meta-glasses/
├── index.html          ← everything: UI, styles, JS logic
├── config.js           ← API key + voice ID (swap here or in settings)
├── animations/
│   ├── heartrate.json
│   ├── steps.json
│   ├── time.json
│   └── calories.json
└── README.md
```

---

## Browser support

| Feature | Chrome | Safari | Firefox |
|---|---|---|---|
| Web Speech API | ✅ | ✅ (iOS 14.5+) | ❌ |
| ElevenLabs TTS | ✅ | ✅ | ✅ |
| Lottie player | ✅ | ✅ | ✅ |

Chrome is recommended for the best voice recognition experience.

---

## Troubleshooting

**Mic not working** — Browser must be served from `localhost` or `https://`. File:// URLs won't work.

**"Command not recognized"** — Speak clearly; say the wake phrase first: *"Hey Meta, [command]"*

**No voice response** — Check your ElevenLabs key in Settings. The browser console will show the error.

**CORS error on ElevenLabs** — ElevenLabs allows browser requests from localhost. If you're on a different origin, you may need a small proxy.
