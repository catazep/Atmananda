const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const hash = execSync('git rev-parse --short HEAD').toString().trim();

const configPath = path.join(__dirname, '../angular.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
config.projects['Atmananda'].architect.build.options.define['BUILD_HASH'] = `"${hash}"`;
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log(`Build hash set to ${hash}`);
