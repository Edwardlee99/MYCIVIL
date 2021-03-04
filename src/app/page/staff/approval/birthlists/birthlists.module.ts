import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/pipe/shared-pipes.module';
import { IonicModule } from '@ionic/angular';

import { BirthlistsPageRoutingModule } from './birthlists-routing.module';

import { BirthlistsPage } from './birthlists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPipesModule,
    BirthlistsPageRoutingModule
  ],
  declarations: [BirthlistsPage]
})
export class BirthlistsPageModule {}
