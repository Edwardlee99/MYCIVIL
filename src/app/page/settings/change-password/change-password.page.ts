import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from 'src/app/validator/password.validator';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  //ic
  ic : string;
  showPassword: boolean;
  showPassword1: boolean;
  
  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private authservice: AuthService,
    private storage: Storage
  ) { }

  ngOnInit() {
    
       //To get idetification cards number
       this.storage.get('ic')
       .then((val) => {
        this.ic = val; 
         
         error => console.error(error)
       });
    
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

    this.validations_form = this.formBuilder.group({
      cpassword: new FormControl("", Validators.required),
      matching_passwords: this.matching_passwords_group,
    });
  }

  validation_messages = {
    'cpassword': [
      { type: 'required', message: 'Password is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase of English letter(A-Z), one lowercase of English letter (a-z), and one number (0-9).' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };
  
  async changepassword(){
    const alert = await this.alertController.create({
      header: 'Warning!',
      cssClass: 'danger-alert',
      subHeader: 'You are about to update your Password',
      message: 'After clicking "Continue", you will be automatically logged out from the application for security reasons. Also, we advise you to log out and log in again to all other applications that require password authentication',
       buttons: ['Back', {
        text: 'Continue',
        handler: () => {
         this.authservice.changepassword(this.ic,this.validations_form.controls.cpassword.value, this.validations_form.get('matching_passwords.password').value)
        }
      }
    ]
    });

    await alert.present();
  }

  }


