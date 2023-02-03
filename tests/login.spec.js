import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  //To open the guhroo login page
  await page.goto('https://qa.cloud.guhroo.co/login');

  //Sign in page
  var expectedresult_username = 'Please enter your username to proceed.';//Logging in without giving an username and password
  var expectedresult_password = 'Please enter your password to proceed.';//Logging in without giving an username and password
  var expectedresult_username1 = 'You have entered a invalid username';//Giving an empty space for username field
  var expectedresult_password2 = 'The password you entered is incorrect'; //Giving a valid username and invalid password
  var expectedresult_invalid_usernamepassword = 'Oops! Unable to process your request. Please check the data and try again.';//Giving a invalid username and invalid password
  //Forgot password page
  var expectedresult_invalid_username = 'Please enter your username to proceed.';//Requesting a forgot password link without giving an username
  var expectedresult_invalid_username1 = 'Invalid Username'; //Giving an invalid username
  var expectedresult_invalid_username2 = 'Invalid Username';//Giving an email in username field
  var expectedresult_invalid_username3 = 'Validation Error';//Giving an empty space username
  var expectedresult_valid_username = 'Reset string generated successfully';//Giving a valid username
  //Reset password page
  var expectedresult_invalid_passwordandconfirm = 'Validation Error';//Giving an empty space in password and confirm password
  var expectedresult_invalid_password = 'Password field is required';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_confirm = 'Password field is required';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_passwordandconfirm3 = 'Validation Error';//Clicking on change password button by giving a character and special character in password and confirm password
  //Sign in page
  var expectedresult_valid_username_pinvalid_password = 'The password you entered is incorrect';//To check, user can able to login or not after password change
  var expectedresult_valid_username_pinvalid_password1 = 'Oops! Unable to process your request. Please check the data and try again.';//Giving a valid mail id in username field and valid password


  //To check the field validations(Error messages) for login page 
  await page.getByPlaceholder('Enter username').click();
  //Logging in without giving an username and password
  await page.getByRole('button', { name: 'Sign in' }).click();
  const user_name = page.locator('text=Please enter your username to proceed.');
  const password = page.locator('text=Please enter your password to proceed.');
  var actualresult_username = await user_name.textContent();
  var actualresult_password = await password.textContent();
  if (expectedresult_username === actualresult_username && expectedresult_password === actualresult_password) {
    console.log("Expected error message of Logging in without giving an username and password scenario is shown: ", actualresult_username, ",", actualresult_password)
  }
  else {
    console.log("Expected error message of Logging in without giving an username and password scenario is not shown: ", actualresult_username, ",", actualresult_password)
  }
  //Giving an empty space for username field
  await page.getByPlaceholder('Enter username').fill('     ');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('    ');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const user_name1 = page.locator('text=You have entered a invalid username');
  var actualresult_username1 = await user_name1.textContent();
  if (expectedresult_username1 === actualresult_username1) {
    console.log("Expected error message of Giving an empty space for username field scenario is shown: ", actualresult_username1)
  }
  else {
    console.log("Expected error message of Giving an empty space for username field scenario is not shown: ", actualresult_username1)
  }

  //Giving a valid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const password2 = page.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(2) > div > div');
  var actualresult_password2 = await password2.textContent();
  if (actualresult_password2 === expectedresult_password2) {
    console.log("Expected error message of Giving a valid username and invalid password scenario is shown: ", actualresult_password2)
  }
  else {
    console.log("Expected error message of Giving a valid username and invalid password scenario is not shown: ", actualresult_password2)
  }

  //Giving a invalid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const invalid_usernamepassword = page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div');
  var actualresult_invalid_usernamepassword = await invalid_usernamepassword.textContent();
  if (actualresult_invalid_usernamepassword === expectedresult_invalid_usernamepassword) {
    console.log("Expected error message of Giving a invalid username and invalid password scenario is shown: ", actualresult_invalid_usernamepassword)
  }
  else {
    console.log("Expected error message of Giving a invalid username and invalid password scenario is not shown: ", actualresult_invalid_usernamepassword)
  }

  //To check the field validations(Error messages) for forgot password page
  await page.getByRole('link', { name: 'Forgot password ?' }).click();//forgot password page will be opened

  //Requesting a forgot password link without giving an username
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username = page.locator('text=Please enter your username to proceed.');
  var actualresult_invalid_username = await invalid_username.textContent();
  if (actualresult_invalid_username === expectedresult_invalid_username) {
    console.log("Expected error message of Requesting a forgot password link without giving an username scenario is shown: ", actualresult_invalid_username)
  }
  else {
    console.log("Expected error message of Requesting a forgot password link without giving an username scenario is not shown: ", actualresult_invalid_username)
  }

  //Giving an invalid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username1 = page.locator('text=Invalid Username');
  var actualresult_invalid_username1 = await invalid_username1.textContent();
  if (actualresult_invalid_username1 === expectedresult_invalid_username1) {
    console.log("Expected error message of Requesting a forgot password link by giving an invalid username scenario is shown: ", actualresult_invalid_username1)
  }
  else {
    console.log("Expected error message of Requesting a forgot password link by giving an invalid username scenario is not shown: ", actualresult_invalid_username1)
  }

  //Giving an email in username field
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('emptest11@YOPmail.com');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username2 = page.locator('text=Invalid Username');
  var actualresult_invalid_username2 = await invalid_username2.textContent();
  if (actualresult_invalid_username2 === expectedresult_invalid_username2) {
    console.log("Expected error message of Requesting a forgot password link by giving an valid mail in username scenario is shown: ", actualresult_invalid_username2)
  }
  else {
    console.log("Expected error message of Requesting a forgot password link by giving an valid mail in username scenario is not shown: ", actualresult_invalid_username2)
  }

  //Giving an empty space username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('  ');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username3 = page.locator('text=Validation Error');
  var actualresult_invalid_username3 = await invalid_username3.textContent();
  if (actualresult_invalid_username3 === expectedresult_invalid_username3) {
    console.log("Expected error message of Requesting a forgot password link by giving an empty space in username scenario is shown: ", actualresult_invalid_username3)
  }
  else {
    console.log("Expected error message of Requesting a forgot password link by giving an empty space in username scenario is not shown: ", actualresult_invalid_username3)
  }

  //Giving a valid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByRole('button', { name: 'Send link' }).click();
  const valid_username = page.locator('text=Reset string generated successfully');
  var actualresult_valid_username = await valid_username.textContent();
  if (actualresult_valid_username === expectedresult_valid_username) {
    console.log("Expected error message of Requesting a forgot password link by giving a valid username in username scenario is shown: ", actualresult_valid_username)
  }
  else {
    console.log("Expected error message of Requesting a forgot password link by giving a valid username in username scenario is not shown: ", actualresult_valid_username)
  }

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
  const invalid_passwordandconfirm = page1.locator('text=Validation Error');
  var actualresult_invalid_passwordandconfirm = await invalid_passwordandconfirm.textContent();
  if (actualresult_invalid_passwordandconfirm === expectedresult_invalid_passwordandconfirm) {
    console.log("Expected error message of Giving an empty space in password and confirm password scenario is shown: ", actualresult_invalid_passwordandconfirm)
  }
  else {
    console.log("Expected error message of Giving an empty space in password and confirm password scenario is not shown: ", actualresult_invalid_passwordandconfirm)
  }

  //Clicking on change password button without giving password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('');
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_password = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(1) > div > div');
  const invalid_confirm = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(2) > div > div');
  var actualresult_invalid_password = await invalid_password.textContent();
  var actualresult_invalid_confirm = await invalid_confirm.textContent();
  if (actualresult_invalid_password === expectedresult_invalid_password && actualresult_invalid_confirm === expectedresult_invalid_confirm) {
    console.log("Expected error message of Clicking on change password button without giving password and confirm password scenario is shown: ", actualresult_invalid_password, ",", actualresult_invalid_confirm)
  }
  else {
    console.log("Expected error message of Clicking on change password button without giving password and confirm password scenario is not shown: ", actualresult_invalid_password, ",", actualresult_invalid_confirm)
  }

  //Clicking on change password button by giving a character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password');
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_passwordandconfirm2 = page1.locator('text=Validation Error');
  var actualresult_invalid_passwordandconfirm2 = await invalid_passwordandconfirm2.textContent();
  var expectedresult_invalid_passwordandconfirm2 = 'Validation Error';
  if (actualresult_invalid_passwordandconfirm2 === expectedresult_invalid_passwordandconfirm2) {
    console.log("Expected error message of Clicking on change password button by giving a character in password and confirm password scenario is shown: ", actualresult_invalid_passwordandconfirm2)
  }
  else {
    console.log("Expected error message of Clicking on change password button by giving a character in password and confirm password scenario is not shown: ", actualresult_invalid_passwordandconfirm2)
  }

  //Clicking on change password button by giving a character and special character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@');
  await page1.getByRole('button', { name: 'Change password' }).click();
  await page1.getByPlaceholder('Enter Password').click();
  const invalid_passwordandconfirm3 = page1.locator('text=Validation Error');
  var actualresult_invalid_passwordandconfirm3 = await invalid_passwordandconfirm3.textContent();
  if (actualresult_invalid_passwordandconfirm3 === expectedresult_invalid_passwordandconfirm3) {
    console.log("Expected error message of Clicking on change password button by giving a character and special character in password and confirm password scenario is shown: ", actualresult_invalid_passwordandconfirm3)
  }
  else {
    console.log("Expected error message of Clicking on change password button by giving a character and special character in password and confirm password scenario is not shown: ", actualresult_invalid_passwordandconfirm3)
  }

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
  // const invalid_passwordandconfirm4= page1.locator('text=Validation Error');
  // var actualresult_invalid_passwordandconfirm4=await invalid_passwordandconfirm4.textContent();
  // var expectedresult_invalid_passwordandconfirm4= 'Your password has been changed successfully';
  // if(actualresult_invalid_passwordandconfirm4 === expectedresult_invalid_passwordandconfirm4){
  //   console.log("Clicking on change password button by giving a character, special character and number in password and confirm password: ", actualresult_invalid_passwordandconfirm4)
  // }
  // else{
  //   console.log("Clicking on change password button by giving a character, special character and number in password and confirm password: ", actualresult_invalid_passwordandconfirm4)
  // }
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  const valid_username_pinvalid_password = page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div');
  var actualresult_valid_username_pinvalid_password = await valid_username_pinvalid_password.textContent();
  if (actualresult_valid_username_pinvalid_password === expectedresult_valid_username_pinvalid_password) {
    console.log("Expected error message of Entering the previous password with correct username scenario is shown: ", actualresult_valid_username_pinvalid_password)
  }
  else {
    console.log("Expected error message of Entering the previous password with correct username scenario is not shown: ", actualresult_valid_username_pinvalid_password)
  }

  //Giving a valid mail id in username field and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('emptest11@yopmail.com');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  const valid_username_pinvalid_password1 = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(2) > div > div');
  var actualresult_valid_username_pinvalid_password1 = await valid_username_pinvalid_password1.textContent();
  if (actualresult_valid_username_pinvalid_password1 === expectedresult_valid_username_pinvalid_password1) {
    console.log("Expected error message of Giving a valid mail id in username field and valid password scenario is shown: ", actualresult_valid_username_pinvalid_password1)
  }
  else {
    console.log("Expected error message of Giving a valid mail id in username field and valid password scenario is not shown: ", actualresult_valid_username_pinvalid_password1)
  }
  //Giving a valid username and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();

});