import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyStaffPageRoutingModule } from './modify-staff-routing.module';

import { ModifyStaffPage } from './modify-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyStaffPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifyStaffPage]
})
export class ModifyStaffPageModule {}
