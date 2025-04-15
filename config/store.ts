import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Meme = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  createdAt: string;
};

type MemeStore = {
  memes: Meme[];
  addMeme: (meme: Omit<Meme, 'id' | 'createdAt'>) => void;
  updateMeme: (id: string, meme: Partial<Omit<Meme, 'id' | 'createdAt'>>) => void;
  deleteMeme: (id: string) => void;
};

// Initial meme collection data
const initialMemes: Meme[] = [
  {
    id: '1',
    name: 'Distracted Boyfriend',
    description: 'A man looking at another woman while his girlfriend looks at him disapprovingly',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['relationships', 'distraction', 'popular'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Drake Hotline Bling',
    description: 'Drake appears to be displeased in the top image, and pleased in the bottom image',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['drake', 'music', 'approval', 'disapproval'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Two Buttons',
    description: 'A person sweating while deciding which of two buttons to press',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['decision', 'choice', 'difficult'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Expanding Brain',
    description:
      'A multi-panel image showing a brain getting progressively larger, representing increasingly absurd ideas',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['intelligence', 'irony', 'progression'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Woman Yelling at Cat',
    description: 'A woman yelling at a confused white cat sitting at a dinner table',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['cats', 'argument', 'confusion'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Change My Mind',
    description:
      'Steven Crowder sitting at a table with a sign challenging people to change his mind',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['debate', 'challenge', 'opinion'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Surprised Pikachu',
    description: 'Pikachu with a surprised expression on his face',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['pokemon', 'surprise', 'reaction'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Disaster Girl',
    description:
      'A young girl smiling deviously at the camera while a house burns in the background',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['evil', 'disaster', 'smile'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Doge',
    description:
      'A Shiba Inu dog with a peculiar expression, often accompanied by colorful text in Comic Sans',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['dog', 'shiba', 'cryptocurrency'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'This Is Fine',
    description: 'A cartoon dog sitting in a room engulfed in flames saying "This is fine"',
    imageUrl: 'https://i.imgur.com/oBhJQFj.jpeg',
    tags: ['denial', 'calm', 'crisis'],
    likes: Math.floor(Math.random() * 99),
    createdAt: new Date().toISOString(),
  },
];

export const useMemeStore = create<MemeStore, [['zustand/persist', MemeStore]]>(
  persist(
    (set) => ({
      memes: initialMemes,
      addMeme: (meme) =>
        set((state) => ({
          memes: [
            ...state.memes,
            {
              ...meme,
              id: Math.random().toString(36).substring(2, 9),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateMeme: (id, updatedMeme) =>
        set((state) => ({
          memes: state.memes.map((meme) => (meme.id === id ? { ...meme, ...updatedMeme } : meme)),
        })),
      deleteMeme: (id) =>
        set((state) => ({
          memes: state.memes.filter((meme) => meme.id !== id),
        })),
    }),
    {
      name: 'meme-storage',
    }
  )
);
