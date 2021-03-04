import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { Location,DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
})
export class ModifyUserPage implements OnInit {

  validations_form: FormGroup;
  genders: Array<string>;
  states: Array<String>;
  races: Array<String>;
  religions: Array<String>;
  currentvalueRe: any;
  currentvalueRa: any;
  currentReligionValue: String;
  currentRaceValue: String;
  citizen = [];
  id: any;

  constructor(
    public formBuilder: FormBuilder,
    private adminService: AdminService,
    
    public alertController: AlertController,
    private route: ActivatedRoute,
    private location: Location,
    private navCtrl: NavController,
    private datepipe: DatePipe,

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
      "Perak",
      "Pulau Pinang",
      "Kedah",
      "Kelantan",
      "Terengganu",
      "Pahang",
      "Sarawak",
      "Labuan",
      "Sabah"
    ];

    this.id = this.route.snapshot.params.ic;

    this.adminService.read_citizen_details(this.id).subscribe(data => {
     this.citizen = [];
      var details = 
      {
        IC: data.payload.id,
        NAME: data.payload.data()['name'].toUpperCase(),
        BIRTHCERNO: data.payload.data()['birthcertificate'],
        GENDER: data.payload.data()['gender'],
        RELIGION: data.payload.data()["religion"],
        RACE: data.payload.data()["race"],
        ADDRESS: data.payload.data()["address"],
        CITY: data.payload.data()["city"],
        POSTCODE: data.payload.data()["postcode"],
        BDATE: data.payload.data()["birthdate"],
        STATE: data.payload.data()["state"],
        IMAGE: data.payload.data()["picture"],
        isEdit: false,
      };
     this.citizen.push(details);
     
    });

    this.validations_form = this.formBuilder.group({
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

  //To click for edit profile
  EditRecord(record) {
    record.isEdit = true;
    let momentVariable = moment(record.BDATE, 'DD-MM-YYYY');  
    let latest_date = momentVariable.format('YYYY-MM-DD');  
    var age = moment().diff(latest_date, 'years');  
    console.log(age);
    this.validations_form.get('name').setValue(record.NAME);
    this.validations_form.get('race').setValue(record.RACE);
    this.validations_form.get('birth').setValue(record.BIRTHCERNO);
    this.validations_form.get('religion').setValue(record.RELIGION);
    this.validations_form.get('birthdate').setValue(latest_date);
    this.validations_form.get('address').setValue(record.ADDRESS);
    this.validations_form.get('city').setValue(record.CITY);
    this.validations_form.get('postcode').setValue(record.POSTCODE);
    this.validations_form.get('state').setValue(record.STATE);
    this.validations_form.get('gender').setValue(record.GENDER);
  }

  //To delete citizen info
  async RemoveRecord(id){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are you sure you want to delete this citizen?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          this.adminService.delete_citizen(id);
          this.navCtrl.navigateRoot('/citizen');
        }
      }
    ]
    });

    await alert.present();
  }

  //To update the citizen info
  async UpdateRecord(recordRow) {
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are you sure you want to update this citizen info?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          let record = {};
          var date = this.validations_form.controls.birthdate.value;
          let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
          record['name'] = this.validations_form.get('name').value.toUpperCase();
          record['race'] = this.validations_form.get('race').value;
          record['birthcertificate'] = this.validations_form.get('birth').value.toUpperCase();
          record['religion'] = this.validations_form.get('religion').value;
          record['birthdate'] = latest_date;
          record['address'] = this.validations_form.get('address').value;
          record['city'] = this.validations_form.get('city').value;
          record['postcode'] = this.validations_form.get('postcode').value;
          record['state'] = this.validations_form.get('state').value;
          record['gender'] = this.validations_form.get('gender').value;
                              
          this.adminService.update_citizen(this.id, record);
          recordRow.isEdit = false;
        }
      }
    ]
    });
    await alert.present();
  }

     //To go back previous page
     return() {
      this.location.back();
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

}
