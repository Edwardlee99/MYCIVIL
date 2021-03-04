import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

 
  validations_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  onSubmit(form: FormGroup){
    this.authService.forget(form.controls.email.value);
  }
}
