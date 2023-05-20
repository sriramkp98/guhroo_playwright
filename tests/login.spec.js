import { test, expect, devices } from '@playwright/test';

// test.use({ 
//     //...devices['iPhone 11'],
//         viewport: { width: 600, height: 900 },
//   });


test.beforeEach(async ({ page }) => {
  await page.goto('https://qa.cloud.guhroo.co/login');
  //Enter these two values
});

test.afterAll(async ({ page })=> {
    await page.close();
});

test('testcase1', async ({ page })=> {
  //Scenario-1:To check the field validations(Error messages) for login page 
  await page.getByPlaceholder('Enter username').click();
  //Testcase-1:Logging in without giving an username and password
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("Scenario-1:To check the field validations(Error messages) for login page");
  console.log("\n")
  console.log("Testcase-1:Logging in without giving an username and password", "\n");
  var a=await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div')).toContainText('Please enter your username to proceed.');
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText('Please enter your password to proceed.');
  //expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div').textContent());
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());
 
    
});

  test('testcase2', async ({ page }) => {
  //Testcase-2:Giving an empty space for username field
  await page.getByPlaceholder('Enter username').fill('     ');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('    ');
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-2:Giving an empty space for username field", "\n")
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div')).toContainText('You have entered a invalid username');
  //expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div').textContent());
  });

  test('testcase3', async ({ page })=>{
  //Testcase-3:Giving a valid username and invalid password
  await page.getByPlaceholder('Enter username').clear();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByPlaceholder('Enter password').clear();
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-3:Giving a valid username and invalid password", "\n")
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText('The password you entered is incorrect');
  //expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());
});