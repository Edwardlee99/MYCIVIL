import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { EditProfileImagePageRoutingModule } from './edit-profile-image-routing.module';

import { EditProfileImagePage } from './edit-profile-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditProfileImagePageRoutingModule
  ],
  declarations: [EditProfileImagePage]
})
export class EditProfileImagePageModule {}
