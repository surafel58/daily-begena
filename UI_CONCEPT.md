# Daily Begena — UI Concept Document

## Design Philosophy

The app feels like entering a **quiet, dimly lit practice room**. Every surface is dark, every accent is warm. The instrument is sacred — the interface respects that with restraint, stillness, and intentional use of light. Nothing competes for attention. The gold tones echo the Begena's aged wood and taut strings. The teal provides calm counterbalance — like moonlight on water.

This is a **tool for mastery**, not a game. No badges, no gamification clutter. Just a flame that grows with discipline.

---

## Global Design Language

### Color Palette

| Name | Hex | Role |
|------|-----|------|
| Deep Charcoal | `#121212` | App background. Every screen starts here. Smooth, matte, zero texture unless stated. |
| Dark Surface | `#1E1E1E` | Card backgrounds, bottom navigation bar. Slightly lifted from the void. |
| Elevated Surface | `#2A2A2A` | Borders, dividers, subtle elevation cues. |
| Bright Gold | `#E9C46A` | Streak flame, active tab icon, week dots, score numbers. The "reward" color — used sparingly. |
| Muted Gold | `#D4A373` | Card titles, CTA button fill, string glow, section headings. Warm, not flashy. |
| Soft Teal | `#2A4D69` | Secondary buttons (Tuner circle), metronome pulse, step number badges, listen button. Cool, meditative. |
| Light Teal | `#3A6D89` | Hover/active state for teal elements. |
| Off-White | `#E0E0E0` | Primary body text. Readable without glaring. |
| Light Grey | `#A0A0A0` | Secondary text, subtitles, captions, hints. Recedes into background. |
| Bright Green | `#4ADE80` | Success: in-tune confirmation, correct ear check answer, tuned string checkmarks. |
| Warm Red | `#E76F51` | Error: missed beat vignette, wrong string flash, tuner orb when off-pitch. Not aggressive — warm terracotta, not alarm red. |
| Amber | `#FBBF24` | Warning: medium confidence band indicator. |
| String Grey | `#333333` | Inactive/background string lines. Barely visible — just enough to know they exist. |

### Typography

- **Hero numbers** (countdown, string display): 80–120px, bold, white (`#E0E0E0`)
- **Titles**: 24px, bold, muted gold (`#D4A373`)
- **Subtitles/Section headings**: 18px, medium weight, off-white
- **Body text**: 16px, regular, off-white or light grey depending on importance
- **Captions**: 14px, regular, light grey (`#A0A0A0`)
- **Small labels**: 12px, regular, light grey

No serif fonts. System sans-serif throughout. The instrument is traditional — the interface is modern.

### Shapes & Spacing

- **Card corner radius**: 24px. Generous, soft, approachable.
- **Button corner radius**: Full pill shape (9999px radius). Buttons float, they don't box.
- **Spacing scale**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48px. Generous whitespace everywhere — screens should breathe.
- **Card border**: 1px `#2A2A2A`. Barely there. Just enough to separate card from void.
- **Shadows**: Only on primary CTA buttons. A soft golden glow (`#D4A373`, opacity 0.3, radius 12px, offset 4px down). Everything else is flat.

### Animations

Every animation serves a purpose. Nothing decorative.

| Animation | Trigger | Behavior |
|-----------|---------|----------|
| Card press | User touches a card | Scale to 0.97 with spring damping. Snaps back on release. Feels physical. |
| String vibration | User plucks during tuning | String width oscillates left-right rapidly (6 cycles), then settles. Like a real plucked string. |
| Tuner orb movement | Pitch detection feedback | Smooth vertical interpolation. Orb slides up/down the string as pitch changes. Color crossfades between red and green. |
| Metronome pulse | Each beat during drill | Large teal circle behind the string number expands (breathe in) and contracts (breathe out). Smooth sinusoidal easing. Hypnotic. |
| Count-in numbers | Before drill starts | Large "3", "2", "1" appear center screen. Each springs from 50% scale to 100% with damping. Fades out after 1 second. |
| Hit feedback | Correct strike during drill | String number text briefly gains a gold text shadow (glow radius 20px). Subtle outward ripple from center. |
| Miss feedback | Missed beat during drill | Screen edges flash with warm red border (40px inset vignette). Fades in 100ms, out 400ms. Corrective, not punishing. |
| Streak increment | Session complete | Flame emoji appears. Streak number scales up to 1.4x, then springs back to 1x. Spark-like feeling. |
| Phase transitions | Between tune/drill/ear check | Crossfade. Old screen fades out, new fades in. No sliding — the immersive space doesn't "move", it transforms. |
| Staggered entrance | Results screen loads | Elements appear one by one: header (200ms delay), score card (500ms), streak (1000ms), buttons (1500ms). Each slides up slightly and fades in. |

---

## Screen 1: Dashboard (Home Tab)

**Purpose**: The command center. One glance tells you everything. One tap starts your session.

**Background**: Deep charcoal `#121212`, full screen, no texture.

### Top Status Bar

- Horizontally laid out, edge to edge with 20px side padding.
- **Left side**: Time-aware greeting text.
  - "Good Morning" / "Good Afternoon" / "Good Evening"
  - Color: Off-white `#E0E0E0`
  - Size: 18px, medium weight
- **Right side**: Streak indicator.
  - Flame emoji (🔥) rendered at 20px
  - Followed by "5 Days" text in bright gold `#E9C46A`, bold, 16px
  - Flame and text sit in a horizontal row with 4px gap

### Center Stage: Hero Card

Vertically centered in the remaining space between top bar and bottom area. This card dominates the screen.

- **Card background**: Dark surface `#1E1E1E`
- **Corner radius**: 24px
- **Border**: 1px `#2A2A2A`
- **Padding**: 40px vertical, 32px horizontal. Generous interior breathing room.
- **Content layout** (vertical, top-aligned inside card):
  - **Title**: "Today's Drill"
    - Muted gold `#D4A373`, 24px, bold
    - 8px bottom margin
  - **Subtitle**: "Strings 1 & 3 · 10 Minutes"
    - Light grey `#A0A0A0`, 16px, regular
    - 32px bottom margin (big gap before button)
  - **CTA Button**: "Start Practice"
    - Full-width pill shape
    - Fill: Muted gold `#D4A373`
    - Text: Deep charcoal `#121212`, 16px, bold. Dark on gold for maximum contrast.
    - Shadow: Soft golden glow. Color `#D4A373`, opacity 0.3, blur 12px, offset 4px down. The button subtly floats.
    - On press: scales to 0.96, springs back.

### Alternate State: Session Completed

When today's session is already done, the hero card transforms:

- Title becomes "Session Complete"
- Subtitle becomes "Great work today!"
- Button disappears
- Two score stats appear side by side:
  - Left: "85%" in bright gold, 24px bold. Caption "Accuracy" below in light grey.
  - Right: "92%" in bright gold, 24px bold. Caption "Timing" below in light grey.
  - Vertical 1px divider `#2A2A2A` between them, 48px tall.

### Bottom Area: Tuner Shortcut

Centered horizontally, sitting above the tab bar with 32px bottom padding.

- **Shape**: Circle, 72px diameter
- **Background**: Soft teal `#2A4D69`
- **Content**: Music note emoji (🎵) at 24px, with "Tuner" label below in off-white `#E0E0E0`, 12px
- **No shadow**. Understated — it's a secondary action.
- On tap: navigates to the Tuning screen (standalone mode).

### Navigation Bar

Fixed at screen bottom.

- **Background**: Dark surface `#1E1E1E`
- **Top border**: 1px `#2A2A2A`
- **Height**: 64px
- **3 tabs** evenly spaced:
  - **Home** — ⌂ icon, label "Home". When active: bright gold `#E9C46A`. When inactive: light grey `#A0A0A0`.
  - **Drills** — ♪ icon, label "Drills". Same active/inactive colors.
  - **Profile** — ◉ icon, label "Profile". Same active/inactive colors.
- Tab labels: 11px, semibold.
- Icon size: 22px.

---

## Screen 2: Drills Tab

**Purpose**: See your practice history at a glance. Track consistency.

**Background**: Deep charcoal `#121212`. Scrollable vertically.

### Streak Banner Card

Top of screen, first element.

- Card style: dark surface `#1E1E1E`, 24px radius, 24px padding.
- **Layout**: Two stats side by side, divided by a vertical 1px line `#2A2A2A` (48px tall).
  - **Left**: Large "5" in bright gold `#E9C46A`, 36px bold. Caption "Current Streak" in light grey `#A0A0A0`, 14px. Centered.
  - **Right**: Large "12" in bright gold, 36px bold. Caption "Best Streak" in light grey, 14px. Centered.

### Week View

Below streak card, with "This Week" section title in off-white, 18px, semibold.

- **Container**: Dark surface `#1E1E1E` rounded rectangle (16px radius), 20px vertical padding, 16px horizontal padding.
- **7 columns** evenly spaced horizontally, each containing:
  - **Dot**: 28px diameter circle.
    - Practiced day: filled bright gold `#E9C46A`.
    - Missed day: filled elevated surface `#2A2A2A` with 1px border `#333333`. Hollow feeling.
  - **Day label**: Below the dot, 8px gap. "M", "T", "W", etc. Light grey `#A0A0A0`, 12px.

### Past Sessions List

Section title "Recent Sessions" in off-white, 18px, semibold. 16px gap before first card.

Each session is a card:

- Dark surface `#1E1E1E`, 24px radius, 24px padding, 12px bottom margin between cards.
- **Layout**: Horizontal row, space-between.
  - **Left side**:
    - Date: "Feb 14" in off-white, 16px, semibold.
    - Strings used: "Strings 1 & 3" in light grey, 14px. 4px top margin.
  - **Right side**: Horizontal row, 8px gap.
    - Score: "85%" in bright gold, 18px, bold.
    - Confidence dot: 10px circle. High = green `#4ADE80`. Medium = amber `#FBBF24`. Low = warm red `#E76F51`.

---

## Screen 3: Profile Tab

**Purpose**: Settings and information. Minimal for v1.

**Background**: Deep charcoal `#121212`. Scrollable.

### Title

"Profile" in off-white, 24px, bold. 24px bottom margin.

### Level Preset Card

- Dark surface card, 24px radius.
- **Section title**: "Level Preset" in muted gold `#D4A373`, 16px, semibold. 12px bottom margin.
- **Content**: Horizontal row with 16px gap.
  - **Badge**: 48px circle, filled soft teal `#2A4D69`. Number "1" inside in off-white, 24px bold.
  - **Info** (vertical):
    - Name: "Beginner" in off-white, 16px, semibold.
    - Description: "2-3 strings · Basic patterns · Slow tempo" in light grey, 14px. 4px top margin.
- **Footer note**: "More levels coming in future updates" in light grey, 12px, italic. 12px top margin.

### String Numbering Card

- Dark surface card, 24px radius.
- **Layout**: Horizontal row, space-between.
  - **Left**:
    - Title: "Alternate Numbering" in muted gold, 16px, semibold.
    - Description: "Use traditional naming instead of numbers" in light grey, 14px, 4px top margin. Max width ~220px so it doesn't crowd the toggle.
  - **Right**: iOS-style toggle switch.
    - Track off: elevated surface `#2A2A2A`. Track on: muted gold `#D4A373`.
    - Thumb off: light grey. Thumb on: bright gold.

### About Card

- Dark surface card, 24px radius.
- **Section title**: "About" in muted gold, 16px, semibold.
- **Body text**: Paragraph about the Begena (በገና). Light grey `#A0A0A0`, 16px, 24px line height. Readable, not cramped.
  > "The Begena (በገና) is a sacred Ethiopian Orthodox ten-string box lyre, traditionally associated with King David's harp. Its deep, buzzing tones are used for meditation, prayer, and spiritual reflection."
- **Version row**: Below the text, separated by 1px top border `#2A2A2A`, 12px top padding.
  - Left: "Version" in light grey, 14px.
  - Right: "1.0.0" in off-white, 14px.

---

## Screen 4: Session Overview

**Purpose**: Brief pause before entering practice mode. Shows the user what's coming. A moment of intention.

**Background**: Deep charcoal `#121212`. No tab bar visible (but not yet fully immersive — still has back navigation).

### Header

- Top area, 32px top padding (below safe area).
- **Title**: "Today's Session" in off-white, 24px, bold.
- **Subtitle**: "3 steps · Strings 1 & 3" in light grey, 16px. 4px top margin.
- 32px bottom margin.

### 3-Step Cards

Vertically centered in the available space. Three cards connected by thin vertical lines.

**Each step card**:
- Dark surface `#1E1E1E`, 24px radius, 20px vertical padding, 20px horizontal padding.
- **Layout**: Horizontal row with 16px gaps.
  - **Step badge**: 40px circle, soft teal `#2A4D69`. Number (1, 2, 3) inside in off-white, 16px bold.
  - **Content** (flex, vertical):
    - Title: "Quick Tune" / "Finger Drill" / "Ear Check" in off-white, 16px, semibold.
    - Description: One line in light grey, 14px. 4px top margin.
      - "Tune today's strings with reference tones"
      - "Pattern practice with tempo ramp"
      - "Identify strings by sound"
  - **Icon**: Right-aligned emoji (🎵 / 🎯 / 👂) at 24px.

**Connector between cards**:
- 24px tall vertical space.
- Centered 2px wide line, color `#2A2A2A`. Connects the cards visually into a flow.

### Footer

Fixed at bottom, 40px bottom padding, 12px gap between buttons.

- **"Begin" button**: Full-width, primary style. Muted gold fill, dark text, pill shape, golden glow shadow. This is the commit button.
- **"Back" button**: Full-width, outline style. 1.5px border muted gold, muted gold text, transparent fill. Low emphasis — an escape hatch.

---

## Screen 5: Tuning Phase — "The Ritual"

**Purpose**: Tune today's 2-3 strings. This is the first immersive screen — all navigation chrome disappears. Just you and the strings.

**Background**: Deep charcoal `#121212`. Full screen edge to edge. No header, no tab bar, no status bar styling.

### Progress Indicator

Top center, 60px from screen top.

- "String 1 of 3" in light grey `#A0A0A0`, 14px. Unobtrusive.

### The 10 Strings

10 vertical lines span the **full height** of the screen, evenly distributed horizontally across the screen width.

- **Inactive strings** (not in today's set): 1.5px wide, string grey `#333333`. Nearly invisible. Ghost-like.
- **Target strings** (today's 2-3): 3px wide, muted gold `#D4A373`. They glow — a soft gold shadow (opacity 0.6, radius 8px) hugs the line. These are the ones that matter.
- **Current string** (the one being tuned): Same as target but with stronger glow (opacity 0.8, radius 10px). Pulsing slightly to draw attention.
- **Tuned strings** (already completed): 3px wide, bright green `#4ADE80`. Checkmark badge overlaid at 30% from top.

**Touch targets**: 40px wide invisible zones centered on each string. Only the current string responds to taps.

### Tuner Orb

A 20px diameter circle that lives on the current string, centered vertically by default.

**States**:
- **Waiting** (no input yet): Orb invisible (opacity 0). Text overlay reads "Pluck String 1" in light grey, center screen.
- **Listening**: Orb fades in (opacity 0 → 1 over 300ms). Hint text "Tap the string to simulate" below in light grey, 14px.
- **Too Low**: Orb is warm red `#E76F51`. Position slides **below** center (translateY +40px). Smooth spring interpolation.
- **Close**: Orb is amber `#FBBF24`. Position near center (translateY +8px).
- **Too High**: Orb is warm red. Position slides **above** center (translateY -40px).
- **In Tune**: Orb snaps to exact center (translateY 0), turns bright green `#4ADE80`. Scales up to 1.3x then springs back to 1x. The string itself flashes gold once (150ms fade in, 400ms fade out). Checkmark appears.

### Status Text

Below the strings area, centered, 32px padding.

- Large status message matching current state:
  - "Pluck String 1" — light grey
  - "Listening..." — off-white
  - "Too Low — Tighten" — warm red
  - "Almost there..." — amber
  - "Too High — Loosen" — warm red
  - "In Tune!" — bright green
- 24px, bold.

### Footer

Two text buttons at bottom, left and right, 40px bottom padding.

- **"Back"**: Light grey text, 16px. Returns to session overview.
- **"Skip Tuning"**: Light grey text, 16px. Jumps to drill phase.

---

## Screen 6: Finger Drill Phase — "The Flow"

**Purpose**: The core of the practice. Total focus. The screen strips away everything except the beat and the string number. Meditative.

**Background**: Pure deep charcoal `#121212`. No texture, no cards, no decoration. Void.

### Progress Bar

Pinned to the **very top** of the screen, edge to edge.

- **Track**: Full width, 3px tall, elevated surface `#2A2A2A`.
- **Fill**: Muted gold `#D4A373`. Animates from 0% to 100% over the drill duration using linear easing. A relentless, calm timer.

### Count-In Overlay

Appears before the drill starts. Covers the entire screen.

- **Large numbers**: "3", "2", "1" appear one at a time, center screen.
  - Size: 120px, bold, off-white.
  - Each number springs from 50% scale to 100% with bounce damping.
  - After 1 second, fades out and next number appears.
- After "1" finishes: overlay disappears. Drill begins.

### Central Display

Vertically and horizontally centered.

- **Tempo label**: Small, above the main display. "{BPM} BPM" in light grey, 14px. 40px bottom margin. Unobtrusive context.
- **Metronome pulse circle**: 200px diameter circle. Centered behind the string number.
  - Color: Soft teal `#2A4D69`, opacity 0.3. Translucent, not solid.
  - Animation: Expands (scale 1 → 1.15) and contracts (1.15 → 1) in sync with the beat. Sinusoidal easing — breathe in, breathe out. Hypnotic rhythm.
- **String number**: The expected string (e.g., "1" or "3"). Overlaid on top of the pulse circle.
  - Size: 80px, bold, off-white.
  - On **perfect hit**: gains gold text shadow (glow radius 20px, color bright gold `#E9C46A`). Fades in 100ms, out 300ms. Brief golden flash.
  - Number changes as the drill pattern progresses through strings.

### Recording Indicator

Below the central display, 40px top margin. Horizontal row, centered.

- **Red dot**: 8px circle, warm red `#E76F51`. Steady (not blinking — this isn't a generic recorder).
- **Timer**: "0:15" in light grey, 16px, tabular number font variant. 8px left of dot.

### Miss Feedback

On a missed beat: the **screen edges** flash.

- A 40px wide border around the entire screen fills with warm red `#E76F51`.
- Fades in 100ms, fades out 400ms.
- Creates a vignette/tunnel vision effect. Corrective nudge — not a punishment.

### Controls

Bottom center, 48px from screen bottom.

- **Pause/Play button**: 56px circle. Dark surface `#1E1E1E` fill, 1px border `#2A2A2A`.
  - Playing state: "❚❚" pause icon in off-white, 18px.
  - Paused state: "▶" play icon in off-white, 18px.

### Completion

When the timer runs out:

- Pulse animation stops.
- "Complete!" text appears in bright green `#4ADE80`, 24px bold, center screen.
- 1-second pause, then auto-transition (crossfade) to Ear Check.

---

## Screen 7: Ear Check Phase — "The Cooldown"

**Purpose**: Wind down the session with a quick listening exercise. Calm, exploratory. Lower stakes than the drill.

**Background**: Deep charcoal `#121212`. Full screen immersive.

### Header Area

Top of screen, 60px from top. Horizontal row, space-between.

- **Left**: "Round 1 of 3" in light grey, 14px.
- **Right**: "2/3 correct" in bright gold `#E9C46A`, 14px. Running score.

### Instruction Area

Centered vertically in the upper portion of the screen, 32px vertical padding. Min height ~120px.

**States**:

- **Before play**:
  - **Listen button**: 80px diameter circle. Soft teal `#2A4D69` fill. Soft teal shadow (opacity 0.4, blur 12px, offset 4px down). Floating.
  - "▶" icon at 24px, off-white, centered inside.
  - "Listen" label below icon in off-white, 12px.
  - Below the button: "Which string was that?" in light grey, 16px.

- **Playing**: "Playing..." text in light teal `#3A6D89`, 18px. Replaces the listen button area.

- **Correct answer**: "Correct!" in bright green `#4ADE80`, 24px, bold. Centered.

- **Wrong answer**: Two lines, centered.
  - "Not quite" in warm red `#E76F51`, 24px, bold.
  - "It was String 3" in light grey, 16px. 8px below.

### The 10 Strings

Same visual as the tuning screen but **all strings are equal** — thin (1.5px), string grey `#333333`. No favorites. The user must listen, not look.

**String number labels**: At the bottom of each string (20px from string bottom).
- 28px circle, dark surface fill, 1px elevated surface border.
- Number inside: 12px, bold. Default color: light grey.

**On tap** (when a string is selected):

- **Correct string**: Lights up bright gold `#E9C46A`. Width increases to 4px. Gold shadow glow (opacity 0.8, radius 10px). A 28px green circle with white "✓" appears at 40% from top of the string.
- **Tapped wrong string**: Flashes warm red `#E76F51` briefly (width 3px, red glow). Then the correct string lights up gold to teach the user.
- **All other strings**: Stay grey. Unaffected.

Feedback persists for 2 seconds, then the next round begins (strings reset to grey).

### Footer

Bottom center, 40px from bottom.

- "Skip" text in light grey, 16px. Advances to results.

---

## Screen 8: Summary — "The Reflection"

**Purpose**: A moment of accomplishment and peace. Celebrate the discipline. Everything enters the screen gracefully — nothing is already there when you arrive.

**Background**: Deep charcoal `#121212`. Vertically centered content. No scrolling needed.

### Staggered Entrance

Everything animates in with delays:

1. **200ms** — Header appears
2. **500ms** — Score card appears
3. **1000ms** — Streak flame appears
4. **1500ms** — Action buttons appear

Each element slides up 20–30px from below and fades from 0 to 1 opacity. Spring physics with damping 15.

### Header

- "Session Complete" in off-white, 32px, bold, 0.5 letter spacing.
- Centered. Elegant, not shouting.
- 32px bottom margin.

### Score Card

- Dark surface `#1E1E1E`, 24px radius, 24px padding.
- **Top section**: Two stats side by side.
  - Left: Accuracy "85%" in bright gold, 36px bold. Caption "Accuracy" in light grey, 14px.
  - Right: Timing "92%" in bright gold, 36px bold. Caption "Timing" in light grey, 14px.
  - Vertical 1px divider `#2A2A2A` between them, 48px tall.
- **Bottom section**: Separated by 1px top border `#2A2A2A`, 16px top padding, 20px top margin.
  - Centered text: "Great Rhythm!" in off-white, 16px. An encouraging consistency message.
- 32px bottom margin.

### Streak Animation

Centered block. The emotional peak of the screen.

- **Flame**: 🔥 emoji at 48px. 8px bottom margin.
- **Number**: The new streak count (e.g., "6") in bright gold, 48px, bold.
  - Animation: scales from 1x to 1.4x (200ms, ease-out), then springs back to 1x with bounce. Feels like the number is "landing" with impact.
- **Label**: "Day Streak" in light grey, 16px. 4px below the number.
- 40px bottom margin.

### Action Buttons

Two full-width buttons stacked vertically, 12px gap.

- **"Retry Drill"**: Outline style. 1.5px border muted gold, transparent fill, muted gold text, 16px semibold. Pill shape. For users who want to try again immediately.
- **"Finish"**: Primary style. Muted gold fill, dark text, pill shape, golden glow shadow. The expected action — returns to Dashboard.

---

## Navigation Bar (Global)

Present on all 3 tab screens. Hidden during the immersive practice flow (screens 4–8).

- **Position**: Fixed bottom
- **Background**: Dark surface `#1E1E1E`
- **Top border**: 1px `#2A2A2A`
- **Height**: 64px (8px top padding, 8px bottom padding)
- **3 tabs**, evenly distributed:

| Tab | Icon | Active Color | Inactive Color |
|-----|------|-------------|----------------|
| Home | ⌂ | Bright Gold `#E9C46A` | Light Grey `#A0A0A0` |
| Drills | ♪ | Bright Gold | Light Grey |
| Profile | ◉ | Bright Gold | Light Grey |

- Labels: 11px, semibold weight.
- Icons: 22px.

---

## Transitions Between Screens

| From | To | Transition |
|------|----|-----------|
| Dashboard → Session Overview | Slide up from bottom | New screen rises like a curtain |
| Session Overview → Tune | Crossfade | Immersive mode begins — chrome dissolves |
| Tune → Drill | Crossfade | Space transforms, strings disappear into void |
| Drill → Ear Check | Crossfade | Void reveals strings again |
| Ear Check → Summary | Slide up from bottom | Results arrive with ceremony |
| Summary → Dashboard | Replace (no back) | Clean return, no stack buildup |
| Dashboard → Tuner (standalone) | Crossfade | Same tuning screen, but Back returns to Dashboard |
