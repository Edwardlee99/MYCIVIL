import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      if (this.platform.is('cordova')) {
        this.storage.clear();
        this.navCtrl.navigateRoot('/login', { replaceUrl: true });
        // works only on phones
      } else {
        this.storage.clear();
        this.navCtrl.navigateRoot('/login', { replaceUrl: true });
      }
      // destroy all cached/active views which angular router does not
      loading.dismiss();
    });
  }

}

