#!/usr/bin/env node

/**
 * Main scraper script
 * Reads URLs from below and processes them to generate metadata.json
 */

import fs from 'fs';
import path from 'path';
import { scrapeBooks } from '../lib/scraper';
import { writeMetadata } from '../lib/data-manager';

// Hardcoded URLs to scrape (you can update this manually)
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
  // Add more URLs here as needed
];

/**
 * Main scraping function
 */
async function main() {
  console.log('🚀 Starting Amazon book scraper...\n');
  
  try {
    // Use hardcoded URLs for now
    const urls = HARDCODED_URLS;
    
    if (urls.length === 0) {
      console.log('❌ No URLs to scrape. Please add URLs to the HARDCODED_URLS array.');
      return;
    }
    
    console.log(`📚 Found ${urls.length} URLs to scrape`);
    console.log('⏳ Starting scraping process (this may take a while due to rate limiting)...\n');
    
    // Scrape all books
    const scrapedBooks = await scrapeBooks(urls);
    
    // Write results to metadata.json
    writeMetadata(scrapedBooks);
    
    // Summary
    const successful = scrapedBooks.filter(book => !book.error).length;
    const failed = scrapedBooks.filter(book => book.error).length;
    
    console.log('\n📊 Scraping Summary:');
    console.log(`✅ Successfully scraped: ${successful} books`);
    console.log(`❌ Failed to scrape: ${failed} books`);
    console.log(`📁 Results saved to: data/metadata.json`);
    
    if (failed > 0) {
      console.log('\n⚠️  Failed books:');
      scrapedBooks
        .filter(book => book.error)
        .forEach(book => {
          console.log(`   - ${book.url}: ${book.error}`);
        });
    }
    
  } catch (error) {
    console.error('💥 Fatal error during scraping:', error);
    process.exit(1);
  }
}

// Run the scraper if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main }; 