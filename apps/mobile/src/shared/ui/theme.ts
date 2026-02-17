export const colors = {
  bg: '#121212',
  surface: '#1E1E1E',
  surfaceLight: '#2A2A2A',
  goldBright: '#E9C46A',
  goldMuted: '#D4A373',
  teal: '#2A4D69',
  tealLight: '#3A6D89',
  textPrimary: '#E0E0E0',
  textSecondary: '#A0A0A0',
  success: '#4ADE80',
  error: '#E76F51',
  warning: '#FBBF24',
  stringInactive: '#333333',
  transparent: 'transparent',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  hero: {
    fontSize: 48,
    fontWeight: 'bold' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
} as const;
