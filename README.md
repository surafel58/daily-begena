# Daily Begena

A mobile practice coach for the Ethiopian Begena (ten-string lyre). Built with React Native (Expo) and TypeScript.

## Milestone 1 Scope

One daily practice session with three sections:

1. **Quick Tune** - Tune today's 2-3 strings using reference tones and stability checks
2. **Finger Drill** - Pattern drill with tempo ramp, metronome count-in, and post-recording analysis
3. **Ear Check** - Identify a string by sound (1 minute)

No login. No cloud sync. Offline first.

## Tech Stack

- **App**: React Native with Expo prebuild, TypeScript
- **Navigation**: Expo Router (file-based)
- **Database**: expo-sqlite (offline-first)
- **Audio**: expo-av (recording & playback)
- **Build**: EAS Build (free tier), Android internal testing track

## Project Structure

```
apps/mobile/                  # Expo React Native app
├── app/                      # Expo Router file-based routes
│   ├── (tabs)/               # Tab navigation
│   │   ├── index.tsx         # Practice home
│   │   ├── progress.tsx      # Progress history
│   │   └── settings.tsx      # Settings
│   └── session/
│       ├── drill.tsx         # Finger drill screen
│       └── results.tsx       # Results screen
├── src/
│   ├── features/             # Feature modules
│   │   ├── session/
│   │   ├── tuning/
│   │   ├── drills/
│   │   ├── recording/
│   │   ├── results/
│   │   ├── progress/
│   │   └── settings/
│   └── shared/
│       ├── db/               # SQLite schema & database init
│       ├── ui/               # Shared UI components
│       └── native-bridge/    # Native module bridges
packages/
├── dsp-core/c_cpp/           # C/C++ signal processing
│   ├── onset/                # Onset detection
│   ├── features/             # Feature extraction
│   ├── mfcc/                 # MFCC computation
│   ├── matching/             # String matching
│   └── utils/
└── native/                   # Platform-specific native code
    ├── ios/
    └── android/
```

## Data Model

| Table | Purpose |
|-------|---------|
| `drills` | Drill definitions (pattern, tempo ramp, strings used) |
| `attempts` | Practice attempt results (timing score, string score, confidence) |
| `string_signatures` | Saved string feature blobs per device |
| `attempt_steps` | Per-step debug data (expected vs detected string, timing error) |
| `settings` | User preferences (preset, numbering scheme) |

## Getting Started

### Prerequisites

- Node.js 20+
- Android phone with [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) installed

### Run

```powershell
cd apps\mobile
npm install
npx expo start
```

Scan the QR code with your phone (must be on the same Wi-Fi network).

### Development Build (for native modules)

```powershell
npm install -g eas-cli
eas login
cd apps\mobile
eas build --profile development --platform android
```

Install the resulting APK on your phone, then:

```powershell
npx expo start --dev-client
```

## Validation Pipeline (Milestone 1)

**Input**: Mono PCM, 16 kHz preferred

**Timing**: Onset detection -> pluck timestamps -> compare to metronome beat grid

**String Accuracy**: Feature extraction per onset window -> compare to today's saved signatures (2-3 candidates)

**Confidence Gating**:
- **High**: Show wrong-string steps
- **Medium**: Show "string unclear, slow down" + suggest re-tune
- **Low**: Hide string accuracy, show timing only

## License

See [LICENSE](LICENSE) for details.
