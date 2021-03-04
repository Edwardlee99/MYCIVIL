import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyUserPageRoutingModule } from './modify-user-routing.module';

import { ModifyUserPage } from './modify-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifyUserPage]
})
export class ModifyUserPageModule {}
