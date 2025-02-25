export const FIRST_CIRCLE_RATES = {
  MIN_DONOR_RATE: 0.3, // 30% des personnes du premier cercle
  MAX_DONOR_RATE: 0.6, // 60% des personnes du premier cercle
} as const;

export const SECOND_CIRCLE_RATES = {
  SMALL_TOWN: {
    MIN_DONOR_RATE: 0.05, // 5% des habitants d'une petite commune
    MAX_DONOR_RATE: 0.1, // 10% des habitants d'une petite commune
  },
  MEDIUM_TOWN: {
    MIN_DONOR_RATE: 0.005, // 0.5% des habitants d'une commune moyenne
    MAX_DONOR_RATE: 0.01, // 1% des habitants d'une commune moyenne
  },
  LARGE_CITY: {
    MIN_DONOR_RATE: 0.0005, // 0.05% des habitants d'une grande ville
    MAX_DONOR_RATE: 0.001, // 0.1% des habitants d'une grande ville
  },
} as const;

export const THIRD_CIRCLE_RATES = {
  ONLINE_VISITORS: {
    DONOR_RATE: 0.01, // 1% des visiteurs en ligne
  },
  ONSITE_VISITORS: {
    DONOR_RATE: 0.05, // 5% des visiteurs sur site
  },
} as const;

export const AVERAGE_DONATION_AMOUNTS = {
  FIRST_AND_SECOND_CIRCLE: 348, // Montant moyen du don pour les 1er et 2e cercles
  THIRD_CIRCLE: 200, // Montant moyen du don pour le 3e cercle
} as const; 