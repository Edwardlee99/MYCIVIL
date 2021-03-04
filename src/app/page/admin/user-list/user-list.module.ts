import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserListPageRoutingModule } from './user-list-routing.module';
import { UserListPage } from './user-list.page';
import { SharedPipesModule } from 'src/app/pipe/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListPageRoutingModule,
    SharedPipesModule
  ],
  declarations: [UserListPage]
})
export class UserListPageModule {}
