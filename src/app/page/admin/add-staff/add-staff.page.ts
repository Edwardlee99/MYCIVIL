import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';
import { PasswordValidator } from 'src/app/validator/password.validator';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.page.html',
  styleUrls: ['./add-staff.page.scss'],
})
export class AddStaffPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<CountryPhone>;
  roles: Array<String>;

  //File Object
  file: any;

  showPassword: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private adminService: AdminService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    this.countries = [
      new  CountryPhone('MY', 'Malaysia')
    ];

    this.roles = [
      "Staff",
      "Admin"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
    
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
      workid: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+'),
      ])),
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
      matching_passwords: this.matching_passwords_group,
      picture: new FormControl(null),
      role: new FormControl(this.roles[0], Validators.required),
    });
  }

  validation_messages = {
    'workid': [
      { type: 'required', message: 'Worker ID is required.' },
      { type: 'pattern', message: 'Please enter characters and numbers only' },
    ],
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
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'role': [
      { type: 'required', message: 'Please select roles!!!' }
    ]
  };



  uploadFile(event: FileList) {
    // The File object
    this.file = event.item(0);

  }


  async onSubmit(form: FormGroup){  
    //To check value for picture file
     var checkvalue = form.controls.picture.value;
     var value = 0;
     
     const alert = await this.alertController.create({
      header: 'Add Staff Info?',
      message: 'The WorkerID and email of the staff cannot be edited afterwards. Please make sure the info is correct!!!',
       buttons: ['Cancel', {
        text: 'Okay',
        handler: () => {
      //if have value can upload the file
      if (checkvalue != null){
      this.adminService.add_staff(form.controls.workid.value,form.controls.ic.value, 
        form.controls.name.value.toUpperCase(), form.controls.email.value, form.get('role').value,
        form.get('country_phone.phone').value,form.get('matching_passwords.password').value,this.file);
 
     }
      //if the picture file value is not exist
       else if (checkvalue == null){
        this.adminService.add_staff(form.controls.workid.value,form.controls.ic.value, 
          form.controls.name.value.toUpperCase(), form.controls.email.value, form.get('role').value,
          form.get('country_phone.phone').value,form.get('matching_passwords.password').value, value);
      }
        }
      }
    ]
    });

    await alert.present();
  };

}
