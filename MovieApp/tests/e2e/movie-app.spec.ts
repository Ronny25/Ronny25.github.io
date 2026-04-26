import { test, expect } from '@playwright/test';
import popular from './fixtures/popular.json' with { type: 'json' };
import search from './fixtures/search.json' with { type: 'json' };
import details from './fixtures/details.json' with { type: 'json' };
import recommendations from './fixtures/recommendations.json' with { type: 'json' };
import similar from './fixtures/similar.json' with { type: 'json' };
import genres from './fixtures/genres.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.route('**/movie/popular*', async (route) => {
    await route.fulfill({ json: popular });
  });
  await page.route('**/search/movie*', async (route) => {
    await route.fulfill({ json: search });
  });
  await page.route('**/movie/268', async (route) => {
    await route.fulfill({ json: details });
  });
  await page.route('**/movie/268/recommendations*', async (route) => {
    await route.fulfill({ json: recommendations });
  });
  await page.route('**/movie/268/similar*', async (route) => {
    await route.fulfill({ json: similar });
  });
  await page.route('**/genre/movie/list*', async (route) => {
    await route.fulfill({ json: genres });
  });
});

test('Home to Details', async ({ page }) => {
  await page.goto('/');
  // popular.json has "Batman" as a result? Let's assume so based on previous test
  await expect(page.locator('h3').filter({ hasText: 'Batman' }).first()).toBeVisible();
  await page.click('text=Show more');
  await expect(page.url()).toContain('/movie/268');
  await expect(page.locator('h1')).toContainText('Batman');
});

test('Search', async ({ page }) => {
  await page.goto('/');
  const searchInput = page.locator('input[placeholder="search for a movie..."]');
  await searchInput.fill('Batman');
  // Debounce is 500ms
  await page.waitForTimeout(600);
  await expect(page.locator('h3').filter({ hasText: 'Batman' }).first()).toBeVisible();
});

test('Favourites', async ({ page }) => {
  await page.goto('/');
  const favButton = page.locator('button:has-text("★")').first();
  await favButton.click();
  
  await page.goto('/favourites');
  await expect(page.locator('h3').filter({ hasText: 'Batman' }).first()).toBeVisible();
  
  const removeButton = page.locator('button:has-text("★")').first();
  await removeButton.click();
  await expect(page.locator('h3').filter({ hasText: 'Batman' }).first()).not.toBeVisible();
});
