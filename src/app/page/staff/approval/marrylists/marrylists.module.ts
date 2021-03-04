import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/pipe/shared-pipes.module';
import { IonicModule } from '@ionic/angular';

import { MarrylistsPageRoutingModule } from './marrylists-routing.module';

import { MarrylistsPage } from './marrylists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPipesModule,
    MarrylistsPageRoutingModule
  ],
  declarations: [MarrylistsPage]
})
export class MarrylistsPageModule {}
