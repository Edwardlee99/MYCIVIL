import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/validator/phone.validator';
import { AuthService } from 'src/app/service/auth.service';
import {  CountryPhone } from 'src/app/models/country';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedback_form: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  
  //File Object
  file: any;

  //ic
  ic : string;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public alertController: AlertController,
    private storage: Storage
     
  ) { }
 

  ngOnInit() {
     //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    this.countries = [
      new  CountryPhone('MY', 'Malaysia')
    ];
    
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.feedback_form = this.formBuilder.group({
      message: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country_phone: this.country_phone_group,
      picture: new FormControl(null)
    });


    //To get idetification cards number
    this.storage.get('ic')
    .then((val) => {
     this.ic = val; 
      
      error => console.error(error)
    });

    
  }

  validation_messages = {
    'message': [
      { type: 'required', message: 'Message is required.' },
    ],
    'phone': [
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
  };

  openOnlineFeedbackSystem() {
    if (this.platform.is('cordova')) {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_system', 'location=true');
    } else {
      this.iab.create('https://jpn.spab.gov.my/eApps/system/index.do', '_blank', 'location=true');
    }
  }

  uploadFile(event: FileList) {
    // The File object
    this.file = event.item(0);

  }

  async feedback(form){
    var checkvalue = form.get('picture').value;
    const alert = await this.alertController.create({
      header: ' Are you sure to submit feedback ?',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
           //if have value can upload the file
           if (checkvalue != null){
            this.authService.sendfeedback(this.ic, form.controls.message.value ,form.get('country_phone.phone').value, this.file);
           }
            //if the picture file value is not exist
             else if (checkvalue == null){
              this.authService.sendfeedback(this.ic, form.controls.message.value ,form.get('country_phone.phone').value, "");
            }
             
        }
      }
    ]
    });

    await alert.present();
     
    
    }
}
