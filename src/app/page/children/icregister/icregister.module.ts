import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { IcregisterPageRoutingModule } from './icregister-routing.module';

import { IcregisterPage } from './icregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    IcregisterPageRoutingModule
  ],
  declarations: [IcregisterPage]
})
export class IcregisterPageModule {}
