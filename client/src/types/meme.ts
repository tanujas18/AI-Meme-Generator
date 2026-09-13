export interface Meme {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface MemeResponse {
  memes: Meme[];
}

export interface ApiError {
  error: string;
}

export type Category = 'bollywood' | 'cartoon' | 'viral-songs' | 'sports';

export interface CategoryOption {
  value: Category;
  label: string;
  emoji: string;
  blurb: string;
}

export const CATEGORIES: CategoryOption[] = [
  {
    value: 'bollywood',
    label: 'Bollywood',
    emoji: '🎬',
    blurb: 'Filmy dialogues & dramatic scenes',
  },
  { value: 'cartoon', label: 'Cartoons', emoji: '📺', blurb: 'Classic toons & childhood shows' },
  { value: 'viral-songs', label: 'Viral Songs', emoji: '🎵', blurb: 'Earworms & trending audio' },
  { value: 'sports', label: 'Sports', emoji: '🏏', blurb: 'Cricket, football & fandom moments' },
];

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface MemeGeneratorState extends LoadingState {
  memes: Meme[];
  selectedCategory: Category | null;
}
