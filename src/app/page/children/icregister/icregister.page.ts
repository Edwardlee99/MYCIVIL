import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProcessService } from 'src/app/service/process.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import * as moment from 'moment';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';

@Component({
  selector: 'app-icregister',
  templateUrl: './icregister.page.html',
  styleUrls: ['./icregister.page.scss'],
})
export class IcregisterPage implements OnInit {

  webversion = false;
  mobileversion = false;
  earlyregister = false;
  lateregister = false;
  tooearlyregister = false;
  check_form: FormGroup;
  validations_form: FormGroup;
  mvalidations_form: FormGroup;
  birthcertificate: any;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  states: Array<String>;
  races: Array<String>;
  religions: Array<String>;
  currentvalueRe: any;
  currentvalueRa: any;
  currentReligionValue: String;
  currentRaceValue: String;

    //File Object for parentcopyic
    parentcopyic: any;

    //File Object for photo
    photo: any;
  
     //File Object for birth certificate
    birthcer: any;
  
     //File Object for Supporting Document For Address
     supdocaddr: any;  

  
       //File Object for copy front parent ic
       froparic: any;  
       
       //File Object for copy back parent ic
       bacparic: any; 


  constructor(
    private iab: InAppBrowser,
    private plt: Platform,
    public formBuilder: FormBuilder,
    private processService: ProcessService,
    private authService: AuthService,
    private alertService: AlertService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.religions = [
      "Islam",
      "Buddha",
      "Hinduism",
      "Christian",
      "Sikhism",
      "Taiosm",
      "Other"
    ];
    
    this.currentReligionValue = "Islam";

    this.races = [
      "Malay",
      "Chinese",
      "Indian",
      "Iban",
      "Bidayuh",
      "Dayak",
      "Kadazan",
      "Other"
    ];
    this.currentRaceValue = "Malay";

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

    this.check_form = this.formBuilder.group({
      birth: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ])),
    })

    this.validations_form = this.formBuilder.group({
      ic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      parentname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      race: new FormControl(this.currentRaceValue, Validators.required),
      religion: new FormControl(this.currentReligionValue, Validators.required),
      country_phone: this.country_phone_group,
      copyic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
      birthcer: new FormControl("", Validators.required),
    });

    this.mvalidations_form = this.formBuilder.group({
      ic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      parentname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])), 
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      race: new FormControl(this.currentRaceValue, Validators.required),
      religion: new FormControl(this.currentReligionValue, Validators.required),
      country_phone: this.country_phone_group,
      frontpaic: new FormControl("", Validators.required),
      backpaic: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      supaddr: new FormControl("", Validators.required),
      birthcer: new FormControl("", Validators.required),
    });
  }

  validation_messages = {
    'ic': [
      { type: 'required', message: 'New NRIC No. is required.' },
      { type: 'pattern', message: 'Please enter numbers only' },
      { type: 'minlength', message: 'Please type 12 characters only' },
      { type: 'maxlength', message: 'Please type 12 characters only' }
    ],
    'birth': [
      { type: 'required', message: 'Birth Certificate Number is required.' },
      { type: 'pattern', message: 'Please enter numbers or characters only' },
      { type: 'minlength', message: 'Please type 8 characters only' },
      { type: 'maxlength', message: 'Please type 8 characters only' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'parentname': [
      { type: 'required', message: 'Mother/Father Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'mothername': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'race': [
      { type: 'required', message: 'Race is required to select.' },
    ],
    'religion': [
      { type: 'required', message: 'Religion is required to select' },
    ],
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
      { type: 'required', message: 'Copy of father/mother identification cards need to upload' },
    ],
    'frontpaic': [
      { type: 'required', message: 'Copy of front mother/father ic need to upload' },
    ],
    'backpaic': [
      { type: 'required', message: 'Copy of back mother/father ic need to upload' },
    ],
    'photo': [
      { type: 'required', message: 'Register person of photo need to upload' },
    ],
    'supaddr': [
      { type: 'required', message: 'Supporting Document for Address need to upload' },
    ],
    'birthcer': [
      { type: 'required', message: 'Birth Certificate need to upload' },
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

  uploadcoicFile(event: FileList) {
    // The File object
    this.parentcopyic = event.item(0);
  }

  uploadbircerFile(event: FileList) {
    // The File object
    this.birthcer = event.item(0);
  }

  uploadphoFile(event: FileList) {
    // The File object
    this.photo = event.item(0);
  }

  uploadsupaddFile(event: FileList) {
    // The File object
    this.supdocaddr = event.item(0);
  }

  uploadbacpaicFile(event: FileList) {
    // The File object
    this.bacparic = event.item(0);
  }

  uploadfropaicFile(event: FileList) {
    // The File object
    this.froparic = event.item(0);
  }

  //When have other values in religion
  selectChangedReligion(selected) {
    if (selected === 'Other') {
      this.inputreligionValue();
    } else {
      this.currentvalueRe = selected;
    };
  };

  // For religion in other option
  async inputreligionValue() {
    const inputAlert = await this.alertController.create({
      header: 'Please enter the religion:',
      inputs: [ { type: 'text'} ],
      buttons: [ { text: 'Cancel' }, { text: 'Ok' } ]
    });
  inputAlert.onDidDismiss().then((data) => {
      let customName: string = data.data.values[0];
      if (customName) {
        let indexFound = this.religions.findIndex(religion => religion === customName)
        if (indexFound === -1) {
          this.religions.push(customName);
          this.currentReligionValue = customName;
        } else {
          this.currentReligionValue = this.religions[indexFound];
        };
      };      
    }).catch(err=>console.log(err));
    await inputAlert.present();
      
  };

  //When have other values in race
  selectChangedRace(selected) {
    if (selected === 'Other') {
      this.inputraceValue();
    } else {
      this.currentvalueRa = selected;
    };
  };

  // For race in other option
  async inputraceValue() {
    const inputAlert = await this.alertController.create({
      header: 'Please enter the race:',
      inputs: [ { type: 'text'}],
      buttons: [ { text: 'Cancel' }, { text: 'Ok' } ]
    });
  inputAlert.onDidDismiss().then((data) => {
      let customName: string = data.data.values[0];
      if (customName) {
        let indexFound = this.religions.findIndex(race => race === customName)
        if (indexFound === -1) {
          this.races.push(customName);
          this.currentRaceValue = customName;
        } else {
          this.currentRaceValue = this.races[indexFound];
        };
      };      
    }).catch(err=>console.log(err));
    await inputAlert.present();
      
  };

   //To go to the link for online feedbackform
   openOnlineFeedbackSystem() {
    if (this.plt.is('cordova')) {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_system', 'location=true');
    } else {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_blank', 'location=true');
    }
  }

   //To exit register identification card form
   exit(){
    this.earlyregister = false;
    this.webversion = false;
    this.mobileversion = false;
  }

  //To check ages
  async checkbirth(form: FormGroup){
    this.birthcertificate = form.controls.birth.value.toUpperCase();
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are you sure this is your birth certificate!!!If not, click cancel for confirm again!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
         this.processService.check_exist(this.birthcertificate).get().subscribe(doc =>{
          if(doc.empty){
          this.authService.check_age(this.birthcertificate).get().subscribe( doc=> {
            if(doc.exists){
              
            var id = doc.data()["ic"];
             var birthdate = doc.data()['birthdate'];
             let momentVariable = moment(birthdate, 'DD-MM-YYYY');  
             let latest_date = momentVariable.format('YYYY-MM-DD'); 
            var age = moment().diff(latest_date, 'years');  
            if(id != ""){
              this.alertService.presentToast("You have identification cards already!!! Please do not use this service for edit or renew identification cards!!!")
            } else if (age > 16){
                this.lateregister = true;
            } else if (age >= 12 && age <= 16){
              this.earlyregister = true;
              if(this.plt.is('cordova')){
                this.mobileversion = true;
                this.webversion = false;
              }else{
                this.webversion = true;
              };           
            }else if(age <= 12){
              this.tooearlyregister = true;
            } 
            }else{
              this.alertService.presentToast("Your birth certificate is not exist!!! Please try again!!!");
            }
          });
        }else{
          this.alertService.presentToast("You have submit register identification cards form already!!!")
        } 
      });
        }
      }
    ]
    });
    await alert.present();
  };

  //To register identification cards  with web
  async icregisterweb(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.webregisteric(this.birthcertificate, form.controls.ic.value, 
          form.controls.parentname.value.toUpperCase(), form.controls.name.value.toUpperCase(),
          form.controls.race.value,form.controls.religion.value,form.controls.address.value,
          form.controls.city.value,form.controls.postcode.value,form.controls.state.value,
          form.controls.email.value,form.get('country_phone.phone').value,this.parentcopyic,this.birthcer,
          this.photo,this.supdocaddr);
        }
      }
    ]
    });

    await alert.present();
    
  }

  //To register identification cards with mobile
  async icregistermobile(form: FormGroup){

    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'All of your information cannot edited. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Yes',
        handler: () => {
          this.processService.mobileregisteric(this.birthcertificate, form.controls.ic.value, 
          form.controls.parentname.value.toUpperCase(), form.controls.name.value.toUpperCase(),
          form.controls.race.value,form.controls.religion.value,form.controls.address.value,
          form.controls.city.value,form.controls.postcode.value,form.controls.state.value,
          form.controls.email.value,form.get('country_phone.phone').value,this.froparic,this.bacparic,
          this.birthcer,this.photo,this.supdocaddr)
        }
      }
    ]
    });

    await alert.present();
    
  }

}
