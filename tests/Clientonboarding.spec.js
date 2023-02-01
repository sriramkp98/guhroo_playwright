import { test, expect, selectors } from '@playwright/test';
import { loginpage } from '../pages/login';

test('clientonboardingtest', async ({ page }) => {
  const login = new loginpage(page)
  login.login('devi', 'pass')
  login.invite('test', 'regattemptseven', 'testregattemptseven', 'Sunregsystemseven', 'testregattemptseven@YOPmail.com')

  await page.goto('https://qa.cloud.guhroo.co/login');

  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter password').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.getByRole('link', { name: ' Invite Client' }).click();

  //Inviting a client to fill onboard form
  // await page.getByLabel('First Name').click();
  // await page.getByLabel('Last Name').click();
  // await page.getByLabel('Username').click();
  // await page.getByLabel('Email').click();
  // await page.getByLabel('Legal Name').click();
  //await page.getByLabel('Logo').click();
  //await page.getByLabel('Logo').setInputFiles('istockphoto-517188688-612x612.jpg');
  // await page.getByRole('button', { name: 'Invite' }).click();
  await page.getByText('LOGOUT').click();

  //Opening a invited user mail to check the invite is recieved
  await page.goto('https://yopmail.com/?testregattemptfive');
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page1Promise;
  // await page.pause();
  // await expect(page1.locator('selector=#admin')).toBeDisabled;
  const admin_name = page1.locator("#admin");
  var actualresult=await admin_name.getAttribute("value");
  var expectedresult = 'test regattemptfive';
  if(expectedresult === actualresult){
    console.log("Expected value is shown ", actualresult)
  }
  else{
    console.log("Expected value is not shown ", actualresult)
  }
  await page.pause();
  await expect(page1.getByPlaceholder('Enter email')).toBeDisabled();
  await page.pause();
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('Sunregsystemone dfgggggggggggggggggggggggggggggggggggggggggggggggggggfdddddddddsssssssssssssrreeeeee');
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('errrrrrfdaaaaaaaaaaczxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfwwwwwwwwwwwwwwwwwewwwwwwwwwwwtgggggggggggghfffffffffffyuuuuuuuuuuuuuuuuuukuuuuuuuuuuuuuuuuuuuuuuukyyyyyyyy');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('3454656466656');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Pass');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password');
  await page1.getByRole('button', { name: 'Create account' }).click();
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('345465646');
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').click({
    clickCount: 3
  });
  await page1.getByPlaceholder('Enter trade name').fill('re');
  await page1.getByRole('button', { name: 'Create account' }).click();
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('retest@123');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('Sunregsystemone dfgggg@ggggggggggggggggggggggggggggggggggggggggggggggfdddddddddsssssssssssssrreeeeee');
  await page1.getByPlaceholder('Enter company name').press('ArrowLeft');
  await page1.getByPlaceholder('Enter company name').fill('Sunregsystemone dfggg1@ggggggggggggggggggggggggggggggggggggggggggggggfdddddddddsssssssssssssrreeeeee');
  await page1.getByRole('button', { name: 'Create account' }).click();
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('retest');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('Sunregsystemone');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByRole('button', { name: 'Create account' }).click();
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password@567');
  await page1.getByRole('button', { name: 'Create account' }).click();

})