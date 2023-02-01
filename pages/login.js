exports.loginpage=class loginpage{
     constructor(page){
     this.page=page
     this.username_login=page.getByPlaceholder('Enter username')
     this.password_login=page.getByPlaceholder('Enter password')
     this.Firstname_invite=page.getByLabel('First Name')
     this.lastname_invite=page.getByLabel('Last Name')
     this.username_invite=page.getByLabel('Username')
     this.legalname_invite=page.getByLabel('Legal Name')
     this.email_invite=page.getByLabel('Email')
    }
    async login(username, password){
        await this.username_login.fill(username);
        await this.password_login.fill(password);

    }

    async invite(Firstname, lastname, username, legalname, email){
        await this.Firstname_invite.fill(Firstname);
        await this.lastname_invite.fill(lastname);
        await this.username_invite.fill(username);
        await this.legalname_invite.fill(legalname);
        await this.email_invite.fill(email);

    }



}