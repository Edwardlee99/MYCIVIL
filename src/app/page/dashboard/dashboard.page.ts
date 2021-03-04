import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';
import { NavController,AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  username: string;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private storage: Storage,
    public alertController: AlertController,
    public authservice: AuthService,
    public plt: Platform
  
  ) {}

  ngOnInit() {
    this.storage.get('ic')
      .then((val) => {
       this.authservice.user(val).get().subscribe(doc => {
        this.username = doc.data()['name']
       })    
        
        error => console.error(error)
      });
    
  }

   // When Logout Button is pressed 
   async logout() {
     console.log(this.username);
    const alert = await this.alertController.create({
      header: 'Logout?',
      message: 'Are you sure you want to logout?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          this.alertService.presentToast("You have successfully logout your account");
          return this.navCtrl.navigateRoot('/logout');
        }
      }
    ]
    });

    await alert.present();
  }

}