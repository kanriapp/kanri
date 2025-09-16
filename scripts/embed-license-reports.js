// SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>
// SPDX-License-Identifier: GPL-3.0-or-later

// Automation script to:
// 1) Run `yarn generate`
// 2) In `src-tauri`, run `cargo about generate about.hbs -o license.html`
// 3) Read `LICENSES_3RD_PARTY.txt`, escape angle brackets, and replace the <pre> block in `pages/licenses/index.vue`
// 4) Read `src-tauri/license.html`, extract the <main>...</main> and replace the <main> block in `pages/licenses/rust.vue`

// Note: This project uses type: module. Use ESM imports and import.meta.url.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function log(step, message) {
	const stamp = new Date().toISOString();
	console.log(`[${stamp}] [${step}] ${message}`);
}

function run(cmd, cwd) {
	log('run', `${cmd} (cwd=${cwd || process.cwd()})`);
	execSync(cmd, { stdio: 'inherit', cwd: cwd || process.cwd(), shell: true });
}

function findFirstExisting(paths) {
	for (const p of paths) {
		if (existsSync(p)) return p;
	}
	return null;
}

// Escape angle brackets for safe insertion into HTML <pre>
function escapeAngleBrackets(content) {
	// The intent is to display raw text in HTML; escape < and >.
	// Also normalize CRLF to LF to avoid double-escaping edge cases.
	return content.replace(/\r\n/g, '\n').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Replace the first <pre>...</pre> block in a Vue SFC file with provided content
function replacePreBlock(vueFilePath, escapedText) {
	const original = readFileSync(vueFilePath, 'utf8');

	// Capture indentation before <pre> to keep formatting consistent
	const preRegex = /(\n|\r|^)\s*<pre[\s\S]*?<\/pre>/i;
	const match = original.match(preRegex);
	if (!match) {
		throw new Error(`No <pre>...</pre> block found in ${vueFilePath}`);
	}

	// Determine the indentation of the first <pre>
	const preStartIndex = match.index ?? 0;
	const before = original.slice(0, preStartIndex);
	const lineStart = before.lastIndexOf('\n') + 1;
	const indent = before.slice(lineStart).match(/^\s*/)?.[0] ?? '';

	const replacement = `\n${indent}<pre>\n${escapedText}\n${indent}</pre>`;
	const updated = original.replace(preRegex, replacement);
	writeFileSync(vueFilePath, updated);
	return { changed: original !== updated };
}

// Extract the first <main ...>...</main> block from an HTML file
function extractMain(htmlFilePath) {
	const html = readFileSync(htmlFilePath, 'utf8');
	const mainRegex = /<main\b[\s\S]*?<\/main>/i;
	const m = html.match(mainRegex);
	if (!m) {
		throw new Error(`No <main>...</main> found in ${htmlFilePath}`);
	}
	return m[0];
}

// Replace the first <main ...>...</main> block in a Vue SFC
function replaceMainInVue(vueFilePath, newMainHtml) {
	const original = readFileSync(vueFilePath, 'utf8');
	const mainRegex = /<main\b[\s\S]*?<\/main>/i;
	if (!mainRegex.test(original)) {
		throw new Error(`No <main>...</main> block found in ${vueFilePath}`);
	}
	const updated = original.replace(mainRegex, newMainHtml);
	writeFileSync(vueFilePath, updated);
	return { changed: original !== updated };
}

async function main() {
	const args = process.argv.slice(2);
	const skipCommands = args.includes('--skip-commands');

	// Step 1: run yarn generate
	if (!skipCommands) {
		log('step-1', 'Running `yarn generate` at repository root...');
		run('yarn generate', repoRoot);
	} else {
		log('step-1', 'Skipping `yarn generate` (flag --skip-commands)');
	}

	// Step 2: run cargo about generate in src-tauri
	const srcTauriDir = path.resolve(repoRoot, 'src-tauri');
	if (!skipCommands) {
		log('step-2', 'Generating Rust license report with `cargo about`...');
		const aboutHbs = path.resolve(srcTauriDir, 'about.hbs');
		if (!existsSync(aboutHbs)) {
			throw new Error(`Template not found: ${aboutHbs}`);
		}
		run('cargo about generate about.hbs -o license.html', srcTauriDir);
	} else {
		log('step-2', 'Skipping `cargo about generate` (flag --skip-commands)');
	}

	// Step 3: Replace <pre> in pages/licenses/index.vue with escaped LICENSES_3RD_PARTY.txt
	log('step-3', 'Embedding LICENSES_3RD_PARTY.txt into pages/licenses/index.vue...');
	const thirdPartyReportPath = path.resolve(repoRoot, 'LICENSES_3RD_PARTY.txt');
	if (!existsSync(thirdPartyReportPath)) {
		throw new Error(`Missing file: ${thirdPartyReportPath}`);
	}
	const rawThirdParty = readFileSync(thirdPartyReportPath, 'utf8');
	const escapedThirdParty = escapeAngleBrackets(rawThirdParty);

	const licensesIndexCandidates = [
		path.resolve(repoRoot, 'pages', 'licenses', 'index.vue'), // expected
		path.resolve(repoRoot, 'pages', 'licenes', 'index.vue'), // fallback for potential typo
	];
	const licensesIndexPath = findFirstExisting(licensesIndexCandidates);
	if (!licensesIndexPath) {
		throw new Error('Could not find licenses index.vue page in either pages/licenses/index.vue or pages/licenes/index.vue');
	}
	replacePreBlock(licensesIndexPath, escapedThirdParty);
	log('step-3', `Updated <pre> block in ${path.relative(repoRoot, licensesIndexPath)}`);

	// Step 4: Extract <main> from src-tauri/license.html and replace in pages/licenses/rust.vue
	log('step-4', 'Replacing <main> in pages/licenses/rust.vue with generated Rust licenses HTML...');
	const generatedHtmlPath = path.resolve(srcTauriDir, 'license.html');
	if (!existsSync(generatedHtmlPath)) {
		throw new Error(`Generated HTML not found: ${generatedHtmlPath}. Did step 2 succeed?`);
	}
	const newMainHtml = extractMain(generatedHtmlPath);

	const rustVueCandidates = [
		path.resolve(repoRoot, 'pages', 'licenses', 'rust.vue'), // expected
		path.resolve(repoRoot, 'pages', 'rust.vue'), // fallback for potential older path
	];
	const rustVuePath = findFirstExisting(rustVueCandidates);
	if (!rustVuePath) {
		throw new Error('Could not find Rust licenses page in either pages/licenses/rust.vue or pages/rust.vue');
	}
	replaceMainInVue(rustVuePath, newMainHtml);
	log('step-4', `Updated <main> block in ${path.relative(repoRoot, rustVuePath)}`);

	log('done', 'All steps completed successfully.');
}

main().catch(err => {
    console.error(`[error] ${err.message}`);
    process.exit(1);
});