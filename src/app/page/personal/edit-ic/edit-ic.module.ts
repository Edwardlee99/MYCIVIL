import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditIcPageRoutingModule } from './edit-ic-routing.module';

import { EditIcPage } from './edit-ic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditIcPageRoutingModule
  ],
  declarations: [EditIcPage]
})
export class EditIcPageModule {}
