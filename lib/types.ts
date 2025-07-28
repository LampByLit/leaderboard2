// TypeScript interfaces for the leaderboard project

export interface BookMetadata {
  url: string;                    // Original Amazon URL
  isValidPaperback: boolean;      // Confirmation it's an Amazon paperback
  title: string;                  // Book title
  author: string;                 // Author name
  bestSellersRank: number;        // BSR (lower is better)
  coverArtUrl: string;            // Cover art image URL
  scrapedAt: string;              // ISO timestamp of when data was scraped
  error?: string;                 // Error message if scraping failed
}

export interface OutputData {
  books: BookMetadata[];          // Books sorted by BSR (lowest first)
  generatedAt: string;            // ISO timestamp of when sorted
  totalBooks: number;             // Total number of books processed
  validBooks: number;             // Number of successfully scraped books
  failedBooks: number;            // Number of failed scrapes
}

export interface ScrapingResult {
  success: boolean;
  data?: BookMetadata;
  error?: string;
} 