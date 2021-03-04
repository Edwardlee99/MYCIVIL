import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StaffListPageRoutingModule } from './staff-list-routing.module';
import { StaffListPage } from './staff-list.page';
import { SharedPipesModule } from 'src/app/pipe/shared-pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffListPageRoutingModule,
    SharedPipesModule
  ],
  declarations: [StaffListPage]
})
export class StaffListPageModule {}
