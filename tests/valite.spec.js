import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page })=> {
  await page.goto('http://dev.valite.org/school-register');
});

test.afterAll(async ({ page })=> {
  await page.close();
});
test.skip('testcase1', async ({ page }) => {
  await page.locator('input[name="schoolName"]').click();
  await page.locator('input[name="schoolName"]').fill('Siam Testing Svhool');
  await page.locator('form div').filter({ hasText: 'Board and Medium* :Please Select BoardCBSE, EnglishICSE, EnglishAndhra, EnglishT' }).getByRole('combobox').selectOption('13');
  await page.locator('form div').filter({ hasText: 'School Type* :Please Select School TypeMiddle SchoolHigh SchoolHigher Secondary ' }).getByRole('combobox').selectOption('2');
  await page.getByRole('combobox').nth(2).selectOption('1');
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('7');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('6');
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').nth(3).selectOption('2');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('8');
  await page.getByRole('spinbutton').nth(3).click();
  await page.getByRole('spinbutton').nth(3).fill('6');
  await page.locator('input[name="hmName"]').click();
  await page.locator('input[name="hmName"]').fill('test');
  await page.locator('input[name="hmPhone"]').click();
  await page.locator('input[name="hmPhone"]').fill('5555666654');
  await page.getByRole('button', { name: 'NEXT' }).click();
  
});

test('testcase2', async ({ page }) => {
  await page.locator('input[name="schoolName"]').click();
  await page.locator('input[name="schoolName"]').fill('Siam Testing Svhool');
  await page.locator('form div').filter({ hasText: 'Board and Medium* :Please Select BoardCBSE, EnglishICSE, EnglishAndhra, EnglishT' }).getByRole('combobox').selectOption('13');
  await page.locator('form div').filter({ hasText: 'School Type* :Please Select School TypeMiddle SchoolHigh SchoolHigher Secondary ' }).getByRole('combobox').selectOption('2');
  await page.getByRole('combobox').nth(2).selectOption('1');
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('');
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').nth(3).selectOption('3');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('');
  await page.getByRole('spinbutton').nth(3).click();
  await page.getByRole('spinbutton').nth(3).fill('');
  await page.locator('input[name="hmName"]').click();
  await page.locator('input[name="hmName"]').fill('test');
  await page.locator('input[name="hmPhone"]').click();
  await page.locator('input[name="hmPhone"]').fill('');
  await page.getByRole('button', { name: 'NEXT' }).click();
  
});

test('testcase3', async ({ page }) => {
  await page.locator('input[name="schoolName"]').click();
  await page.locator('input[name="schoolName"]').fill('Siam Testing Svhool');
  await page.locator('form div').filter({ hasText: 'Board and Medium* :Please Select BoardCBSE, EnglishICSE, EnglishAndhra, EnglishT' }).getByRole('combobox').selectOption('13');
  await page.locator('form div').filter({ hasText: 'School Type* :Please Select School TypeMiddle SchoolHigh SchoolHigher Secondary ' }).getByRole('combobox').selectOption('2');
  await page.getByRole('combobox').nth(2).selectOption('1');
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('7');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('6');
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('combobox').nth(3).selectOption('2');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('8');
  await page.getByRole('spinbutton').nth(3).click();
  await page.getByRole('spinbutton').nth(3).fill('6');
  await page.locator('input[name="hmName"]').click();
  await page.locator('input[name="hmName"]').fill('test');
  await page.locator('input[name="hmPhone"]').click();
  await page.locator('input[name="hmPhone"]').fill('5555666654');
  await page.getByRole('button', { name: 'NEXT' }).click();
  
});