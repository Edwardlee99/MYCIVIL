import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStaffPageRoutingModule } from './add-staff-routing.module';

import { AddStaffPage } from './add-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStaffPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddStaffPage]
})
export class AddStaffPageModule {}
