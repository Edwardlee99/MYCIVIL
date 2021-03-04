import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.page.html',
  styleUrls: ['./edit-profile-image.page.scss'],
})
export class EditProfileImagePage implements OnInit {

  takeimage = false;
  uploadimage = false;
  mobilephone = false;
  picture_form: FormGroup;
  id: string;
  capturedSnapURL:string;
  
  //File Object
  file: any;

  constructor(
    public formBuilder: FormBuilder,
    private adminService: AdminService,
    public alertController: AlertController,
    private storage: Storage,
    private camera: Camera,
    public plt: Platform

  ) { }

  ngOnInit() {

    if(this.plt.is('cordova')){
      this.mobilephone = true;
    }

    this.storage.get('ic')
      .then((val) => {
        this.id = val;
        error => console.error(error)
      });

     //Upload Picture
     this.picture_form = this.formBuilder.group({
      picture: new FormControl("", Validators.required)
    });
  }

  validation_messages = {
    'picture': [
      { type: 'required', message: 'Please select picture to update!!!' }
    ]
  };

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

    //To get files
    uploadFile(event: FileList) {
      // The File object
      this.file = event.item(0);
    }

    uploadpicture(){
      this.uploadimage = true;
    }

     //To update the user picture
     async UpdatePicture() {
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'Are you sure you want to upload the picture?',
         buttons: ['No', {
          text: 'Yes',
          handler: () => {
            this.adminService.picture_user(this.id, this.file);
            this.picture_form.reset();
            this.uploadimage = false;
          }
        }
      ]
      });
      await alert.present();
    }

    takepicture(){
      this.camera.getPicture(this.cameraOptions).then((imageData) => {
      //this.camera.DestinationType.FILE_URI gives file URI saved in local

       //this.camera.DestinationType.DATA_URL gives base64 URI
      
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.capturedSnapURL = base64Image;
        this.takeimage = true;
      }, (err) => {
        
        console.log(err);
        // Handle error
      });
    }

     //To update the user picture by take picture
     async UploadPicture() {
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'Are you sure you want to upload the picture?',
         buttons: ['No', {
          text: 'Yes',
          handler: () => {
            this.adminService.picture_user(this.id, this.file);
            this.takeimage = false;
          }
        }
      ]
      });
      await alert.present();
    }

  

}
