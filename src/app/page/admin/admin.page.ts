import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { NavController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit{
  
  username: string;
  
  value = false;


  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    private storage: Storage,
    public alertController: AlertController,
    private authservice: AuthService
  ) { }


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
