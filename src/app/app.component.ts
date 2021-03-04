import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
   private network: Network,
    private statusBar: StatusBar,
    private alertService: AlertService,
  ) {
     this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      if(this.platform.is('cordova') && this.network.type == 'none'){
        this.alertService.presentToast('Please connect to the Internet or WIFI for use this application!!!');
      }else if(this.network.type == 'none'){
        this.alertService.presentToast('Please connect to the Internet or WIFI for use this application!!!');
      }
    
    });
  }

}