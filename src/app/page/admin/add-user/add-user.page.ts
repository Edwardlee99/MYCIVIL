import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/service/admin.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  validations_form: FormGroup;

  genders: Array<string>;
  states: Array<String>;
  races: Array<String>;
  religions: Array<String>;
  currentvalueRe: any;
  currentvalueRa: any;
  currentReligionValue: String;
  currentRaceValue: String;
  role: string;
  


  constructor(
    public formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private adminService : AdminService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {


    this.genders = [
      "Male",
      "Female"
    ];

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

    this.validations_form = this.formBuilder.group({
      ic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      birth: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      race: new FormControl(this.currentRaceValue, Validators.required),
      religion: new FormControl(this.currentReligionValue, Validators.required),
      birthdate:new FormControl('', Validators.required),
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
    'gender': [
      { type: 'required', message: 'Gender is required to select' },
    ],
    'state': [
      { type: 'required', message: 'State is required to select' },
    ],
    'birthdate': [
      { type: 'required', message: 'Birth Date is required to select' },
    ],
    
  };


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
      
  //To submit the form
  async onSubmit(form: FormGroup){
    var date = form.controls.birthdate.value;
     let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
     const alert = await this.alertController.create({
      header: 'Add Citizen Info?',
      message: 'The IC of the citizen cannot be edited afterwards. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Okay',
        handler: () => {
		this.adminService.add_profile(form.controls.ic.value, form.controls.birth.value.toUpperCase(), 
        form.controls.name.value.toUpperCase(),form.controls.gender.value,form.controls.race.value, 
        form.controls.religion.value, latest_date,form.controls.address.value, form.controls.city.value,
        form.controls.postcode.value, form.controls.state.value);
        }
      }
    ]
    });

    await alert.present();
     
  }

  

}
