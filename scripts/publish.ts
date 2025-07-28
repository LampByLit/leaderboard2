#!/usr/bin/env node

/**
 * Publisher script
 * Processes metadata.json and generates sorted output.json
 */

import { publishLeaderboard } from '../lib/publisher';

/**
 * Main publishing function
 */
async function main() {
  console.log('🚀 Starting Amazon book publisher...\n');
  
  try {
    await publishLeaderboard();
  } catch (error) {
    console.error('💥 Fatal error during publishing:', error);
    process.exit(1);
  }
}

// Run the publisher if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main }; 