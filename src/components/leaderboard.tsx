import { BookCard } from './book-card';
import { OutputData } from '@/lib/types';

interface LeaderboardProps {
  data: OutputData;
}

export function Leaderboard({ data }: LeaderboardProps) {
  const { books, generatedAt, totalBooks, validBooks, failedBooks } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Amazon Paperback Leaderboard
        </h1>
        <p className="text-gray-600">
          Books ranked by Best Sellers Rank (BSR) - Lower numbers are better
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="material-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">📚</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
            </div>
          </div>
        </div>

        <div className="material-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Valid Books</p>
              <p className="text-2xl font-bold text-gray-900">{validBooks}</p>
            </div>
          </div>
        </div>

        <div className="material-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">✗</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Failed Books</p>
              <p className="text-2xl font-bold text-gray-900">{failedBooks}</p>
            </div>
          </div>
        </div>

        <div className="material-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">🕒</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(generatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <BookCard key={book.url} book={book} rank={index + 1} />
        ))}
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try running the scraper to collect book data.
          </p>
        </div>
      )}
    </div>
  );
} 