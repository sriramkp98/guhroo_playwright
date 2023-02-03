import { test, expect, selectors } from '@playwright/test';
import { loginpage } from '../pages/login';

test('clientonboardingtest', async ({ page }) => {
  const login = new loginpage(page)
  login.login('devi', 'pass')
  login.invite('test', 'regattemptfifteen', 'testregattemptfifteen', 'Sunregsystemfifteen', 'testregattemptfifteen@YOPmail.com')
  var mailid = 'https://yopmail.com/?testregattemptfifteen';//Change the mail id here
  var expectedresult_adminname = 'test regattemptfifteen';//Change the adminname/firstname,lastname here
  var expectedresult_email = 'testregattemptfifteen@YOPmail.com';//Change the email id here
  var expectedresult_companyname = 'Sunregsystemfifteen';//Change the legal/company name here

  //Account creation page error messages
  var expectedresult_company_name = 'Please enter your company name.';
  var expectedresult_password = 'Please enter your password.';
  var expectedresult_confirm_password = 'Please enter your password.';
  var expectedresult_confirm_password1 = 'Password must be same match';
  var expectedresult_trade_name = 'The trade name should be 4 to 100 characters long';
  var expectedresult_employerid = 'The employee number should be 9 characters';
  var expectedresult_password1 = 'This password must be atleast 8 characters long';
  var expectedresult_company_name1 = 'The legal name should be 4 to 100 characters long';
  var expectedresult_company_name2 = 'The legal name should be alphabets';
  var expectedresult_trade_name2 = 'The trade name should be alphabets';
  var expectedresult_employerid2 = 'The employee number should be numbers';
  // var expectedresult_invalidpassword = 'Validation Error';

  await page.goto('https://qa.cloud.guhroo.co/login');

  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter password').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: ' Invite Client' }).click();

  // Inviting a client to fill onboard form
  await page.getByLabel('First Name').click();
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Legal Name').click();
  // await page.getByLabel('Logo').click();
  // await page.getByLabel('Logo').setInputFiles('istockphoto-517188688-612x612.jpg');
  await page.getByRole('button', { name: 'Invite' }).click();
  await page.getByText('LOGOUT').click();

  //Opening a invited user mail to check the invite is recieved
  await page.goto(mailid);
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page1Promise;

  // To check admin name is disabled or not and to compare the text which is populated 
  await expect(page1.locator('#admin')).toBeDisabled();
  const admin_name = page1.locator("#admin");
  var actualresult_adminname = await admin_name.getAttribute("value");
  if (expectedresult_adminname === actualresult_adminname) {
    console.log("Expected value of admin name is shown ", actualresult_adminname)
  }
  else {
    console.log("Expected value of admin name is not shown ", actualresult_adminname)
  }

  // To check email is disabled or not and to compare the text which is populated 
  await expect(page1.getByPlaceholder('Enter email')).toBeDisabled();
  const email = page1.getByPlaceholder('Enter email');
  var actualresult_email = await email.getAttribute("value");
  if (expectedresult_email === actualresult_email) {
    console.log("Expected value of companyname is shown ", actualresult_email)
  }
  else {
    console.log("Expected value of companyname is not shown ", actualresult_email)
  }

  // To compare the text which is populated in the companyname
  await expect(page1.getByPlaceholder('Enter company name')).toBeEnabled();
  const companyname = page1.getByPlaceholder('Enter company name');
  var actualresult_companyname = await companyname.getAttribute("value");
  if (expectedresult_companyname === actualresult_companyname) {
    console.log("Expected value of email is shown ", actualresult_companyname)
  }
  else {
    console.log("Expected value of email is not shown ", actualresult_companyname)
  }

  // To check the field validation while mandatory fields are not entered
  await page1.getByPlaceholder('Enter trade name').click();//Not a mandatory field, field validations will not be shown
  await page1.getByPlaceholder('Enter trade name').fill('');
  await page1.getByPlaceholder('Enter employer id number').click();//Not a mandatory field, field validations will not be shown
  await page1.getByPlaceholder('Enter employer id number').fill('');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').clear();
  await page1.getByRole('button', { name: 'Create account' }).click();
  const company_name = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const password = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  const confirm_password = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(2) > div > div');
  var actualresult_company_name = await company_name.textContent();
  var actualresult_password = await password.textContent();
  var actualresult_confirm_password = await confirm_password.textContent();
  if (actualresult_company_name === expectedresult_company_name && expectedresult_password === actualresult_password && actualresult_confirm_password === expectedresult_confirm_password) {
    console.log("Error messages for To check the field validation while mandatory fields are not entered scenario is shown: ", actualresult_company_name, ",", actualresult_password, ",", actualresult_confirm_password)
  }
  else {
    console.log("Error messages for To check the field validation while mandatory fields are not entered scenario is not shown: ", actualresult_company_name, ",", actualresult_password, ",", actualresult_confirm_password)
  }

  //To check field/error validations are shown while max character limit is exceeded
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('Democracies are under stress but they are not about to buckle The erosion of norms and other woes do not spell democratic collapse With incredibly few exceptions affluent democracies will endure no matter the schemes of would be autocrats');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('56636643636');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('Democracies are under stress but they are not about to buckle The erosion of norms and other woes do not spell democratic collapse With incredibly few exceptions affluent democracies will endure no matter the schemes of would be autocrats');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const company_name1 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const trade_name = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div > div');
  const employerid = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  var actualresult_company_name1 = await company_name1.textContent();
  var actualresult_trade_name = await trade_name.textContent();
  var actualresult_employerid = await employerid.textContent();
  if (actualresult_company_name1 === expectedresult_company_name && expectedresult_password === actualresult_password && actualresult_confirm_password === expectedresult_confirm_password && actualresult_trade_name === expectedresult_trade_name && actualresult_employerid === expectedresult_employerid) {
    console.log("Error messages for To check field/error validations are shown while max character limit is exceeded scenario is shown: ", actualresult_company_name1, ',', actualresult_trade_name, ',', actualresult_employerid)
  }
  else {
    console.log("Error messages for To check field/error validations are shown while max character limit is exceeded scenario is not shown: ", actualresult_company_name1, ',', actualresult_trade_name, ',', actualresult_employerid)
  }

  var companyname_text_length = await page1.getByPlaceholder('Enter company name').getAttribute("value");
  console.log("Total character no of companyname(max count): ", companyname_text_length.length);

  var tradename_text_length = await page1.getByPlaceholder('Enter trade name').getAttribute("value");
  console.log("Total character no of tradename(max count): ", tradename_text_length.length);

  var employerid_text_length = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log("Total character no of employerid(max count): ", employerid_text_length.length);

  //To check field/error validations are shown while min character limit is exceeded
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('Der');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('5667890');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('tgr');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Pass');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Pass');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const company_name2 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const password1 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  const trade_name1 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div > div');
  const employerid1 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  
  var actualresult_company_name2 = await company_name2.textContent();
  var actualresult_password1 = await password1.textContent();
  var actualresult_trade_name1 = await trade_name1.textContent();
  var actualresult_employerid1 = await employerid1.textContent();


  if (actualresult_company_name2 === expectedresult_company_name1 && actualresult_password1 === expectedresult_password1 && actualresult_trade_name1 === expectedresult_trade_name && actualresult_employerid1 === expectedresult_employerid) {
    console.log("Error messages for To check field/error validations are shown while min character limit is exceeded scenario is shown: ", actualresult_company_name2, ",", actualresult_password1, ',', actualresult_trade_name1, ',', actualresult_employerid1)
  }
  else {
    console.log("Error messages for To check field/error validations are shown while min character limit is exceeded scenario is not shown: ", actualresult_company_name2, ",", actualresult_password1, ',', actualresult_trade_name1, ',', actualresult_employerid1)
  }
  var companyname_text_length = await page1.getByPlaceholder('Enter company name').getAttribute("value");

  console.log("Total character no of companyname(min count): ", companyname_text_length.length);

  var tradename_text_length = await page1.getByPlaceholder('Enter trade name').getAttribute("value");

  console.log("Total character no of tradename(min count): ", tradename_text_length.length);

  var employerid_text_length = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log("Total character no of employerid(min count): ", employerid_text_length.length);

  var password_text_length = await page1.getByPlaceholder('Enter password').getAttribute("value")
  console.log("Total character no of password(min count): ", password_text_length.length);

  //To check field/error validations are shown while unsupported character/number are entered
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('Der@$123');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('5667890@$edd');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill('tgr@$123');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const company_name3 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const trade_name2 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div > div');
  const employerid2 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  
  var actualresult_company_name3 = await company_name3.textContent();
  var actualresult_trade_name2 = await trade_name2.textContent();
  var actualresult_employerid2 = await employerid2.textContent();



  if (actualresult_company_name3 === expectedresult_company_name2 && actualresult_trade_name2 === expectedresult_trade_name2 && actualresult_employerid2 === expectedresult_employerid2) {
    console.log("Error messages for To check field/error validations are shown while min character limit is exceeded scenario is shown: ", actualresult_company_name3, ",", actualresult_trade_name2, ',', actualresult_employerid2)
  }
  else {
    console.log("Error messages for To check field/error validations are shown while min character limit is exceeded scenario is not shown: ", actualresult_company_name3, ",", actualresult_trade_name2, ',', actualresult_employerid2)
  }

  //To check field/error validations are shown while valid password format is not entered in password and confirm password
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('trader');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('234567896');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill(expectedresult_companyname);
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password');
  await page1.getByRole('button', { name: 'Create account' }).click();
  // const invalidpassword = page.locator('4sui14f');
  // var actualresult_invalidpassword = await invalidpassword.textContent();

  // if (actualresult_invalidpassword === expectedresult_invalidpassword) {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is shown: ", actualresult_invalidpassword)

  // }
  // else {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is not shown: ", actualresult_invalidpassword)
  // }

  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password&');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password&');
  await page1.getByRole('button', { name: 'Create account' }).click();

  // if (actualresult_invalidpassword === expectedresult_invalidpassword) {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is shown: ", actualresult_invalidpassword)

  // }
  // else {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is not shown: ", actualresult_invalidpassword)
  // }

  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('password&567');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('password&567');
  await page1.getByRole('button', { name: 'Create account' }).click();

  // if (actualresult_invalidpassword === expectedresult_invalidpassword) {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is shown: ", actualresult_invalidpassword)

  // }
  // else {
  //   console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is not shown: ", actualresult_invalidpassword)
  // }

  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password&56');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password&5');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const password2 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  const confirm_password1 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(2) > div > div');
  var actualresult_password2 = await password2.textContent();
  var actualresult_confirm_password1 = await confirm_password1.textContent();

  if (actualresult_confirm_password1 === expectedresult_confirm_password1) {
    console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is shown: ", actualresult_confirm_password1)

  }
  else {
    console.log("Error messages for To check field/error validations are shown while valid password format is not entered in password and confirm password scenario is not shown: ", actualresult_confirm_password1)
  }

  //To check field/error validations are shown while boundary values are entered in employer id no
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('56678907');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const employerid3 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  
  var actualresult_employerid3 = await employerid3.textContent();

  if (expectedresult_employerid === actualresult_employerid3) {
    console.log("Error messages for To check field/error validations are shown while boundary values are entered in employer id no scenario is shown: ", actualresult_employerid3)
  }
  else {
    console.log("Error messages for To check field/error validations are shown while boundary values are entered in employer id no scenario is not shown: ", actualresult_employerid3)
  }

  var employerid_text_length1 = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log(employerid_text_length1.length);

  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('5667890767');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const employerid4 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  
  var actualresult_employerid3 = await employerid4.textContent();

  if (expectedresult_employerid === actualresult_employerid3) {
    console.log("Error messages for To check field/error validations are shown while boundary values are entered in employer id no scenario is shown: ", actualresult_employerid3)
  }
  else {
    console.log("Error messages for To check field/error validations are shown while boundary values are entered in employer id no scenario is not shown: ", actualresult_employerid3)
  }

  var employerid_text_length2 = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log(employerid_text_length2.length);

  //To check account is created or not after entering all fields
  await page1.getByPlaceholder('Enter trade name').click();
  await page1.getByPlaceholder('Enter trade name').fill('trader');
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('234567896');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password@567');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password@567');
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').fill(expectedresult_companyname);
  await page1.getByRole('button', { name: 'Create account' }).click();
  

})