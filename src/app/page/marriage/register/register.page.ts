import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProcessService } from 'src/app/service/process.service';
import { AdminService } from 'src/app/service/admin.service';
import { AlertService } from 'src/app/service/alert.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  webversion = false;
  mobileversion = false;
  checkstatus = false;
  validations_form: FormGroup;
  mvalidations_form: FormGroup;
  manname: string;
  manid: string;
  womanid: string;
  manemail: string;
  manphone: string;
  womanname: string;
  womanphone: string;
  womanemail: string;
  id: string;
  
   //File Object for mancopyic
   manic: any;

    //File Object for womancopyic
    womanic: any;

      //File Object for man birthcertificate
   manbirth: any;

   //File Object for woman birthcertificate
   womanbirth: any;

    //File Object for mendivorce
    mandivorce: any;

    //File Object for womandivorce
    womandivorce: any;

     //File Object for man's wife death certificate
   manwifedeath: any;

   //File Object for woman's husband death certificate
   womanhusbanddeath: any;

   //File Object for man photo
   manphoto: any;

   //File Object for woman photo
   womanphoto: any;
 
 
    //File Object for Surat Pengesahan Taraf Perkahwinan
    letter: any;  

      //File Object for front own ic
      fmanic: any;  

       //File Object for back own ic
       bmanic: any;  
      
      //File Object for front other ic
      fwomanic: any;  

       //File Object for back other ic
       bwomanic: any;

  constructor(
    private iab: InAppBrowser,
    private plt: Platform,
    public formBuilder: FormBuilder,
    private processService: ProcessService,
    private adminService: AdminService,
    private authService: AuthService,
    private alertService: AlertService,
    public alertController: AlertController,
    private storage: Storage,
    
    ) { }

  ngOnInit() {
    if(this.plt.is('cordova')){
      this.mobileversion = true;
      this.webversion = false;
    }else{
      this.webversion = true;
    }


     //To get id
     this.storage.get('ic')
     .then((val) => {
       this.id = val;


       this.authService.access_marry().ref.where("manic", "==", this.id).where("status", "==", "married").get().then( doc=> {
          if(!doc.empty){
            this.checkstatus = true;
          }
      })


      this.authService.access_marry().ref.where("womanic", "==", this.id).where("status", "==", "married").get().then( doc=> {
        if(!doc.empty){
          this.checkstatus = true;
        }
    })
 



     })

   
     this.validations_form = this.formBuilder.group({
      womanic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      womanname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
      manic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      manname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
      womancopyic:  new FormControl("", Validators.required),
      mancopyic: new FormControl("", Validators.required),
      womanbirthcer: new FormControl("", Validators.required),
      birthcer: new FormControl("", Validators.required),
      manphoto: new FormControl("", Validators.required),
      womanphoto: new FormControl("", Validators.required),
      surat: new FormControl("", Validators.required),
      manwifedeath:new FormControl(""),
      mandivorce:new FormControl(""),
      womanhusbanddeath:new FormControl(""),
      womandivorce:new FormControl("")
    });

    this.mvalidations_form = this.formBuilder.group({
      manic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      womanic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      manname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
      womanname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
      frontmanic:  new FormControl("", Validators.required),
      backmanic: new FormControl("", Validators.required),
      frontwomanic: new FormControl("", Validators.required),
      backwomanic:  new FormControl("", Validators.required),
      womanbirthcer: new FormControl("", Validators.required),
      birthcer: new FormControl("", Validators.required),
      manphoto: new FormControl("", Validators.required),
      womanphoto: new FormControl("", Validators.required),
      surat: new FormControl("", Validators.required),
      manwifedeath:new FormControl(""),
      mandivorce:new FormControl(""),
      womanhusbanddeath:new FormControl(""),
      womandivorce:new FormControl("")
    });
  }

  validation_messages = {
    'manic': [
      { type: 'required', message: 'Man of New NRIC No. is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 12 characters only' },
      { type: 'maxlength', message: 'Please type 12 characters only' }
    ],
    'womanic': [
      { type: 'required', message: 'Woman of New NRIC No. is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 12 characters only' },
      { type: 'maxlength', message: 'Please type 12 characters only' }
    ],
    'manname': [
      { type: 'required', message: 'Man Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'womanname': [
      { type: 'required', message: 'Woman Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'mancopyic': [
      { type: 'required', message: 'Copy of man identification card need to upload' },
    ],
    'frontmanic': [
      { type: 'required', message: 'Copy of front man ic need to upload' },
    ],
    'backmanic': [
      { type: 'required', message: 'Copy of back man ic need to upload' },
    ],
    'womancopyic': [
      { type: 'required', message: 'Copy of woman identification card need to upload' },
    ],
    'frontwomanic': [
      { type: 'required', message: 'Copy of front woman ic need to upload' },
    ],
    'backwomanic': [
      { type: 'required', message: 'Copy of back woman ic need to upload' },
    ],
    'manphoto': [
      { type: 'required', message: 'Man photo need to upload' },
    ],
    'womanphoto': [
      { type: 'required', message: 'Woman photo need to upload' },
    ],
    'birthcer': [
      { type: 'required', message: 'Man Birth Certificate need to upload' },
    ],
    'womanbirthcer': [
      { type: 'required', message: 'Woman Birth Certificate need to upload' },
    ],
    'surat': [
      { type: 'required', message: 'Surat Pengesahan Taraf Perkahwinan need to upload' },
    ],
  };

  uploadcoicFile(event: FileList) {
    // The File object
    this.manic = event.item(0);
  }

  uploadindcoicFile(event: FileList) {
    // The File object
    this.womanic = event.item(0);
  }

  uploadbircerFile(event: FileList) {
    // The File object
    this.manbirth = event.item(0);
  }

  uploadindbircerFile(event: FileList) {
    // The File object
    this.womanbirth = event.item(0);
  }

  uploadphoFile(event: FileList) {
    // The File object
    this.manphoto = event.item(0);
  }

  uploadindphoFile(event: FileList) {
    // The File object
    this.womanphoto = event.item(0);
  }

  uploadsuFile(event: FileList) {
    // The File object
    this.letter = event.item(0);
  }

  uploadmanwdFile(event: FileList) {
    // The File object
    this.manwifedeath = event.item(0);
  }

  uploadmandiFile(event: FileList) {
    // The File object
    this.mandivorce = event.item(0);
  }

  uploadwomandiFile(event: FileList) {
    // The File object
    this.womandivorce = event.item(0);
  }

  uploadwomanhdFile(event: FileList) {
    // The File object
    this.womanhusbanddeath = event.item(0);
  }

  uploadfroownicFile(event: FileList) {
    // The File object
    this.fmanic = event.item(0);
  }

  uploadbacownicFile(event: FileList) {
    // The File object
    this.bmanic = event.item(0);
  }

  uploadfroindicFile(event: FileList) {
    // The File object
    this.fwomanic = event.item(0);
  }

  uploadbacindicFile(event: FileList) {
    // The File object
    this.bwomanic = event.item(0);
  }

   //To go to the link for online feedbackform
   openOnlineFeedbackSystem() {
    if (this.plt.is('cordova')) {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_system', 'location=true');
    } else {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_blank', 'location=true');
    }
  }

  //To register marriage with web
  async marryregisterweb(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          if(this.mandivorce == undefined){
            this.mandivorce = "";
          }
          if(this.manwifedeath == undefined){
            this.manwifedeath = "";
          }
          if(this.womandivorce == undefined){
            this.womandivorce = "";
          }
          if(this.womanhusbanddeath == undefined){
            this.womanhusbanddeath = "";
          }

         if(this.id == form.controls.manic.value || this.id == form.controls.womanic.value){
         
        
          this.adminService.access(form.controls.manic.value).get().subscribe( doc=>{
            var gender  = doc.data["gender"];
              if(!doc.exists){
                this.alertService.presentToast("The man identification card is not exist!!! Please try to contact us your problem!!!");
              }else if(doc.exists && gender == "Female"){
                this.alertService.presentToast("This is not a male identification card!!! Please don't mix up!!!");
              }else{
                this.adminService.access(form.controls.womanic.value).get().subscribe( doc=>{
                  var gender  = doc.data["gender"];
             
                    if(!doc.exists){
                      this.alertService.presentToast("The woman identification card is not exist!!! Please try to contact us your problem!!!");
                    }else if(doc.exists && gender == "Female"){
                      this.alertService.presentToast("This is not a female identification card!!! Please don't mix up!!!");
                    }else{
                      this.processService.webregistermarry(form.controls.manic.value,form.controls.womanic.value, 
                        form.controls.manname.value,form.controls.womanname.value,this.manphoto,this.womanphoto,this.manic, 
                        this.womanic,this.manbirth, this.womanbirth, this.letter, this.mandivorce, this.womandivorce, 
                        this.manwifedeath, this.womanhusbanddeath);
                    }
                  })
              }
            })
          }else{
            this.alertService.presentToast("Please use your identification card to register marriage");
         }
       
        }
      }
    ]
    });

    await alert.present();
  }

   //To register marriage with mobile
   async marryregistermobile(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          if(this.mandivorce == undefined){
            this.mandivorce = "";
          }
          if(this.manwifedeath == undefined){
            this.manwifedeath = "";
          }
          if(this.womandivorce == undefined){
            this.womandivorce = "";
          }
          if(this.womanhusbanddeath == undefined){
            this.womanhusbanddeath = "";
          }

          if(this.id == form.controls.manic.value || this.id == form.controls.womanic.value){
            
         
            this.adminService.access(form.controls.manic.value).get().subscribe( doc=>{
              var gender  = doc.data["gender"];
    
                if(!doc.exists){
                  this.alertService.presentToast("The man identification card is not exist!!! Please try to contact us your problem!!!");
                }else if(doc.exists && gender == "Female"){
                  this.alertService.presentToast("This is not a male identification card!!! Please don't mix up!!!");
                }else{
                  this.adminService.access(form.controls.womanic.value).get().subscribe( doc=>{
                    var gender  = doc.data["gender"];
               
                      if(!doc.exists){
                        this.alertService.presentToast("The woman identification card is not exist!!! Please try to contact us your problem!!!");
                      }else if(doc.exists && gender == "Female"){
                        this.alertService.presentToast("This is not a female identification card!!! Please don't mix up!!!");
                      }else{
                        this.processService.mobileregistermarry(form.controls.manic.value,form.controls.womanic.value, 
                          form.controls.manname.value,form.controls.womanname.value,this.manphoto,this.womanphoto,this.fmanic, 
                          this.fwomanic,this.bmanic, this.bwomanic,this.manbirth, this.womanbirth, this.letter, 
                          this.mandivorce, this.womandivorce, this.manwifedeath, this.womanhusbanddeath);
                      }
                    })
                }
              })
            }else{
              this.alertService.presentToast("Please use your identification card to register marriage");
          }//
        }
      }
    ]
    });

    await alert.present();
  }

}
