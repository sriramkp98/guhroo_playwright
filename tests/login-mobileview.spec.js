import { test, expect, devices } from '@playwright/test';

test.use({ 
    //...devices['iPhone 11'],
        viewport: { width: 600, height: 900 },
  });

test('mobiletest', async ({ page}) => {
  
//To open the guhroo login page
  await page.goto('https://qa.cloud.guhroo.co/login');

  
//To check the field validations(Error messages) for login page 
  await page.getByPlaceholder('Enter username').click();
  //Logging in without giving an username and password
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('text=Please enter your username to proceed.')).toHaveCount (1);
  await expect(page.locator('text=Please enter your password to proceed.')).toHaveCount (1);

  //Giving an empty space for username field
  await page.getByPlaceholder('Enter username').fill('     ');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('    ');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('text=You have entered a invalid username')).toHaveCount (1);

 //Giving a valid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect (page.getByRole('alert').locator('text=The password you entered is incorrect')).toHaveCount (1);

  //Giving a invalid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('text=Oops! Unable to process your request. Please check the data and try again.')).toHaveCount (1);
  
  //To check the field validations(Error messages) for forgot password page
  await page.getByRole('link', { name: 'Forgot password ?' }).click();//forgot password page will be opened
  
  //Requesting an forgot password link without giving an username
  await page.getByRole('button', { name: 'Send link' }).click();
  await expect (page.locator('text=Please enter your username to proceed.')).toHaveCount (1);

  //Giving an invalid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByRole('button', { name: 'Send link' }).click();
  await expect (page.getByRole('alert').locator('text=Invalid Username')).toHaveCount (1);
  
  //Giving an email in username field
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('emptest11@YOPmail.com');
  await page.getByRole('button', { name: 'Send link' }).click();
  await expect (page.getByRole('alert').locator('text=Invalid Username')).toHaveCount (1);

  //Giving an empty space username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('  ');
  await page.getByRole('button', { name: 'Send link' }).click();
  await expect (page.getByRole('alert').locator('text=Validation Error')).toHaveCount (1);
  
  //Giving a valid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByRole('button', { name: 'Send link' }).click();
  
  //To open a forgot password link from mail
  await page.goto('https://yopmail.com/?emptest11');
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page2Promise;

  //Giving an empty space in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('    ');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('    ');
  await page1.getByRole('button', { name: 'Change password' }).click();
  //await expect (page.getByRole('alert').locator('text=Validation Error')).toHaveCount (1);

  //Clicking on change password button without giving password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('');
  await page1.getByRole('button', { name: 'Change password' }).click();
  //await expect (page.locator('text=Password field is required')).toHaveCount (1);

  //Clicking on change password button by giving a character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password');
  await page1.getByRole('button', { name: 'Change password' }).click();
  //await expect (page.getByRole('alert').locator('text=Invalid Username')).toHaveCount (1);

  //Clicking on change password button by giving a character and special character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@');
  await page1.getByRole('button', { name: 'Change password' }).click();
  await page1.getByPlaceholder('Enter Password').click();
  //await expect (page.getByRole('alert').locator('text=Validation Error')).toHaveCount (1);

  //Clicking on change password button by giving a character, special character and number in password and confirm password
  await page1.getByPlaceholder('Enter Password').fill('Password@567');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@5678');
  await page1.getByRole('button', { name: 'Change password' }).click();
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@567');
  await page1.getByRole('button', { name: 'Change password' }).click();

  //To check, user can able to login or not after password change
  //Entering the previous password with correct username
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  //await expect (page.getByRole('alert').locator('text=The password you entered is incorrect')).toHaveCount (1);

  //Giving a valid mail id in username field and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('emptest11@yopmail.com');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  //await expect(page.locator('text=Oops! Unable to process your request. Please check the data and try again.')).toHaveCount (1);

  //Giving a valid username and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();

});
