import GameWheel from '@/components/GameWheel';
import PlayerProgress from '@/components/PlayerProgress';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Papa&apos;s and Maelcolm&apos;s Trivia Adventure
          </h1>
          <p className="text-xl text-gray-600">
            Spin the wheel and test your knowledge!
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <GameWheel />
        </div>

        <div className="mt-8">
          <PlayerProgress />
        </div>
      </div>
    </main>
  );
}
