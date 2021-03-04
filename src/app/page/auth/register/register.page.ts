import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{

  validations_form: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;

  

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
    });
  }

  validation_messages = {
    'ic': [
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
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
  };

  async register(){
    var ic = this.validations_form.get('ic').value;
    var name = this.validations_form.get('name').value;
    var email = this.validations_form.get('email').value;
    var phone = this.validations_form.get('country_phone.phone').value;
    const alert = await this.alertController.create({
      header: 'Register Account?',
      message: 'The IC and email cannot be edited afterwards. Please make sure your information is correct!!!',
       buttons: ['Cancel', {
        text: 'Okay',
        handler: () => {
		this.authService.register(ic, name, email, phone);
        }
      }
    ]
    });
    await alert.present();
  }
  
 
}