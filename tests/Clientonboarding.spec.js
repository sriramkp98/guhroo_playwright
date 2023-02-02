import { test, expect, selectors } from '@playwright/test';
import { loginpage } from '../pages/login';

test('clientonboardingtest', async ({ page }) => {
  const login = new loginpage(page)
  login.login('devi', 'pass')
  login.invite('test', 'regattemptnine', 'testregattemptnine', 'Sunregsystemnine', 'testregattemptnine@YOPmail.com')
  var mailid='https://yopmail.com/?testregattemptnine';//Change the mail id here
  var expectedresult_adminname = 'test regattemptnine';//Change the adminname/firstname,lastname here
  var expectedresult_email = 'testregattemptnine@YOPmail.com';//Change the email id here
  var expectedresult_companyname = 'Sunregsystemnine';//Change the legal/company name here


  await page.goto('https://qa.cloud.guhroo.co/login');

  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter password').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.getByRole('link', { name: ' Invite Client' }).click();

  // // Inviting a client to fill onboard form
  // await page.getByLabel('First Name').click();
  // await page.getByLabel('Last Name').click();
  // await page.getByLabel('Username').click();
  // await page.getByLabel('Email').click();
  // await page.getByLabel('Legal Name').click();
  // // await page.getByLabel('Logo').click();
  // // await page.getByLabel('Logo').setInputFiles('istockphoto-517188688-612x612.jpg');
  // await page.getByRole('button', { name: 'Invite' }).click();
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

  var actualresult_adminname=await admin_name.getAttribute("value");

  if(expectedresult_adminname === actualresult_adminname){
    console.log("Expected value of admin name is shown ", actualresult_adminname)
  }
  else{
    console.log("Expected value of admin name is not shown ", actualresult_adminname)
  }

  // To check email is disabled or not and to compare the text which is populated 
  await expect(page1.getByPlaceholder('Enter email')).toBeDisabled();
  const email = page1.getByPlaceholder('Enter email');
  var actualresult_email=await email.getAttribute("value");
  
  if(expectedresult_email === actualresult_email){
    console.log("Expected value of companyname is shown ", actualresult_email)
  }
  else{
    console.log("Expected value of companyname is not shown ", actualresult_email)
  }

  // To compare the text which is populated in the companyname
  await expect(page1.getByPlaceholder('Enter company name')).toBeEnabled();
  const companyname = page1.getByPlaceholder('Enter company name');
  var actualresult_companyname=await companyname.getAttribute("value");
  if(expectedresult_companyname === actualresult_companyname){
    console.log("Expected value of email is shown ", actualresult_companyname)
  }
  else{
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
  const company_name= page.locator('#root > div.App > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div');
  const password= page.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(1) > div > div');
  const confirm_password= page.locator('#root > div.App > div > div > div > form > div:nth-child(3) > div:nth-child(2) > div > div');
  var actualresult_company_name=await company_name.textContent();
  var actualresult_password=await password.textContent();
  var actualresult_confirm_password=await confirm_password.textContent();

  var expectedresult_company_name = 'Please enter your company name.';
  var expectedresult_password = 'Please enter your password.';
  var expectedresult_confirm_password = 'Please enter your password.';

  if(actualresult_company_name === expectedresult_company_name && expectedresult_password===actualresult_password && actualresult_confirm_password===expectedresult_confirm_password){
    console.log("To check the field validation while mandatory fields are not entered: ", actualresult_company_name, "," , actualresult_password, "," ,actualresult_confirm_password)
  }
  else{
    console.log("To check the field validation while mandatory fields are not entered: ", actualresult_company_name, "," , actualresult_password, "," ,actualresult_confirm_password)
  }



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