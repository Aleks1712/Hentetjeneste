// Typography system inspired by Spond's clean UX

export const typography = {
  // Font families
  family: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  
  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const textStyles = {
  // Headers
  h1: {
    fontSize: typography.size['3xl'],
    lineHeight: typography.size['3xl'] * typography.lineHeight.tight,
    fontWeight: typography.weight.bold,
  },
  h2: {
    fontSize: typography.size['2xl'],
    lineHeight: typography.size['2xl'] * typography.lineHeight.tight,
    fontWeight: typography.weight.bold,
  },
  h3: {
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl * typography.lineHeight.normal,
    fontWeight: typography.weight.semibold,
  },
  h4: {
    fontSize: typography.size.lg,
    lineHeight: typography.size.lg * typography.lineHeight.normal,
    fontWeight: typography.weight.semibold,
  },
  
  // Body
  body: {
    fontSize: typography.size.base,
    lineHeight: typography.size.base * typography.lineHeight.normal,
    fontWeight: typography.weight.regular,
  },
  bodySmall: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm * typography.lineHeight.normal,
    fontWeight: typography.weight.regular,
  },
  
  // Labels
  label: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm * typography.lineHeight.normal,
    fontWeight: typography.weight.medium,
  },
  caption: {
    fontSize: typography.size.xs,
    lineHeight: typography.size.xs * typography.lineHeight.normal,
    fontWeight: typography.weight.regular,
  },
  
  // Buttons
  button: {
    fontSize: typography.size.base,
    lineHeight: typography.size.base * typography.lineHeight.tight,
    fontWeight: typography.weight.semibold,
  },
};
