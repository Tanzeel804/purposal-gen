export enum RelationshipType {
  ROMANTIC = 'ROMANTIC',
  FRIENDSHIP = 'FRIENDSHIP'
}

export enum ProposalStyle {
  // Romantic
  SWEET = 'Sweet & Romantic',
  PASSIONATE = 'Passionate & Bold',
  POETIC = 'Poetic & Artistic',
  MOVIE = 'Movie-Inspired',
  ADVENTURE = 'Adventure-Themed',
  TIMELESS = 'Timeless & Classic',
  DESTINY = 'Written in the Stars',
  
  // Friendship
  FRIENDSHIP_FIRST = 'Friendship First',
  FUNNY = 'Funny & Playful',
  SINCERE = 'Honest & Sincere',
  NOSTALGIC = 'Nostalgic',
  SUPPORTIVE = 'Supportive',
  PARTNER_IN_CRIME = 'Partner in Crime',
  GROWTH = 'Growing Together',
  
  // Generic
  CUSTOM = 'Custom'
}

export interface ProposalData {
  senderName: string;
  recipientName: string;
  relationshipType: RelationshipType | null;
  style: ProposalStyle;
  customMessage?: string;
  image?: string; // Data URL
  date?: string;
  musicEnabled: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface ProposalContextType {
  data: ProposalData;
  updateData: (updates: Partial<ProposalData>) => void;
  resetData: () => void;
}