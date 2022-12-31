const { execSync } = require('child_process');
const fs = require('fs');

const dir = './.output';

if (fs.existsSync(dir)) {
    console.log("\x1b[32m", "Found frontend directory, starting Tauri app build.");
} else {
    console.log("\x1b[44m", 'Frontend build not found, running "yarn generate", please wait...');
    console.log("\x1b[0m");
    execSync("yarn generate");
    console.log("\x1b[32m", "Finished building frontend.");
}

process.exit(0);
