## About the Begena

The Begena (በገና) is a large 10-string box lyre sacred to the Ethiopian Orthodox Tewahedo tradition. Known as "David's Harp," it is used for prayer, meditation, and singing spiritual poetry (qiné). Its deep, resonant, buzzing tone comes from leather strips that vibrate against the wooden bridge. The instrument is played solo in quiet devotional settings — not for entertainment. Daily Begena is a practice coach app that helps players build consistent habits through short daily sessions: tune, drill finger patterns, and train the ear.

## Project: Daily Begena

### Structure
- Monorepo: main app lives in `apps/mobile/`
- Expo Router file-based routing: tabs in `app/(tabs)/`, session flow in `app/session/`
- Shared UI kit: `src/shared/ui/` (Card, Button, StringsView, theme)
- Path aliases: `@shared/*`, `@features/*`, `@/*` (defined in tsconfig)

### Design System
- Dark theme — all colors, spacing, radius, typography come from `src/shared/ui/theme.ts`
- Never hardcode colors/spacing — always use tokens: `colors.bg`, `spacing.xl`, `radius.xl`, `typography.body`
- Color palette: bg #121212, surface #1E1E1E, goldBright #E9C46A, goldMuted #D4A373, teal #2A4D69

### Code Conventions
- Always use `useSafeAreaInsets()` for screen padding — never hardcode insets
- Animations use `react-native-reanimated` (not Animated API)
- Gestures use `react-native-gesture-handler`
- Custom icons use `react-native-svg` (Svg + Path)
- Pin exact React version to match react-native renderer (no caret `^`)
- TypeScript strict mode — run `npx tsc --noEmit` to verify

### Important Rules
- Do NOT change screens/components unless explicitly asked — changing the dashboard when asked to update session flow is not acceptable
- Keep existing designs intact — only modify what is specifically requested
- When adding a dependency on WSL, add to package.json manually — npm install has permission issues, user runs it from Windows terminal
- Session screens are immersive (headerShown: false, no tab bar)
- Tab bar uses `position: 'absolute'` with safe area bottom inset
- Tab screen content needs `paddingBottom: insets.bottom + 96` to clear floating tab bar
