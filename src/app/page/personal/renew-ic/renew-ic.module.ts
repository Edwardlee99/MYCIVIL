import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { RenewIcPageRoutingModule } from './renew-ic-routing.module';

import { RenewIcPage } from './renew-ic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RenewIcPageRoutingModule
  ],
  declarations: [RenewIcPage]
})
export class RenewIcPageModule {}
