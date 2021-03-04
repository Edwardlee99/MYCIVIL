import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProcessService } from 'src/app/service/process.service';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';

@Component({
  selector: 'app-birthregister',
  templateUrl: './birthregister.page.html',
  styleUrls: ['./birthregister.page.scss'],
})
export class BirthregisterPage implements OnInit {

  public minDate = moment().subtract(14, 'd').format();
  public maxDate = moment().add(0, 'd').format();;

  birthinhome = false;
  birthinhospital = false;
  webversion = false;
  mobileversion = false;
  validations_form: FormGroup;
  mvalidations_form: FormGroup;
  webhospital_form: FormGroup;
  mobilehospital_form: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;

  genders: Array<string>;
  states: Array<String>;

  //File Object for mothercopyic
  mothercopyic: any;

  //File Object for fathercopyic
  fathercopyic: any;

  //File Object for marrycertificate
  marrycertificate: any;
  
   //File Object for fatherdeathcertificate
   fadeathcertificate: any;

    //File Object for motherdeathcertificate
    modeathcertificate: any;

   //File Object for doctor letter
  docletter: any;

   //File Object for Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 
   caletter: any;  

    //File Object for police report
    poreport: any;    

     //File Object for copy front mother ic
     fromoic: any;  
     
     //File Object for copy back mother ic
     bacmoic: any;  

      //File Object for copy front father ic
      frofaic: any;  
     
      //File Object for copy back father ic
      bacfaic: any;  


  constructor(
    private iab: InAppBrowser,
    private plt: Platform,
    private datepipe: DatePipe,
    public formBuilder: FormBuilder,
    private processService: ProcessService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
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

    this.genders = [
      "Male",
      "Female"
    ];

    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    this.countries = [
      new  CountryPhone('MY', 'Malaysia')
    ];

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      motheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fatheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fathername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      mothername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      gender: new FormControl(this.genders[0], Validators.required),
      birthdate:new FormControl('', Validators.required),
      birthtime:new FormControl('', Validators.required),
      state: new FormControl(this.states[0], Validators.required),
      mothercopyic: new FormControl("", Validators.required),
      fathercopyic: new FormControl("", Validators.required),
      docletter: new FormControl("", Validators.required),
      caletter: new FormControl("", Validators.required),
      poreport: new FormControl("", Validators.required),
      marrycer: new FormControl("", Validators.required),
      fatherdeath: new FormControl(""),
      motherdeath: new FormControl(""),
    });

    this.mvalidations_form = this.formBuilder.group({
      motheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fatheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fathername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      mothername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      gender: new FormControl(this.genders[0], Validators.required),
      birthdate:new FormControl('', Validators.required),
      birthtime:new FormControl('', Validators.required),
      state: new FormControl(this.states[0], Validators.required),
      docletter: new FormControl("", Validators.required),
      caletter: new FormControl("", Validators.required),
      poreport: new FormControl("", Validators.required),
      frontmotic: new FormControl("", Validators.required),
      backmotic: new FormControl("", Validators.required),
      frontfatic: new FormControl("", Validators.required),
      backfatic: new FormControl("", Validators.required),
      marrycer: new FormControl("", Validators.required),
      fatherdeath: new FormControl(""),
      motherdeath: new FormControl(""),
    });

    this.webhospital_form = this.formBuilder.group({
      motheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fatheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fathername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      mothername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      gender: new FormControl(this.genders[0], Validators.required),
      birthdate:new FormControl('', Validators.required),
      birthtime:new FormControl('', Validators.required),
      state: new FormControl(this.states[0], Validators.required),
      mothercopyic: new FormControl("", Validators.required),
      fathercopyic: new FormControl("", Validators.required),
      docletter: new FormControl("", Validators.required),
      caletter: new FormControl("", Validators.required),
      marrycer: new FormControl("", Validators.required),
      fatherdeath: new FormControl(""),
      motherdeath: new FormControl(""),
    });

    this.mobilehospital_form = this.formBuilder.group({
      motheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fatheric: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      fathername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      mothername: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      gender: new FormControl(this.genders[0], Validators.required),
      birthdate:new FormControl('', Validators.required),
      birthtime:new FormControl('', Validators.required),
      state: new FormControl(this.states[0], Validators.required),
      mothercopyic: new FormControl("", Validators.required),
      fathercopyic: new FormControl("", Validators.required),
      docletter: new FormControl("", Validators.required),
      caletter: new FormControl("", Validators.required),
      frontmotic: new FormControl("", Validators.required),
      backmotic: new FormControl("", Validators.required),
      frontfatic: new FormControl("", Validators.required),
      backfatic: new FormControl("", Validators.required),
      marrycer: new FormControl("", Validators.required),
      fatherdeath: new FormControl(""),
      motherdeath: new FormControl(""),
    });

  }

  validation_messages = {
    'motheric': [
      { type: 'required', message: 'New NRIC No. is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 12 characters only' },
      { type: 'maxlength', message: 'Please type 12 characters only' }
    ],
    'fatheric': [
      { type: 'required', message: 'New NRIC No. is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 12 characters only' },
      { type: 'maxlength', message: 'Please type 12 characters only' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'fathername': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'mothername': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required to select' },
    ],
    'state': [
      { type: 'required', message: 'State is required to select' },
    ],
    'birthdate': [
      { type: 'required', message: 'Birth Date is required to select' },
    ],
    'birthtime': [
      { type: 'required', message: 'Birth Time is required to select' },
    ],
    'mothercopyic': [
      { type: 'required', message: 'Copy of mother identification cards need to upload' },
    ],
    'fathercopyic': [
      { type: 'required', message: 'Copy of father identification cards need to upload' },
    ],
    'frontmotic': [
      { type: 'required', message: 'Copy of front mother ic need to upload' },
    ],
    'backmotic': [
      { type: 'required', message: 'Copy of back mother ic need to upload' },
    ],
    'frontfatic': [
      { type: 'required', message: 'Copy of front father ic need to upload' },
    ],
    'backfatic': [
      { type: 'required', message: 'Copy of back father ic need to upload' },
    ],
    'docletter': [
      { type: 'required', message: 'Doctor Letter Confirmation need to upload' },
    ],
    'caletter': [
      { type: 'required', message: 'Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 need to upload' },
    ],
    'poreport': [
      { type: 'required', message: 'Police Report need to upload' },
    ],
    'marrycer': [
      { type: 'required', message: 'Marry Certificate need to upload' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    
  };

  uploadfaicFile(event: FileList) {
    // The File object
    this.fathercopyic = event.item(0);
  }

  uploadmoicFile(event: FileList) {
    // The File object
    this.mothercopyic = event.item(0);
  }

  uploaddocletFile(event: FileList) {
    // The File object
    this.docletter = event.item(0);
  }

  uploadcaleFile(event: FileList) {
    // The File object
    this.caletter = event.item(0);
  }

  uploadbacfaicFile(event: FileList) {
    // The File object
    this.bacfaic = event.item(0);
  }

  uploadfrofaicFile(event: FileList) {
    // The File object
    this.frofaic = event.item(0);
  }

  uploadbackmoicFile(event: FileList) {
    // The File object
    this.bacmoic = event.item(0);
  }

  uploadfromoicFile(event: FileList) {
    // The File object
    this.fromoic = event.item(0);
  }

  uploadporeFile(event: FileList) {
    // The File object
    this.poreport = event.item(0);
  }

  uploadmacerFile(event: FileList) {
    // The File object
    this.marrycertificate = event.item(0);
  }

  uploadfadeFile(event: FileList) {
    // The File object
    this.fadeathcertificate = event.item(0);
  }

  uploadmodeFile(event: FileList) {
    // The File object
    this.modeathcertificate = event.item(0);
  }

 //To show home form 
  homebirth(){
    this.birthinhome = true;
    if(this.plt.is('cordova')){
      this.mobileversion = true;
      this.webversion = false;
    }else{
      this.webversion = true;
    }
  }

  //To show hospital form 
  hospitalbirth(){
    this.birthinhospital = true;
    if(this.plt.is('cordova')){
      this.mobileversion = true;
      this.webversion = false;
    }else{
      this.webversion = true;
    }
  }

  //To exit web version of register birth certificate from home
  exitwebhome(){
    this.birthinhome = false;
    this.webversion = false;
    this.mobileversion = false;
  }

  //To exit web version of register birth certificate from hospital
  exitwebhospital(){
    this.birthinhospital = false;
    this.webversion = false;
    this.mobileversion = false;
  }

  //To go to the link for online feedbackform
  openOnlineFeedbackSystem() {
    if (this.plt.is('cordova')) {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_system', 'location=true');
    } else {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_blank', 'location=true');
    }
  }

  //To register birth certificate from home button with web
  async registerwebhomebirth(form: FormGroup){

    var date = form.controls.birthdate.value;
     let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');

     var time = form.controls.birthtime.value;
     let latest_time =this.datepipe.transform(time, 'h:mm a');
     

    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          if(this.fadeathcertificate == undefined){
            this.fadeathcertificate = "";
          }
          if(this.modeathcertificate == undefined){
            this.modeathcertificate = "";
          }

          this.processService.birthwebhomeregister(form.controls.motheric.value,form.controls.fatheric.value, 
            form.controls.mothername.value.toUpperCase(),form.controls.fathername.value.toUpperCase(),latest_date,
            latest_time,form.controls.gender.value,form.controls.name.value.toUpperCase(),
            form.controls.email.value,form.get('country_phone.phone').value,form.controls.state.value, 
            this.mothercopyic,this.fathercopyic,this.caletter,this.poreport,this.docletter,
            this.marrycertificate,this.fadeathcertificate,this.modeathcertificate);
        }
      }
    ]
    });

    await alert.present();
    
  }


  //To register birth certificate from home button with mobile
  async mobilehomebirth(form: FormGroup){

    var date = form.controls.birthdate.value;
     let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');

     var time = form.controls.birthtime.value;
     let latest_time =this.datepipe.transform(time, 'h:mm a');

    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          if(this.fadeathcertificate == undefined){
            this.fadeathcertificate = "";
          }
          if(this.modeathcertificate == undefined){
            this.modeathcertificate = "";
          }
          this.processService.birthmobilehomeregister(form.controls.motheric.value,form.controls.fatheric.value, 
            form.controls.mothername.value.toUpperCase(),form.controls.fathername.value.toUpperCase(),
            latest_date,latest_time, form.controls.gender.value,form.controls.name.value.toUpperCase(),
            form.controls.email.value,form.get('country_phone.phone').value,form.controls.state.value, 
            this.fromoic,this.bacmoic, this.frofaic, this.bacfaic,this.caletter,this.poreport,this.docletter,
            this.marrycertificate,this.fadeathcertificate,this.modeathcertificate);
        }
      }
    ]
    });

    await alert.present();
    
  }



    //To register birth certificate from hospital button with web
    async registerwebhosbirth(form: FormGroup){

      var date = form.controls.birthdate.value;
      let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');

      var time = form.controls.birthtime.value;
      let latest_time =this.datepipe.transform(time, 'h:mm a');
  
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'All of your information cannot edited. Please make sure the info is correct!!!',
         buttons: ['Cancel', {
          text: 'Yes',
          handler: () => {
            if(this.fadeathcertificate == undefined){
              this.fadeathcertificate = "";
            }
            if(this.modeathcertificate == undefined){
              this.modeathcertificate = "";
            }
            this.processService.birthwebhosregister(form.controls.motheric.value,form.controls.fatheric.value, 
              form.controls.mothername.value.toUpperCase(),form.controls.fathername.value.toUpperCase(),
              latest_date,latest_time,form.controls.gender.value,form.controls.name.value.toUpperCase(),
              form.controls.email.value,form.get('country_phone.phone').value,form.controls.state.value, 
              this.mothercopyic,this.fathercopyic,this.caletter,this.docletter,
              this.marrycertificate,this.fadeathcertificate,this.modeathcertificate);
          }
        }
      ]
      });
  
      await alert.present();
      
    }

     //To register birth certificate from hospital button with mobile
     async mobilehosbirth(form: FormGroup){

      var date = form.controls.birthdate.value;
      let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');

      var time = form.controls.birthtime.value;
      let latest_time =this.datepipe.transform(time, 'h:mm a');
  
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'All of your information cannot edited. Please make sure the info is correct!!!',
         buttons: ['Cancel', {
          text: 'Yes',
          handler: () => {
            if(this.fadeathcertificate == undefined){
              this.fadeathcertificate = "";
            }
            if(this.modeathcertificate == undefined){
              this.modeathcertificate = "";
            }
            this.processService.birthmobilehosregister(form.controls.motheric.value,form.controls.fatheric.value, 
              form.controls.mothername.value.toUpperCase(),form.controls.fathername.value.toUpperCase(),
              latest_date,latest_time,form.controls.gender.value,form.controls.name.value.toUpperCase(),
              form.controls.email.value,form.get('country_phone.phone').value,form.controls.state.value, 
              this.fromoic,this.bacmoic, this.frofaic, this.bacfaic,this.caletter,this.docletter,
              this.marrycertificate,this.fadeathcertificate,this.modeathcertificate);
          }
        }
      ]
      });
  
      await alert.present();
      
    }



}
