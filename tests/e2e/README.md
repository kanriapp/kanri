# Kanri E2E Testing with Playwright

This directory contains end-to-end tests for the Kanri application using Playwright, with special focus on testing the browser compatibility layer for Tauri APIs.

## Setup

1. Install Playwright dependencies:
```bash
yarn playwright:install
yarn playwright:install-deps
```

2. Install project dependencies:
```bash
yarn install
```

## Running Tests

### Basic Commands

```bash
# Run all e2e tests
yarn test:e2e

# Run tests with UI mode (interactive)
yarn test:e2e:ui

# Run tests in headed mode (see browser)
yarn test:e2e:headed

# Debug tests step by step
yarn test:e2e:debug

# View test report
yarn test:e2e:report
```

### Test Files

- `kanban-board.spec.ts` - Basic application functionality tests
- `browser-compatibility.spec.ts` - Tests for Tauri API browser compatibility layer
- `kanban-workflow.spec.ts` - Full workflow tests using page object model
- `page-objects/KanbanPage.ts` - Page object model for cleaner test organization

## Browser Compatibility Testing

The tests include comprehensive coverage for the Tauri->browser compatibility layer:

### MockLazyStore Testing
- Tests localStorage-based data persistence
- Verifies get/set/has/delete operations
- Checks data persistence across page reloads

### File System Mock Testing
- Tests `writeTextFile` operations (logs to console)
- Tests `exists` operations (always returns false in browser)
- Ensures no crashes when file operations are called

### Dialog Mock Testing
- Tests save dialog operations (returns null - cancelled)
- Verifies graceful handling of dialog interactions

### Core API Mock Testing
- Tests `convertFileSrc` for different URL types:
  - HTTP/HTTPS URLs: pass through unchanged
  - Local file paths: return empty string
  - Data URLs: pass through unchanged

## Test Configuration

The tests are configured to:
- Test against multiple browsers (Chrome, Firefox, Safari, Mobile)
- Take screenshots on failures
- Record videos on failures
- Generate trace files for debugging
- Start the dev server automatically

## Environment Variables

- `PLAYWRIGHT_BASE_URL` - Override the base URL (default: http://localhost:3000)
- `CI` - Enables CI-specific settings (retries, parallel execution)

## Page Object Model

The `KanbanPage` class provides a clean interface for interacting with the application:

```typescript
const kanbanPage = new KanbanPage(page);
await kanbanPage.goto();
await kanbanPage.createNewBoard('My Test Board');
await kanbanPage.expectNoTauriErrors();
```

## Common Test Patterns

### Testing Browser Compatibility
```typescript
test('should handle Tauri APIs in browser', async ({ page }) => {
  const kanbanPage = new KanbanPage(page);
  await kanbanPage.goto();
  await kanbanPage.waitForBrowserCompatibilityLayer();
  
  // Test mock operations
  const results = await kanbanPage.testStoreOperations({
    boards: [{ id: '1', title: 'Test' }]
  });
  
  expect(results.boards).toBeDefined();
  await kanbanPage.expectNoTauriErrors();
});
```

### Testing Data Persistence
```typescript
test('should persist data across reloads', async ({ page }) => {
  const kanbanPage = new KanbanPage(page);
  await kanbanPage.setLocalStorageData('testKey', { data: 'test' });
  
  await page.reload();
  
  const data = await kanbanPage.getLocalStorageData('testKey');
  expect(JSON.parse(data!)).toEqual({ data: 'test' });
});
```

## Debugging

1. Use `yarn test:e2e:debug` to step through tests
2. Screenshots are saved to `tests/e2e/screenshots/`
3. Videos and traces are available in `test-results/`
4. Use `page.pause()` in tests to pause execution

## CI/CD Integration

The tests are configured for CI environments:
- Reduced parallelism on CI
- Automatic retries on failure
- Optimized reporter for CI logs

## Troubleshooting

### Common Issues

1. **Tests timeout**: Increase timeout in playwright.config.ts
2. **Browser not found**: Run `yarn playwright:install`
3. **Dev server not starting**: Check that port 3000 is available
4. **Tauri errors in browser**: Check browser compatibility layer is loaded

### Debug Commands

```bash
# Run specific test file
npx playwright test browser-compatibility.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium

# Generate test report
npx playwright show-report
```