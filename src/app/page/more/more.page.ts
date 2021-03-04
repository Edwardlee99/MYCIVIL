import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { NavController,AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';
import { AdminService } from 'src/app/service/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-more',
  templateUrl: 'more.page.html',
  styleUrls: ['more.page.scss']
})
export class MorePage implements OnInit {

  staffRole = false;
  citizenRole = false;
  //role
  role : string;
  //renew
  renew : string;
  //To renew ic
  isRenew = false;
   //Has Children?
   hasChild = false;
   //Has Marry?
  hasMarry = false;
   //Can Marry?
   canMarry = false;
   //View Religion?
   viewReligion = false;

  constructor(
    public iab: InAppBrowser,
    private platform: Platform,
    private navCtrl: NavController,
    private alertService: AlertService,
    public alertController: AlertController,
    private storage: Storage,
    private authservice: AuthService,
    private adminservice: AdminService
  ) {}

  ngOnInit() {
      //To get role
      this.storage.get('ic')
      .then((val) => {
       
       //Access Level For staff and user
        this.authservice.user(val).get().subscribe(doc => {
        this.role = doc.data()['role']
        

        if(this.role == "Staff"){
          this.staffRole = true;
        }else{
          this.citizenRole = true;
        }
        }, error => {
          console.log(error);
        }) 

        //Access Level For User
        this.adminservice.access(val).get().subscribe(doc => {
        this.renew = doc.data()['renew'];
        var birthdate = doc.data()['birthdate'];
        var religion = doc.data()['religion'];
        let momentVariable = moment(birthdate, 'DD-MM-YYYY');  
        let latest_date = momentVariable.format('YYYY-MM-DD'); 
        var age = moment().diff(latest_date, 'years');  
        if(this.renew == "false" && age >= 18){
          this.isRenew = true;
        }
        //Access Level For has man marry
        this.authservice.access_marry().ref.where("manic", "==", val).get().then(doc => {          
          if(!doc.empty && religion != "Islam"){
            this.hasMarry = true;
            this.viewReligion = true;
          }
          if(age >= 21 && religion != "Islam"){
            this.canMarry = true;
            this.viewReligion = true;
          }
  
        }, error => {
          console.log(error);
        }) 

        //Access Level For has woman marry
        this.authservice.access_marry().ref.where("womanic", "==", val).get().then(doc => {          
          if(!doc.empty  && religion != "Islam"){
            this.hasMarry = true;
            this.viewReligion = true;
          }
          if(age >= 21 && religion != "Islam"){
            this.canMarry = true;
            this.viewReligion = true;
          }
  
        }, error => {
          console.log(error);
        }) 

        
        }, error => {
          console.log(error);
        }) 


  

         //Access Level For has Children
         this.authservice.read_children_father(val).get().subscribe(data => {
          if(data.empty){ 
            //Using mother ic
            this.authservice.read_children_mother(val).get().subscribe( data=>{
              if(!data.empty){
                this.hasChild = true;
              }
          })
          }else{
           this.hasChild = true;
          }
       
        });

        error => console.error(error)
      });    
  }


  isMobile = this.platform.is('cordova');

  gotoPage(url){
    if (this.isMobile) {
      this.iab.create(url, '_system', 'location=true');
    } else {
      this.iab.create(url, '_blank', 'location=true');
    }
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
