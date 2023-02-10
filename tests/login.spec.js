import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  //To open the guhroo login page
  await page.goto('https://qa.cloud.guhroo.co/login');

  //Enter these four fields
  var password_value="Password@892";
  var confirm_password_value="Password@892";
  var existing_password_value="Password@891";
  var existing_confirm_password_value="Password@891";

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
  var expectedresult_invalid_username3 = 'The username field is required.';//Giving an empty space username
  var expectedresult_valid_username = 'Please check your inbox for further instructions';//Giving a valid username
  //Reset password page
  var expectedresult_invalid_passwordandconfirm = 'This Password Must Contain Atleast One Lower Characters';//Giving an empty space in password and confirm password
  var expectedresult_invalid_password = 'Please enter your password.';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_confirm = 'Please enter your password.';//Clicking on change password button without giving password and confirm password
  var expectedresult_invalid_passwordandconfirm2 = 'This Password must contain special characters';//Clicking on change password button by giving a charcter in password and confirm password
  var expectedresult_invalid_passwordandconfirm3 = 'This Password Must Contain Atleast One Number';//Clicking on change password button by giving a character and special character in password and confirm password
  var expectedresult_invalid_passwordandconfirm4= 'Password must be same match';//Clicking on change password button by giving a mismatch texts in password and confirm password
  var expectedresult_invalid_passwordandconfirm5= 'New password should be different from your old password';//Clicking on change password button by giving a existing password in password and confirm password
  var expectedresult_invalid_passwordandconfirm7='This Password Must Contain Atleast One Upper Characters'//Clicking on change password button by giving a character, special character and number in password and confirm password
  //Sign in page
  var expectedresult_valid_username_pinvalid_password = 'The password you entered is incorrect';//To check, user can able to login or not after password change
  var expectedresult_valid_username_pinvalid_password1 = 'Oops! Unable to process your request. Please check the data and try again.';//Giving a valid mail id in username field and valid password

  //Scenario-1:To check the field validations(Error messages) for login page 
  await page.getByPlaceholder('Enter username').click();
  //Testcase-1:Logging in without giving an username and password
  await page.getByRole('button', { name: 'Sign in' }).click();
  const user_name = page.locator('text=Please enter your username to proceed.');
  const password = page.locator('text=Please enter your password to proceed.');
  var actualresult_username = await user_name.textContent();
  var actualresult_password = await password.textContent();

  console.log("Scenario-1:To check the field validations(Error messages) for login page ", "\n")

  console.log("Testcase-1:Logging in without giving an username and password", "\n")
  if (expectedresult_username === actualresult_username && expectedresult_password === actualresult_password) {
    console.log("Expected error messages are shown: ", actualresult_username, ",", actualresult_password)
  }
  else {
    console.log("Expected error messages are not shown: ", actualresult_username, ",", actualresult_password)
  }
  //Testcase-2:Giving an empty space for username field
  await page.getByPlaceholder('Enter username').fill('     ');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('    ');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const user_name1 = page.locator('text=You have entered a invalid username');
  var actualresult_username1 = await user_name1.textContent();
  console.log("\n","Testcase-2:Giving an empty space for username field", "\n")
  if (expectedresult_username1 === actualresult_username1) {
    console.log("Expected error message is shown: ", actualresult_username1)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_username1)
  }

  //Testcase-3:Giving a valid username and invalid password
  await page.getByPlaceholder('Enter username').clear();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByPlaceholder('Enter password').clear();
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const password2 = page.locator('.toggle-password > div:nth-child(3)');
  var actualresult_password2 = await password2.textContent();

  console.log("\n","Testcase-3:Giving a valid username and invalid password", "\n")
  if (actualresult_password2 === expectedresult_password2) {
    console.log("Expected error message is shown: ", actualresult_password2)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_password2)
  }

  //Testcase-4:Giving a invalid username and invalid password
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const invalid_usernamepassword = page.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div');
  var actualresult_invalid_usernamepassword = await invalid_usernamepassword.textContent();
  console.log("\n","Testcase-4:Giving a invalid username and invalid password", "\n")
  if (actualresult_invalid_usernamepassword === expectedresult_invalid_usernamepassword) {
    console.log("Expected error message is shown: ", actualresult_invalid_usernamepassword)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_usernamepassword)
  }

  //Scenario-2:To check the field validations(Error messages) for forgot password page
  await page.getByRole('link', { name: 'Forgot password ?' }).click();//forgot password page will be opened

  //Testcase-1:Requesting a forgot password link without giving an username
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username = page.locator('text=Please enter your username to proceed.');
  var actualresult_invalid_username = await invalid_username.textContent();
  console.log("\n","Scenario-2:To check the field validations(Error messages) for forgot password page", "\n")
  console.log("Testcase-1:Requesting a forgot password link without giving an username", "\n")
  if (actualresult_invalid_username === expectedresult_invalid_username) {
    console.log("Expected error is shown: ", actualresult_invalid_username)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_username)
  }

  //Testcase-2:Giving an invalid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test8');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username1 = page.locator('text=Invalid Username');
  var actualresult_invalid_username1 = await invalid_username1.textContent();
  console.log("\n","Testcase-2:Giving an invalid username","\n")
  if (actualresult_invalid_username1 === expectedresult_invalid_username1) {
    console.log("Expected error message is shown: ", actualresult_invalid_username1)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_username1)
  }

  //Testcase-3:Giving an email in username field
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('emptest11@YOPmail.com');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username2 = page.locator('text=Invalid Username');
  var actualresult_invalid_username2 = await invalid_username2.textContent();
  console.log("\n","Testcase-3:Giving an email in username field","\n")
  if (actualresult_invalid_username2 === expectedresult_invalid_username2) {
    console.log("Expected error message is shown: ", actualresult_invalid_username2)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_username2)
  }

  //Testcase-4:Giving an empty space username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('  ');
  await page.getByRole('button', { name: 'Send link' }).click();
  const invalid_username3 = page.locator('text=The username field is required.');
  var actualresult_invalid_username3 = await invalid_username3.textContent();
  console.log("\n","Testcase-4:Giving an empty space username","\n")
  if (actualresult_invalid_username3 === expectedresult_invalid_username3) {
    console.log("Expected error message is shown: ", actualresult_invalid_username3)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_username3)
  }

  //Testcase-5:Giving a valid username
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('test7');
  await page.getByRole('button', { name: 'Send link' }).click();
  const valid_username = page.locator('text=Please check your inbox for further instructions');
  var actualresult_valid_username = await valid_username.textContent();
  console.log("\n","Testcase-5:Giving a valid username","\n")
  if (actualresult_valid_username === expectedresult_valid_username) {
    console.log("Expected error message is shown: ", actualresult_valid_username)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_valid_username)
  }

  //Scenario-3:To check a field validations for reset password page
  await page.goto('https://yopmail.com/?emptest11');
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page2Promise;

  //Testcase-1:Giving an empty space in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('    ');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('    ');
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_passwordandconfirm = page1.locator('text=This Password Must Contain Atleast One Lower Characters');
  var actualresult_invalid_passwordandconfirm = await invalid_passwordandconfirm.textContent();
  console.log("\n","Scenario-3:To check a field validations for reset password page","\n")
  console.log("Testcase-1:Giving an empty space in password and confirm password","\n")
  if (actualresult_invalid_passwordandconfirm === expectedresult_invalid_passwordandconfirm) {
    console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm)
  }

  //Testcase-2:Clicking on change password button without giving password and confirm password
  await page1.getByPlaceholder('Enter Password').clear();
  await page1.getByPlaceholder('Re enter your password').clear();
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_password = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(1) > div > div');
  const invalid_confirm = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(2) > div > div');
  var actualresult_invalid_password = await invalid_password.textContent();
  var actualresult_invalid_confirm = await invalid_confirm.textContent();
  console.log("\n","Testcase-2:Clicking on change password button without giving password and confirm password","\n")
  if (actualresult_invalid_password === expectedresult_invalid_password && actualresult_invalid_confirm === expectedresult_invalid_confirm) {
    console.log("Expected error message is shown: ", actualresult_invalid_password, ",", actualresult_invalid_confirm)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_password, ",", actualresult_invalid_confirm)
  }

  //Testcase-3:Clicking on change password button by giving a character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password');
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_passwordandconfirm2 = page1.locator('text=This Password must contain special characters');
  var actualresult_invalid_passwordandconfirm2 = await invalid_passwordandconfirm2.textContent();
  
  console.log("\n","Testcase-3:Clicking on change password button by giving a character in password and confirm password","\n")
  if (actualresult_invalid_passwordandconfirm2 === expectedresult_invalid_passwordandconfirm2) {
    console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm2)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm2)
  }

  //Testcase-4:Clicking on change password button by giving a character and special character in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@');
  await page1.getByRole('button', { name: 'Change password' }).click();
  await page1.getByPlaceholder('Enter Password').click();
  const invalid_passwordandconfirm3 = page1.locator('text=This Password Must Contain Atleast One Number');
  var actualresult_invalid_passwordandconfirm3 = await invalid_passwordandconfirm3.textContent();
  console.log("\n","Testcase-4:Clicking on change password button by giving a character and special character in password and confirm password","\n")
  if (actualresult_invalid_passwordandconfirm3 === expectedresult_invalid_passwordandconfirm3) {
    console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm3)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm3)
  }


  //Testcase-5:Clicking on change password button by giving a unmatch texts in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill('Password@567');
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill('Password@5678');
  await page1.getByRole('button', { name: 'Change password' }).click();
  const invalid_passwordandconfirm4= page1.locator('text=Password must be same match');
  var actualresult_invalid_passwordandconfirm4=await invalid_passwordandconfirm4.textContent();
  console.log("\n","Testcase-5:Clicking on change password button by giving a unmatch texts in password and confirm password","\n")
  if(actualresult_invalid_passwordandconfirm4 === expectedresult_invalid_passwordandconfirm4){
    console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm4)
  }
  else{
    console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm4)
  }

   //Testcase-6:Clicking on change password button by giving a lower,special and numbers in password and confirm password
   await page1.getByPlaceholder('Enter Password').click();
   await page1.getByPlaceholder('Enter Password').fill('password@567');
   await page1.getByPlaceholder('Re enter your password').click();
   await page1.getByPlaceholder('Re enter your password').fill('password@5678');
   await page1.getByRole('button', { name: 'Change password' }).click();
   const invalid_passwordandconfirm7= page1.locator('text=This Password Must Contain Atleast One Upper Characters');
   var actualresult_invalid_passwordandconfirm7=await invalid_passwordandconfirm7.textContent();
   console.log("\n","Testcase-6:Clicking on change password button by giving a unmatch texts in password and confirm password","\n")
   if(actualresult_invalid_passwordandconfirm7 === expectedresult_invalid_passwordandconfirm7){
     console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm7)
   }
   else{
     console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm7)
   }

  //Testcase-7:Clicking on change password button by giving a existing password in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill(existing_password_value);
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill(existing_confirm_password_value);
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n","Testcase-7:Clicking on change password button by giving a existing password in password and confirm password","\n")
  const invalid_passwordandconfirm5= page1.locator('text=New password should be different from your old password');
  var actualresult_invalid_passwordandconfirm5=await invalid_passwordandconfirm5.textContent();
  if(actualresult_invalid_passwordandconfirm5 === expectedresult_invalid_passwordandconfirm5){
    console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm5)
  }
  else{
    console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm5)
  }


 //Testcase-8:Clicking on change password button by giving a valid new password in password and confirm password
  await page1.getByPlaceholder('Enter Password').click();
  await page1.getByPlaceholder('Enter Password').fill(password_value);
  await page1.getByPlaceholder('Re enter your password').click();
  await page1.getByPlaceholder('Re enter your password').fill(confirm_password_value);
  await page1.getByRole('button', { name: 'Change password' }).click();
  console.log("\n","Testcase-8:Clicking on change password button by giving a valid new password in password and confirm password","\n")
  // const invalid_passwordandconfirm6= page1.locator('text=New password should be different from your old password');
  // var actualresult_invalid_passwordandconfirm6=await invalid_passwordandconfirm6.textContent();
  // if(actualresult_invalid_passwordandconfirm6 === expectedresult_invalid_passwordandconfirm6){
  //   console.log("Expected error message is shown: ", actualresult_invalid_passwordandconfirm6)
  // }
  // else{
  //   console.log("Expected error message is not shown: ", actualresult_invalid_passwordandconfirm6)
  // }

  //Scenario-4:To check, user can able to login or not after password change
  //Testcase-1:Entering the previous password with correct username
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  const valid_username_pinvalid_password = page1.locator('//*[@id="root"]/div[1]/div/section/div/div/div/div/div/form/div[2]/div/div');
  var actualresult_valid_username_pinvalid_password = await valid_username_pinvalid_password.textContent();
  console.log("\n","Scenario-4:To check, user can able to login or not after password change","\n")
  console.log("Testcase-1:Entering the previous password with correct username","\n")
  if (actualresult_valid_username_pinvalid_password === expectedresult_valid_username_pinvalid_password) {
    console.log("Expected error message is shown: ", actualresult_valid_username_pinvalid_password)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_valid_username_pinvalid_password)
  }

  //Testcase-2:Giving a valid mail id in username field and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('emptest11@yopmail.com');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  const valid_username_pinvalid_password1 = page1.locator('#root > div.App > div > section > div > div > div > div > div > form > div:nth-child(2) > div > div');
  var actualresult_valid_username_pinvalid_password1 = await valid_username_pinvalid_password1.textContent();
  console.log("\n","Testcase-2:Giving a valid mail id in username field and valid password","\n")
  if (actualresult_valid_username_pinvalid_password1 === expectedresult_valid_username_pinvalid_password1) {
    console.log("Expected error message is shown: ", actualresult_valid_username_pinvalid_password1)
  }
  else {
    console.log("Expected error message is not shown: ", actualresult_valid_username_pinvalid_password1)
  }
  //Testcase-3:Giving a valid username and valid password
  await page1.getByPlaceholder('Enter username').click();
  await page1.getByPlaceholder('Enter username').fill('test7');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill(password_value);
  await page1.getByRole('button', { name: 'Sign in' }).click();
  console.log("Testcase-3:Giving a valid username and valid password","\n")

});