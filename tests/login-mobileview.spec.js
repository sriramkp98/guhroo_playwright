import { test, expect, devices } from '@playwright/test';

// test.use({ 
//     //...devices['iPhone 11'],
//         viewport: { width: 600, height: 900 },
//   });


test('test', async ({ page }) => {

  //To open the guhroo login page
  await page.goto('https://qa.cloud.guhroo.co/login');

  //Enter these two values
  var password_value = "Password@577";
  var existing_password_value = "Password@576";

  //Sign in page
  var expectedresult_username = 'Please enter your username to proceed.';//Logging in without giving an username and password
  var expectedresult_password = 'Please enter your password to proceed.';//Logging in without giving an username and password
  var expectedresult_username1 = 'You have entered a invalid username';//Giving an empty space for username field
  var expectedresult_password2 = 'The password you entered is incorrect'; //Giving a valid username and invalid password
  var expectedresult_invalid_usernamepassword = 'Invalid username or password, try again.';//Giving a invalid username and invalid password
  //Forgot password page
  var expectedresult_invalid_username = 'Please enter your username to proceed.';//Requesting a forgot password link without giving an username
  var expectedresult_invalid_username1 = 'Invalid Username'; //Giving an invalid username
  var expectedresult_invalid_username2 = 'Invalid Username';//Giving an email in username field
  var expectedresult_invalid_username3 = 'The username field is required.';//Giving an empty space username
  var expectedresult_valid_username = 'Please check your inbox for further instructions';//Giving a valid username
  //Reset password page
  var expectedresult_invalid_passwordandconfirm = 'This Password Must Contain Atleast One Lower Characters';//Giving an empty space in password and confirm password
  var expectedresult_invalid_password = 'Please enter your password.';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_confirm = 'Please enter your password.';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_passwordandconfirm2 = 'This Password must contain special characters';//Clicking on change password button by giving a charcter in password and confirm password
  var expectedresult_invalid_passwordandconfirm3 = 'This Password Must Contain Atleast One Number';//Clicking on change password button by giving a character and special character in password and confirm password
  var expectedresult_invalid_passwordandconfirm4 = 'Password must be same match';//Clicking on change password button by giving a mismatch texts in password and confirm password
  var expectedresult_invalid_passwordandconfirm5 = 'New password should be different from your old password';//Clicking on change password button by giving a existing password in password and confirm password
  var expectedresult_invalid_passwordandconfirm7 = 'This Password Must Contain Atleast One Upper Characters'//Clicking on change password button by giving a character, special character and number in password and confirm password
  var expectedresult_invalid_passwordandconfirm6='Your password has been changed successfully'
  //Sign in page
  var expectedresult_valid_username_pinvalid_password = 'The password you entered is incorrect';//To check, user can able to login or not after password change
  var expectedresult_valid_username_pinvalid_password1 = 'Invalid username or password, try again.';//Giving a valid mail id in username field and valid password

  //Scenario-1:To check the field validations(Error messages) for login page 
  await page.getByPlaceholder('Enter username').click();
  //Testcase-1:Logging in without giving an username and password
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("Scenario-1:To check the field validations(Error messages) for login page");
  console.log("\n")
  console.log("Testcase-1:Logging in without giving an username and password", "\n");
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div')).toContainText(expectedresult_username);
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_password);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div').textContent());
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-2:Giving an empty space for username field
  await page.getByPlaceholder('Enter username').fill('     ');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('    ');
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-2:Giving an empty space for username field", "\n")
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div')).toContainText(expectedresult_username1);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div').textContent());


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
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_password2);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-4:Giving a invalid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-4:Giving a invalid username and invalid password", "\n")
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_invalid_usernamepassword);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Scenario-2:To check the field validations(Error messages) for forgot password page
  await page.getByRole('link', { name: 'Forgot password ?' }).click();//forgot password page will be opened

  //Testcase-5:Requesting a forgot password link without giving an username
  await page.getByRole('button', { name: 'Send link' }).click();
  console.log("\n")
  console.log("Scenario-2:To check the field validations(Error messages) for forgot password page")
  console.log("\n")
  console.log("Testcase-5:Requesting a forgot password link without giving an username", "\n")
  await expect(page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div')).toContainText(expectedresult_invalid_username);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div').textContent());

  //Testcase-6:Giving an invalid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByRole('button', { name: 'Send link' }).click();
  console.log("\n")
  console.log("Testcase-6:Giving an invalid username", "\n")
  await expect(page.locator('//*[@id="root"]/div[2]/div')).toContainText(expectedresult_invalid_username1);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[2]/div').textContent());

  //Testcase-7:Giving an email in username field
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('emptest11@YOPmail.com');
  await page.getByRole('button', { name: 'Send link' }).click();
  console.log("\n")
  console.log("Testcase-7:Giving an email in username field", "\n")
  await expect(page.locator('//*[@id="root"]/div[2]/div')).toContainText(expectedresult_invalid_username2);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[2]/div').textContent());

  //Testcase-8:Giving an empty space username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('  ');
  await page.getByRole('button', { name: 'Send link' }).click();
  console.log("\n")
  console.log("Testcase-8:Giving an empty space username", "\n")
  await expect(page.locator('//*[@id="root"]/div[2]/div')).toContainText(expectedresult_invalid_username3);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[2]/div').textContent());

  //Testcase-9:Giving a valid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByRole('button', { name: 'Send link' }).click();
  console.log("\n")
  console.log("Testcase-9:Giving a valid username", "\n")
  await expect(page.locator('//*[@id="root"]/div[2]/div')).toContainText(expectedresult_valid_username);
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page.locator('//*[@id="root"]/div[2]/div').textContent());

  //Scenario-3:To check a field validations for reset password page
  await page.goto('https://yopmail.com/?emptest11');
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page2Promise;

  //Testcase-10:Giving an empty space in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('    ');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('    ');
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Scenario-3:To check a field validations for reset password page")
  console.log("\n")
  console.log("Testcase-10:Giving an empty space in password and confirm password", "\n")
  await expect(page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(1) > div > div')).toContainText(expectedresult_invalid_passwordandconfirm);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(1) > div > div').textContent());

  //Testcase-11:Clicking on change password button without giving password and confirm password
  await page1.getByPlaceholder('Enter Password').clear();
  await page1.getByPlaceholder('Re enter your password').clear();
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-11:Clicking on change password button without giving password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div')).toContainText(expectedresult_invalid_password);
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_invalid_confirm);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div').textContent());
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-12:Clicking on change password button by giving a character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password');
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-12:Clicking on change password button by giving a character in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div')).toContainText(expectedresult_invalid_passwordandconfirm2);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div').textContent());

  //Testcase-13:Clicking on change password button by giving a character and special character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@');
  await page1.getByRole('button', { name: 'Change password' }).click();
  await page1.getByPlaceholder('Enter Password').click();
  console.log("\n")
  console.log("Testcase-13:Clicking on change password button by giving a character and special character in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div')).toContainText(expectedresult_invalid_passwordandconfirm3);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div').textContent());

  //Testcase-14:Clicking on change password button by giving a unmatch texts in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@567');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@5678');
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-14:Clicking on change password button by giving a unmatch texts in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_invalid_passwordandconfirm4);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-15:Clicking on change password button by giving a lower,special and numbers in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('password@567');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('password@5678');
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-15:Clicking on change password button by giving a lower,special and numbers in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div')).toContainText(expectedresult_invalid_passwordandconfirm7);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[1]/div/div').textContent());

  //Testcase-16:Clicking on change password button by giving a existing password in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill(existing_password_value);
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill(existing_password_value);
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-16:Clicking on change password button by giving a existing password in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[2]')).toContainText(expectedresult_invalid_passwordandconfirm5);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[2]').textContent());

  //Testcase-17:Clicking on change password button by giving a valid new password in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill(password_value);
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill(password_value);
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n")
  console.log("Testcase-17:Clicking on change password button by giving a valid new password in password and confirm password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[2]')).toContainText(expectedresult_invalid_passwordandconfirm6);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[2]').textContent());
  

  //Scenario-4:To check, user can able to login or not after password change
  //Testcase-18:Entering the previous password with correct username
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Scenario-4:To check, user can able to login or not after password change")
  console.log("\n")
  console.log("Testcase-18:Entering the previous password with correct username", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_valid_username_pinvalid_password);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-19:Giving a valid mail id in username field and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('emptest11@yopmail.com');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-19:Giving a valid mail id in username field and valid password", "\n")
  await expect(page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div')).toContainText(expectedresult_valid_username_pinvalid_password1);
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();
  console.log(await page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div').textContent());

  //Testcase-20:Giving a valid username and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill(password_value);
  await page1.getByRole('button', { name: 'Sign in' }).click();
  console.log("\n")
  console.log("Testcase-20:Giving a valid username and valid password", "\n")
  expect(await page1.screenshot({ fullPage: true })).toMatchSnapshot();

});