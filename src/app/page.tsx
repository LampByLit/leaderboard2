import { Suspense } from 'react';
import { Leaderboard } from '@/components/leaderboard';
import { LoadingSkeleton } from '@/components/loading';
import { OutputData } from '@/lib/types';
import fs from 'fs';
import path from 'path';

async function getLeaderboardData(): Promise<OutputData> {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'output.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading leaderboard data:', error);
    return {
      books: [],
      generatedAt: new Date().toISOString(),
      totalBooks: 0,
      validBooks: 0,
      failedBooks: 0,
    };
  }
}

export default async function Home() {
  const data = await getLeaderboardData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSkeleton />}>
        <Leaderboard data={data} />
      </Suspense>
    </div>
  );
}
