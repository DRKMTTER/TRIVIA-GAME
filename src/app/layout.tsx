import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GameProvider } from '@/lib/contexts/GameContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Papa\'s and Maelcolm\'s Trivia Adventure',
  description: 'A fun trivia game for kids aged 8-12!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
