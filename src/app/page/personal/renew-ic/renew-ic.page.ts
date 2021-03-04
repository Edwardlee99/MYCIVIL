import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProcessService } from 'src/app/service/process.service';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-renew-ic',
  templateUrl: './renew-ic.page.html',
  styleUrls: ['./renew-ic.page.scss'],
})
export class RenewIcPage implements OnInit {

  webversion = false;
  mobileversion = false;
  early = false;
  late = false;
  validations_form: FormGroup;
  mvalidations_form: FormGroup;
  id: string;
  email: string;
  name: string;
  phone:string;

   //File Object for parentcopyic
   coic: any;

   //File Object for photo
   photo: any;
 
 
    //File Object for Supporting Document For Address
    supdocaddr: any;  

 
      //File Object for copy front parent ic
      froic: any;  
      
      //File Object for copy back parent ic
      bacic: any; 

  constructor(
    private iab: InAppBrowser,
    private plt: Platform,
    public formBuilder: FormBuilder,
    private processService: ProcessService,
    private adminService: AdminService,
    private authService: AuthService,
    public alertController: AlertController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    
     //To get role
     this.storage.get('ic')
     .then((val) => {
       this.id = val;

       this.authService.read_profile(this.id).subscribe(doc=>{
         this.phone = doc.payload.data()['phone'];
         this.email = doc.payload.data()['email'];
       })

      this.adminService.access(this.id).get().subscribe( doc=> {
        var birthdate = doc.data()['birthdate'];
        this.name = doc.data()['name'];
         let momentVariable = moment(birthdate, 'DD-MM-YYYY');  
        let latest_date = momentVariable.format('YYYY-MM-DD'); 
        var age = moment().diff(latest_date, 'years');
        if(age >= 18 && age <= 25){
          this.early = true;
          if(this.plt.is('cordova')){
            this.mobileversion = true;
            this.webversion = false;
          }else{
            this.webversion = true;
          }
        } else{
          this.late = true;
        } 
      })


     })


    this.validations_form = this.formBuilder.group({
      copyic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
    });

    this.mvalidations_form = this.formBuilder.group({
      frontic: new FormControl("", Validators.required),
      backic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
    });
  }

  validation_messages = {
    'copyic': [
      { type: 'required', message: 'Copy of your identification card need to upload' },
    ],
    'frontic': [
      { type: 'required', message: 'Copy of your front identification card need to upload' },
    ],
    'backic': [
      { type: 'required', message: 'Copy of your back identification card need to upload' },
    ],
    'photo': [
      { type: 'required', message: 'Register person of photo need to upload' },
    ],
    'supaddr': [
      { type: 'required', message: 'Supporting Document for Address need to upload' },
    ],

  };

  uploadcoicFile(event: FileList) {
    // The File object
    this.coic = event.item(0);
  }

  uploadphoFile(event: FileList) {
    // The File object
    this.photo = event.item(0);
  }

  uploadsupaddFile(event: FileList) {
    // The File object
    this.supdocaddr = event.item(0);
  }

  uploadbacicFile(event: FileList) {
    // The File object
    this.bacic = event.item(0);
  }

  uploadfroicFile(event: FileList) {
    // The File object
    this.froic = event.item(0);
  }

  //To go to the link for online feedbackform
  openOnlineFeedbackSystem() {
    if (this.plt.is('cordova')) {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_system', 'location=true');
    } else {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_blank', 'location=true');
    }
  }

  //To renew identification cards  with web
  async icrenewweb(){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.webrenewic(this.id,this.name, this.email,this.phone,this.coic,
            this.photo,this.supdocaddr);
        }
      }
    ]
    });

    await alert.present();
    
  }

  //To renew identification cards  with mobile
  async icrenewmobile(){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.mobilerenewic(this.id,this.name, this.email,this.phone,
            this.froic,this.bacic,this.photo,this.supdocaddr);
        }
      }
    ]
    });

    await alert.present();
    
  }

 

}
