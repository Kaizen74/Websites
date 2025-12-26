import { execSync } from 'child_process';
import { existsSync } from 'fs';

const MAX_SIZE_MB = 200; // Safety margin below 250MB Vercel limit

function getFolderSize(folder) {
  try {
    if (!existsSync(folder)) {
      return 0;
    }
    const result = execSync(`du -sm ${folder}`).toString();
    return parseInt(result.split('\t')[0], 10);
  } catch {
    return 0;
  }
}

// Try different build output directories
const buildDir = existsSync('dist') ? 'dist' : existsSync('build') ? 'build' : existsSync('.next') ? '.next' : null;
const buildSize = buildDir ? getFolderSize(buildDir) : 0;
const nodeModulesSize = getFolderSize('node_modules');
const totalSize = buildSize + nodeModulesSize;

console.log('\n📦 BUNDLE SIZE REPORT');
console.log('═'.repeat(40));
console.log(`Build folder (${buildDir || 'none'}):     ${buildSize} MB`);
console.log(`node_modules:     ${nodeModulesSize} MB`);
console.log(`Total:            ${totalSize} MB`);
console.log(`Limit:            ${MAX_SIZE_MB} MB`);
console.log('═'.repeat(40));

if (totalSize > MAX_SIZE_MB) {
  console.error(`\n❌ ERROR: Bundle size (${totalSize}MB) exceeds limit (${MAX_SIZE_MB}MB)!`);
  console.error('Run: npm run analyze to identify large dependencies');
  process.exit(1);
} else {
  const headroom = MAX_SIZE_MB - totalSize;
  console.log(`\n✅ Bundle size OK (${headroom}MB headroom)`);
}
