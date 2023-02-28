import { test, expect, selectors } from '@playwright/test';
import { loginpage } from '../pages/login';

test('clientonboardingtest', async ({ page }) => {
  const login = new loginpage(page)
  login.login('devi', 'pass')
  login.invite('test', 'regattempttwenty', 'testregattempttwenty', 'Sunregsystemtwenty', 'testregattempttwenty@YOPmail.com')
  var mailid = 'https://yopmail.com/?testregattempttwenty';//Change the mail id here
  var expectedresult_adminname = 'test regattempttwenty';//Change the adminname/firstname,lastname here
  var expectedresult_email = 'testregattempttwenty@YOPmail.com';//Change the email id here
  var expectedresult_companyname = 'Sunregsystemtwenty';//Change the legal/company name here

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
  var expectedresult_invalidpassword1 = 'This Password must contain special characters';
  var expectedresult_invalidpassword2 = 'This Password Must Contain Atleast One Number';
  var expectedresult_invalidpassword3 = 'This Password Must Contain Atleast One Upper Characters';
  var expectedresult_invalidpassword4 = 'This Password Must Contain Atleast One Lower Characters';
  var expectedresult_street1 = 'Please enter street 1.';
  var expectedresult_city = 'Please enter your city.';
  var expectedresult_state = 'Please enter state.';
  var expectedresult_zipcode = 'Please enter your zip.';
  var expectedresult_phoneno = 'Please enter your phone number.';
  var expectedresult_zipcode1 = 'The zip should be numbers';
  var expectedresult_phoneno1 = 'The phone number should be numbers';
  var expectedresult_address_city = 'The address1 field is required. The city field is required.';
  var expectedresult_zipcode2='The zip should be 5 digits'
  var expectedresult_address1='The street name should be 5 to 250 characters long'
  var expectedresult_city1='The city name should be 4 to 20 characters long'
  var expectedresult_phoneno2='Please provide a valid phone number'
  var expectedresult_city2='The city name should be alphabets'
  // var expectedresult_invalidpassword = 'Validation Error';

  // await page.goto('https://qa.cloud.guhroo.co/login');

  // await page.getByPlaceholder('Enter username').click();
  // await page.getByPlaceholder('Enter password').click();
  // await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.getByRole('link', { name: ' Invite Client' }).click();

  // // Scenario-1:Inviting a client to fill onboard form 
  // console.log("Scenario-1:Inviting a client to fill onboard form", "\n")
  // await page.getByLabel('First Name').click();
  // await page.getByLabel('Last Name').click();
  // await page.getByLabel('Username').click();
  // await page.getByLabel('Email').click();
  // await page.getByLabel('Legal Name').click();
  // // await page.getByLabel('Logo').click();
  // // await page.getByLabel('Logo').setInputFiles('C:\Users\Hp\Downloads\istockphoto-517188688-612x612.jpg');
  // await page.getByRole('button', { name: 'Invite' }).click();
  // await page.getByText('LOGOUT').click();

  //Opening a invited user mail to check the invite is recieved
  await page.goto(mailid);
  await page.goto('https://yopmail.com/');
  await page.goto('https://yopmail.com/wm');
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Click here' }).click();
  const page1 = await page1Promise;
  
  // Scenario-2:To check field validations of account creation page
  // Testcase-1:To check admin name is disabled or not and to compare the text which is populated 
  await expect(page1.locator('#admin')).toBeDisabled();
  const admin_name = page1.locator("#admin");
  var actualresult_adminname = await admin_name.getAttribute("value");
  console.log("\n", "Scenario-2:To check field validations of account creation page", "\n")
  console.log("\n", "Testcase-1:To check admin name is disabled or not and to compare the text which is populated", "\n")

  if (expectedresult_adminname === actualresult_adminname) {
    console.log("Expected value is shown: ", actualresult_adminname)
  }
  else {
    console.log("Expected value is not shown: ", actualresult_adminname)
  }

  // Testcase-2:To check email is disabled or not and to compare the text which is populated 
  await expect(page1.getByPlaceholder('Enter email')).toBeDisabled();
  const email = page1.getByPlaceholder('Enter email');
  var actualresult_email = await email.getAttribute("value");
  console.log("\n", "Testcase-2:To check email is disabled or not and to compare the text which is populated", "\n")

  if (expectedresult_email === actualresult_email) {
    console.log("Expected value is shown: ", actualresult_email)
  }
  else {
    console.log("Expected value is not shown: ", actualresult_email)
  }

  // Testcase-3:To compare the text which is populated in the companyname
  await expect(page1.getByPlaceholder('Enter company name')).toBeEnabled();
  const companyname = page1.getByPlaceholder('Enter company name');
  var actualresult_companyname = await companyname.getAttribute("value");

  console.log("\n", "Testcase-3:To compare the text which is populated in the companyname", "\n")

  if (expectedresult_companyname === actualresult_companyname) {
    console.log("Expected value is shown: ", actualresult_companyname)
  }
  else {
    console.log("Expected value is not shown: ", actualresult_companyname)
  }

  // Testcase-4:To check the field validation while mandatory fields are not entered
  await page1.getByPlaceholder('Enter company name').click();
  await page1.getByPlaceholder('Enter company name').clear();
  await page1.getByRole('button', { name: 'Create account' }).click();
  const company_name = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const password = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  const confirm_password = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(2) > div > div');
  var actualresult_company_name = await company_name.textContent();
  var actualresult_password = await password.textContent();
  var actualresult_confirm_password = await confirm_password.textContent();

  console.log("\n", "Testcase-4:To check the field validation while mandatory fields are not entered", "\n")

  if (actualresult_company_name === expectedresult_company_name && expectedresult_password === actualresult_password && actualresult_confirm_password === expectedresult_confirm_password) {
    console.log("Error messages are shown: ", actualresult_company_name, ",", actualresult_password, ",", actualresult_confirm_password)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_company_name, ",", actualresult_password, ",", actualresult_confirm_password)
  }

  //Testcase-5:To check field/error validations are shown while max character limit is exceeded
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

  console.log("\n", "Testcase-5:To check field/error validations are shown while max character limit is exceeded", "\n")

  if (actualresult_company_name1 === expectedresult_company_name && expectedresult_password === actualresult_password && actualresult_confirm_password === expectedresult_confirm_password && actualresult_trade_name === expectedresult_trade_name && actualresult_employerid === expectedresult_employerid) {
    console.log("Error messages are shown: ", actualresult_company_name1, ',', actualresult_trade_name, ',', actualresult_employerid)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_company_name1, ',', actualresult_trade_name, ',', actualresult_employerid)
  }

  var companyname_text_length = await page1.getByPlaceholder('Enter company name').getAttribute("value");
  console.log("Total character no of companyname(max count): ", companyname_text_length.length);

  var tradename_text_length = await page1.getByPlaceholder('Enter trade name').getAttribute("value");
  console.log("Total character no of tradename(max count): ", tradename_text_length.length);

  var employerid_text_length = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log("Total character no of employerid(max count): ", employerid_text_length.length);

  //Testcase-6:To check field/error validations are shown while min character limit is exceeded
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

  console.log("\n", "Testcase-6:To check field/error validations are shown while min character limit is exceeded", "\n")

  if (actualresult_company_name2 === expectedresult_company_name1 && actualresult_password1 === expectedresult_password1 && actualresult_trade_name1 === expectedresult_trade_name && actualresult_employerid1 === expectedresult_employerid) {
    console.log("Error messages are shown: ", actualresult_company_name2, ",", actualresult_password1, ',', actualresult_trade_name1, ',', actualresult_employerid1)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_company_name2, ",", actualresult_password1, ',', actualresult_trade_name1, ',', actualresult_employerid1)
  }
  var companyname_text_length = await page1.getByPlaceholder('Enter company name').getAttribute("value");

  console.log("Total character no of companyname(min count): ", companyname_text_length.length);

  var tradename_text_length = await page1.getByPlaceholder('Enter trade name').getAttribute("value");

  console.log("Total character no of tradename(min count): ", tradename_text_length.length);

  var employerid_text_length = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log("Total character no of employerid(min count): ", employerid_text_length.length);

  var password_text_length = await page1.getByPlaceholder('Enter password').getAttribute("value")
  console.log("Total character no of password(min count): ", password_text_length.length);

  //Testcase-7:To check field/error validations are shown while unsupported character/number are entered
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

  console.log("\n", "Testcase-7:To check field/error validations are shown while unsupported character/number are entered", "\n")

  if (actualresult_company_name3 === expectedresult_company_name2 && actualresult_trade_name2 === expectedresult_trade_name2 && actualresult_employerid2 === expectedresult_employerid2) {
    console.log("Error messages are shown: ", actualresult_company_name3, ",", actualresult_trade_name2, ',', actualresult_employerid2)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_company_name3, ",", actualresult_trade_name2, ',', actualresult_employerid2)
  }

  //Testcase-8:To check field/error validations are shown while valid password format is not entered in password and confirm password
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
  const invalidpassword = page.locator('text=This Password must contain special characters');
  var actualresult_invalidpassword = await invalidpassword.textContent();
  console.log("\n", "Testcase-8:To check field/error validations are shown while valid password format is not entered in password and confirm password", "\n")
  if (actualresult_invalidpassword === expectedresult_invalidpassword1) {
    console.log("Error message is shown: ", actualresult_invalidpassword)

  }
  else {
    console.log("Error message is not shown: ", actualresult_invalidpassword)
  }

  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('Password&');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('Password&');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const invalidpassword1 = page.locator('text=This Password Must Contain Atleast One Number');
  var actualresult_invalidpassword1 = await invalidpassword1.textContent();


  if (actualresult_invalidpassword1 === expectedresult_invalidpassword2) {
    console.log("Error message is shown: ", actualresult_invalidpassword1)

  }
  else {
    console.log("Error message is not shown: ", actualresult_invalidpassword1)
  }

  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('password&567');
  await page1.getByPlaceholder('Enter confirm password').click();
  await page1.getByPlaceholder('Enter confirm password').fill('password&567');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const invalidpassword2 = page.locator('text=This Password Must Contain Atleast One Upper Characters');
  var actualresult_invalidpassword2 = await invalidpassword2.textContent();

  if (actualresult_invalidpassword2 === expectedresult_invalidpassword3) {
    console.log("Error messages is shown: ", actualresult_invalidpassword2)

  }
  else {
    console.log("Error message is not shown: ", actualresult_invalidpassword2)
  }

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
    console.log("Error messages are shown: ", actualresult_confirm_password1)

  }
  else {
    console.log("Error messages are not shown: ", actualresult_confirm_password1)
  }

  //Testcase-9:To check field/error validations are shown while boundary values are entered in employer id no
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('56678907');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const employerid3 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');

  var actualresult_employerid3 = await employerid3.textContent();

  console.log("\n", "Testcase-9:To check field/error validations are shown while boundary values are entered in employer id no", "\n")

  if (expectedresult_employerid === actualresult_employerid3) {
    console.log("Error messages are shown: ", actualresult_employerid3)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_employerid3)
  }

  var employerid_text_length1 = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log(employerid_text_length1.length);

  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('5667890767');
  await page1.getByRole('button', { name: 'Create account' }).click();

  const employerid4 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');

  var actualresult_employerid3 = await employerid4.textContent();

  if (expectedresult_employerid === actualresult_employerid3) {
    console.log("Error messages are shown: ", actualresult_employerid3)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_employerid3)
  }

  var employerid_text_length2 = await page1.getByPlaceholder('Enter employer id number').getAttribute("value");
  console.log(employerid_text_length2.length);
  //Testcase-10:To check field/error validations are shown while empty paces are given in companyname, employee id no and Password fields
  await page1.getByPlaceholder('Enter employer id number').click();
  await page1.getByPlaceholder('Enter employer id number').fill('    ');
  await page1.getByPlaceholder('Enter password').click();
  await page1.getByPlaceholder('Enter password').fill('     ');
  // await page1.getByPlaceholder('Enter company name').click();
  // await page1.getByPlaceholder('Enter company name').fill('     ');

  const employerid5 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(3) > div > div');
  var actualresult_employerid4 = await employerid5.textContent();

  const password3 = page1.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  var actualresult_password3 = await password3.textContent();

  console.log("\n", "Testcase-10:To check field/error validations are shown while empty paces are given in companyname, employee id no and Password fields", "\n")
  if (expectedresult_employerid2 === actualresult_employerid4 && actualresult_password3 === expectedresult_invalidpassword4) {
    console.log("Error messages are shown: ", actualresult_employerid4, actualresult_password3)
  }
  else {
    console.log("Error messages are not shown: ", actualresult_employerid4, actualresult_password3)
  }

  //Testcase-11:To check account is created or not after entering all fields
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
  console.log("\n", "Testcase-11:To check account is created or not after entering all fields", "\n")

  // Scenario-3:To check field validations of add address page
  // Testcase-12:To check the field validation while mandatory fields are not entered
  await page1.getByRole('button', { name: 'Save & Continue' }).click();
  const address = page1.locator('#react-aria506204458-1-tabpane-add_address > div > form > div:nth-child(1) > div:nth-child(1) > div > div');
  const city = page1.locator('#react-aria506204458-1-tabpane-add_address > div > form > div:nth-child(1) > div:nth-child(3) > div > div');
  const state = page1.locator('#react-aria506204458-1-tabpane-add_address > div > form > div:nth-child(2) > div:nth-child(1) > div > div.err-feedback');
  const zipcode = page1.locator('#react-aria506204458-1-tabpane-add_address > div > form > div:nth-child(2) > div:nth-child(2) > div > div');
  const phoneno = page1.locator('#react-aria506204458-1-tabpane-add_address > div > form > div:nth-child(2) > div:nth-child(3) > div > div > div');
  var actualresult_street1 = await address.textContent();
  var actualresult_city = await city.textContent();
  var actualresult_state = await state.textContent();
  var actualresult_zipcode = await zipcode.textContent();
  var actualresult_phoneno = await phoneno.textContent();
  console.log("\n", "Scenario-3:To check field validations of add address page", "\n")
  console.log("\n", "Testcase-12:To check the field validation while mandatory fields are not entered", "\n")
  if (actualresult_street1 === expectedresult_street1 && actualresult_city === expectedresult_city && actualresult_state === expectedresult_state && actualresult_zipcode === expectedresult_zipcode && actualresult_phoneno === expectedresult_phoneno) {
    console.log("Error messages are shown", actualresult_street1, actualresult_city, actualresult_state, actualresult_zipcode, actualresult_phoneno)
  }

  else {
    console.log("Error messages are not shown", actualresult_street1, actualresult_city, actualresult_state, actualresult_zipcode, actualresult_phoneno)
  }

  // Testcase-13:To check the field validation while blank space is entered
  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('      ');
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill('     ');
  const zipcode1 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[2]/div/div');
  const phoneno1 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[3]/div/div/div');
  var actualresult_zipcode1 = await zipcode1.textContent();
  var actualresult_phoneno1 = await phoneno1.textContent();
  console.log("\n","Testcase-13:To check the field validation while blank space is entered","\n")
  if (actualresult_zipcode1 === expectedresult_zipcode1 && actualresult_phoneno1 === expectedresult_phoneno1) {
    console.log("Error messages are shown", actualresult_zipcode1, actualresult_phoneno1)
  }
  else{
    console.log("Error messages are not shown", actualresult_zipcode1, actualresult_phoneno1)
  }

  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('12345');
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill('1234567890');
  await page1.getByRole('textbox', { name: 'Street 1' }).click();
  await page1.getByRole('textbox', { name: 'Street 1' }).fill('          ');
  await page1.getByLabel('City').click();
  await page1.getByLabel('City').fill('               ');
  await page1.locator('.css-ackcql').first().click();
  await page1.getByText('KS', { exact: true }).click();
  expectedresult_address_city
  const address_city = page1.locator('text=The address1 field is required. The city field is required.');
  var actualresult_address_city = await address_city.textContent();

  if (actualresult_address_city === expectedresult_address_city ) {
    console.log("Error message is shown", actualresult_address_city)
  }
  else{
    console.log("Error message is not shown", actualresult_address_city)
  }

  // Testcase-14:To check the field validation while max character limit is entered
  console.log("\n","Testcase-14:To check the field validation while max character limit is entered","\n")
  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('123456');
  var entered_phoneno='1234567890'
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill(entered_phoneno);
  var entered_street_character_count='No.78, Alabama, US No.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama, USNo.78, Alabama,t'
  await page1.getByRole('textbox', { name: 'Street 1' }).click();
  await page1.getByRole('textbox', { name: 'Street 1' }).fill(entered_street_character_count);
  var entered_city_character_count='abcdefghijklmnopqrstu'
  await page1.getByLabel('City').click();
  await page1.getByLabel('City').fill(entered_city_character_count);
  console.log("Entered character count of address field",entered_street_character_count.length)
  console.log("Entered character count of city field",entered_city_character_count.length)
  console.log("Entered character count of phoneno field",entered_phoneno.length)
  const zipcode2 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[2]/div/div');
  var actualresult_zipcode2 = await zipcode2.textContent();
  const phoneno2 = page1.locator('//*[@id="phone_number"]');
  var actualresult_phoneno2 = await phoneno2.getAttribute("value");
  const city1 = page1.locator('//*[@id="city"]');
  var actualresult_city1 = await city1.getAttribute("value");
  const address1 = page1.locator('//*[@id="address1"]');
  var actualresult_address1 = await address1.getAttribute("value");
  if(expectedresult_zipcode2===actualresult_zipcode2){
    console.log("Error message is shown", actualresult_zipcode2)
  }
  else{
    console.log("Error message is not shown", actualresult_zipcode2)
  }

  console.log("Actual character count of phone no field", actualresult_phoneno2.length)
  console.log("Actual character count of city field", actualresult_city1.length)
  console.log("Actual character count of address field", actualresult_address1.length)

  // Testcase-15:To check the field validation while min character limit is entered
  console.log("\n","Testcase-15:To check the field validation while min character limit is entered","\n")
  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('6789');
  var entered_phoneno1='123456789'
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill(entered_phoneno1);
  var entered_street_character_count1='No.7'
  await page1.getByRole('textbox', { name: 'Street 1' }).click();
  await page1.getByRole('textbox', { name: 'Street 1' }).fill(entered_street_character_count1);
  var entered_city_character_count1='abc'
  await page1.getByLabel('City').click();
  await page1.getByLabel('City').fill(entered_city_character_count);
  console.log("Entered character count of address field",entered_street_character_count1.length)
  console.log("Entered character count of city field",entered_city_character_count1.length)
  console.log("Entered character count of phoneno field",entered_phoneno1.length)
  const zipcode3 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[2]/div/div');
  var actualresult_zipcode3 = await zipcode3.textContent();
  const phoneno3 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[3]/div/div/div');
  var actualresult_phoneno3 = await phoneno3.getAttribute("value");
  const city2 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[1]/div[3]/div/div');
  var actualresult_city2 = await city2.getAttribute("value");
  const address2 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[1]/div[1]/div/div');
  var actualresult_address2 = await address2.getAttribute("value");
  if(expectedresult_zipcode2===actualresult_zipcode3 && actualresult_phoneno3===expectedresult_phoneno2 &&actualresult_city2===expectedresult_city1 &&actualresult_address2===expectedresult_address1){
    console.log("Error messages are shown", actualresult_zipcode3,actualresult_phoneno3, actualresult_city2, actualresult_address2)
  }
  else{
    console.log("Error messages are not shown", actualresult_zipcode3,actualresult_phoneno3, actualresult_city2, actualresult_address2 )
  }

  // Testcase-16:To check the field validation while unsupported character is entered
  console.log("\n","Testcase-16:To check the field validation while unsupported character is entered","\n")
  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('test');
  await page1.getByLabel('City').click();
  await page1.getByLabel('City').fill('67@%^&');
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill('test');
  const zipcode4 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[2]/div/div');
  var actualresult_zipcode4 = await zipcode4.textContent();
  const city3 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[1]/div[3]/div/div');
  var actualresult_city3 = await city3.textContent();
  const phoneno4 = page1.locator('//*[@id="react-aria506204458-1-tabpane-add_address"]/div/form/div[2]/div[3]/div/div/div');
  var actualresult_phoneno4 = await phoneno4.textContent();
  if(expectedresult_zipcode1===actualresult_zipcode4 && actualresult_phoneno4===expectedresult_phoneno1 &&actualresult_city3===expectedresult_city2){
    console.log("Error messages are shown", actualresult_zipcode4,actualresult_phoneno4, actualresult_city3)
  }
  else{
    console.log("Error messages are not shown", actualresult_zipcode4,actualresult_phoneno4, actualresult_city3)
  }

  // Testcase-17:To check if user allowed to save and continue to next federal tax step after providing a valid details
  console.log("\n","Testcase-17:To check if user allowed to save and continue to next federal tax step after providing a valid details","\n")
  await page1.getByRole('textbox', { name: 'Street 1' }).click();
  await page1.getByRole('textbox', { name: 'Street 1' }).fill('No.87, Alabama, USA');
  await page1.getByLabel('Zip Code').click();
  await page1.getByLabel('Zip Code').fill('12345');
  await page1.getByLabel('City').click();
  await page1.getByLabel('City').fill('Alabama, US');
  await page1.getByLabel('Phone number').click();
  await page1.getByLabel('Phone number').fill('4567898765');
  await page.getByLabel('Mailing address (Optional)').check();
  await page.locator('input[name="filing_address"]').check();
  await page.getByRole('button', { name: 'Save & Continue' }).click();


})