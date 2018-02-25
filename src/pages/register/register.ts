import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user.provider';
import { UserRegistrationModel } from '../../models/user-registration.model';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  params: any = {};

  constructor(
    navCtrl: NavController, 
    private menuCtrl: MenuController,
    userProvider: UserProvider) {

    this.params.data = {
      "logo": "assets/images/logo/logo.gif",
      "iconAccount": "icon-account",
      "username": "Username",
      "iconHome": "icon-home-variant",
      "iconCity": "icon-city",
      "city": "City",
      "iconWeb": "icon-web",
      "country": "Country",
      "iconLock": "icon-lock",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "iconEmail": "icon-email-outline",
      "email": "Email",
      "submit": "Next",
      "skip": "Skip"
    }

    this.params.events = {
      onRegister: function(params){
        if(params.password === params.confirmPassword){
          var registerModel = new UserRegistrationModel();
          registerModel.email = params.email;
          registerModel.password = params.password;

          userProvider.register(registerModel)
            .subscribe((res) => {
              navCtrl.setRoot(HomePage)
            });
        }
      },
      onSkip: function(params){
        navCtrl.setRoot(LoginPage)
      }
    };
  }
  
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
}