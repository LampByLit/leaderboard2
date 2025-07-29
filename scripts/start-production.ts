#!/usr/bin/env node

/**
 * Production start script for Railway
 * Runs both the Next.js app and the scheduler
 */

import { spawn } from 'child_process';
import { startScheduler } from '../lib/scheduler';

/**
 * Starts the production environment
 */
async function startProduction() {
  console.log('🚀 Starting production environment...');
  
  try {
    // Start the scheduler in the background
    console.log('⏰ Starting daily scheduler...');
    startScheduler();
    
    // Start the Next.js app
    console.log('🌐 Starting Next.js application...');
    
    const nextApp = spawn('npm', ['start'], {
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down gracefully...');
      nextApp.kill('SIGINT');
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down gracefully...');
      nextApp.kill('SIGTERM');
      process.exit(0);
    });
    
    // Handle Next.js app exit
    nextApp.on('exit', (code) => {
      console.log(`🌐 Next.js app exited with code ${code}`);
      process.exit(code || 0);
    });
    
    // Handle Next.js app errors
    nextApp.on('error', (error) => {
      console.error('💥 Next.js app error:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('💥 Fatal error starting production:', error);
    process.exit(1);
  }
}

// Run production start if this file is executed directly
if (require.main === module) {
  startProduction().catch(console.error);
}

export { startProduction }; 