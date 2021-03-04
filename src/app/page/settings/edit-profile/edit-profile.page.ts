import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  
  validations_form: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  username: string;
  userphone: any;
  id: string;

  constructor(
    public formBuilder: FormBuilder,
    private authservice: AuthService,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.storage.get('ic')
      .then((val) => {
        this.id = val;
       this.authservice.user(val).get().subscribe(doc => {
        this.username = doc.data()['name']
        this.userphone = doc.data()['phone']
       })    
        
        error => console.error(error)
      });
   
   
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
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      country_phone: this.country_phone_group,
    });
  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Please enter characters only' },
      { type: 'maxlength', message: 'Please type maximum 80 characters only' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
  };


  async editprofile(){
    var name = this.validations_form.get('name').value;
    var phone = this.validations_form.get('country_phone.phone').value;
    const alert = await this.alertController.create({
      header: 'Are you sure to edit profile?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
		  this.authservice.editprofile(this.id,name, phone);
        }
      }
    ]
    });
    await alert.present();
  }

}
