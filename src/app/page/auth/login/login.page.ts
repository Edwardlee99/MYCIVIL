import { Component} from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  ic: string;
  password: string;
  showPassword: boolean;
  
  constructor(
    private alertService: AlertService,
    private authservice: AuthService,
    private network: Network,
    public plt: Platform
  ) { }
  
  
  login() {
    if(!this.ic || !this.password){
      this.alertService.presentToast("Please fill up IC and password");
    } else if(this.network.type === 'none' && this.plt.is('cordova')){
      return this.alertService.presentToast('You are now offline.');
    }else{
      this.authservice.check_login(this.ic, this.password);
    }
  }
}