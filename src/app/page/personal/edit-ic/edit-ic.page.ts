import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProcessService } from 'src/app/service/process.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-ic',
  templateUrl: './edit-ic.page.html',
  styleUrls: ['./edit-ic.page.scss'],
})
export class EditIcPage implements OnInit {
  webversion = false;
  mobileversion = false;
  validations_form: FormGroup;
  mvalidations_form: FormGroup;
  id: string;
  email: string;
  name: string;
  phone:string;
  states: Array<String>;

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
    public alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService,
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
       this.name = doc.data()['name'];
       

     })
    })

     this.states = [
      "Kuala Lumpur",
      "Selangor",
      "Putrajaya",
      "Melaka",
      "Negeri Sembilan",
      "Johor",
      "Perlis",
      "Pulau Pinang",
      "Perak",
      "Kedah",
      "Kelantan",
      "Terengganu",
      "Pahang",
      "Sarawak",
      "Labuan",
      "Sabah"
    ];

     if(this.plt.is('cordova')){
      this.mobileversion = true;
      this.webversion = false;
    }else{
      this.webversion = true;
    }


    this.validations_form = this.formBuilder.group({
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ])),
      state: new FormControl(this.states[0], Validators.required),
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      copyic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
    });

    this.mvalidations_form = this.formBuilder.group({
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30)
      ])),
      state: new FormControl(this.states[0], Validators.required),
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      frontic: new FormControl("", Validators.required),
      backic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
    });
  }

  validation_messages = {
    'city': [
      { type: 'required', message: 'City is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 30 characters only' }
    ],
    'postcode': [
      { type: 'required', message: 'Postcode is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 5 characters only' },
      { type: 'maxlength', message: 'Please type 5 characters only' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
      { type: 'maxlength', message: 'Please type maximum 100 characters only' }
    ],
    'state': [
      { type: 'required', message: 'State is required to select' },
    ],
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

  //To edit address of identification cards  with web
  async iceditweb(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.webeditic(this.id,this.name, this.email,this.phone,
            form.controls.address.value,form.controls.city.value,
            form.controls.postcode.value,form.controls.state.value,this.coic,this.photo,this.supdocaddr);
        }
      }
    ]
    });

    await alert.present();
    
  }

  //To edit address of identification cards  with mobile
  async iceditmobile(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.mobileeditic(this.id,this.name, this.email,this.phone,
            form.controls.address.value,form.controls.city.value,
            form.controls.postcode.value,form.controls.state.value,this.froic,this.bacic,this.photo,
            this.supdocaddr);
        }
      }
    ]
    });

    await alert.present();
    
  }

}
