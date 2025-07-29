import { scrapeBooks } from './scraper';
import { publishLeaderboard } from './publisher';
import { writeMetadata } from './data-manager';

/**
 * Daily cycle module for scraping and publishing
 * Runs scraper followed by publisher with retry logic
 */

// Hardcoded URLs to scrape (same as in scrape.ts)
const HARDCODED_URLS = [
  'https://www.amazon.com/NUTCRANKR-Dan-Baltic/dp/195189779X',
  'https://www.amazon.com/Harassment-Architecture-Mike-Mangold/dp/1795641495',
  'https://www.amazon.com/Finally-Some-Good-Delicious-Tacos/dp/1790356229',
  'https://www.amazon.com/Improvidence-David-Herod/dp/B0CWCF7J13',
  'https://www.amazon.com/INCEL-Novel-ARX-Han/dp/B0CJLCZVCG',
  'https://www.amazon.com/dp/B0BRC7Z2Q9',
  'https://www.amazon.com/Eggplant-Ogden-Nesmer/dp/B09MJBNL7X',
  'https://www.amazon.com/Tower-Jack-BC/dp/0645928208',
  'https://www.amazon.com/Mixtape-Hyperborea-Adem-Luz-Rienspects/dp/B0BW32CX2G',    
];

/**
 * Runs the scraper with retry logic
 */
async function runScraperWithRetry(maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Scraping attempt ${attempt}/${maxRetries}...`);
      
      const scrapedBooks = await scrapeBooks(HARDCODED_URLS);
      writeMetadata(scrapedBooks);
      
      const successful = scrapedBooks.filter(book => !book.error).length;
      const failed = scrapedBooks.filter(book => book.error).length;
      
      console.log(`✅ Scraping completed: ${successful} successful, ${failed} failed`);
      return true;
      
    } catch (error) {
      console.error(`❌ Scraping attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('💥 All scraping attempts failed');
        return false;
      }
    }
  }
  return false;
}

/**
 * Runs the publisher with retry logic
 */
async function runPublisherWithRetry(maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📊 Publishing attempt ${attempt}/${maxRetries}...`);
      
      await publishLeaderboard();
      
      console.log('✅ Publishing completed successfully');
      return true;
      
    } catch (error) {
      console.error(`❌ Publishing attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('💥 All publishing attempts failed');
        return false;
      }
    }
  }
  return false;
}

/**
 * Main cycle function that runs scraper followed by publisher
 */
export async function runDailyCycle(): Promise<void> {
  const startTime = new Date();
  console.log(`🔄 Starting daily cycle at ${startTime.toISOString()}`);
  
  try {
    // Step 1: Run scraper with retry logic
    console.log('📚 Step 1: Running scraper...');
    const scrapingSuccess = await runScraperWithRetry();
    
    if (!scrapingSuccess) {
      throw new Error('Scraping failed after all retry attempts');
    }
    
    // Step 2: Run publisher with retry logic
    console.log('📊 Step 2: Running publisher...');
    const publishingSuccess = await runPublisherWithRetry();
    
    if (!publishingSuccess) {
      throw new Error('Publishing failed after all retry attempts');
    }
    
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    
    console.log(`✅ Daily cycle completed successfully in ${duration}ms`);
    console.log(`📅 Next run scheduled for tomorrow at 00:00 UTC`);
    
  } catch (error) {
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    
    console.error(`💥 Daily cycle failed after ${duration}ms:`, error);
    throw error; // Re-throw to let the scheduler know it failed
  }
}

/**
 * Standalone function to run the cycle immediately
 */
export async function main(): Promise<void> {
  try {
    await runDailyCycle();
  } catch (error) {
    console.error('💥 Fatal error in daily cycle:', error);
    process.exit(1);
  }
}

// Run the cycle if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
} 