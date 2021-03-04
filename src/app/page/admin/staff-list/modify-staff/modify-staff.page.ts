import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { AlertService } from 'src/app/service/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import {  CountryPhone } from 'src/app/models/country';
import { ActivatedRoute} from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modify-staff',
  templateUrl: './modify-staff.page.html',
  styleUrls: ['./modify-staff.page.scss'],
})
export class ModifyStaffPage implements OnInit {

  validations_form: FormGroup;
  picture_form: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<CountryPhone>;
  roles: Array<String>;
  staff = [];
  id: any;
  
  //File Object
  file: any;

  constructor(
    public formBuilder: FormBuilder,
    private adminService: AdminService,
    private alertService: AlertService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private location: Location,
    private navCtrl: NavController

  ) { }

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

    this.id = this.route.snapshot.params.id;

    this.adminService.read_staff_details(this.id).subscribe(data => {
     this.staff = [];
      var details = 
      {
        ID: data.payload.id,
        NAME: data.payload.data()['name'].toUpperCase(),
        EMAIL: data.payload.data()['email'],
        IC: data.payload.data()['ic'],
        TELNO: data.payload.data()["phone"],
        ROLE: data.payload.data()["role"],
        IMAGE: data.payload.data()["picture"],
        isEdit: false,
        isEditPicture: false,
      };
     this.staff.push(details);
     
    });


    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl("", Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    //Edit Staff Details
    this.validations_form = this.formBuilder.group({
      ic: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z/ ]*$'),
        Validators.maxLength(80)
      ])),
      country_phone: this.country_phone_group,
      role: new FormControl("", Validators.required),
    });

    //Edit Staff Picture
    this.picture_form = this.formBuilder.group({
      picture: new FormControl("", Validators.required)
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
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'role': [
      { type: 'required', message: 'Please select roles!!!' }
    ],
    'picture': [
      { type: 'required', message: 'Please select picture to update!!!' }
    ]
  };

  //To get files
  uploadFile(event: FileList) {
    // The File object
    this.file = event.item(0);
  }

  //To click for edit profile
  EditRecord(record) {
    record.isEdit = true;
    this.validations_form.get('country_phone.phone').setValue(record.TELNO);
    this.validations_form.get('name').setValue(record.NAME);
    this.validations_form.get('ic').setValue(record.IC);
    this.validations_form.get('role').setValue(record.ROLE);
  }

  //To click for edit staff picture
  EditPicture(record) {
    record.isEditPicture = true;
  }

  //To delete staff info
  async RemoveRecord(id){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are you sure you want to delete this staff?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          this.alertService.presentToast("You have successfully delete this staff!!!");
          this.adminService.delete_staff(id);
          this.navCtrl.navigateRoot('/staff');
        }
      }
    ]
    });

    await alert.present();
  }

  //To update the staff info
  async UpdateRecord(recordRow) {
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are you sure you want to update this staff info?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          let record = {};
          record['name'] = this.validations_form.controls.name.value.toUpperCase();
          record['ic'] = this.validations_form.controls.ic.value;
          record['role'] = this.validations_form.controls.role.value;
          record['phone'] = this.validations_form.get('country_phone.phone').value;
          this.adminService.update_staff(this.id, record);
          recordRow.isEdit = false;
        }
      }
    ]
    });
    await alert.present();
  }

    //To update the staff picture
    async UpdatePicture(recordRow) {
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'Are you sure you want to upload the picture?',
         buttons: ['No', {
          text: 'Yes',
          handler: () => {
            this.adminService.update_picture(this.id, this.file);
            this.picture_form.reset();
            recordRow.isEditPicture = false;
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

}
