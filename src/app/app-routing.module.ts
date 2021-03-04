import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  { 
    path: 'more', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/more/more.module').then(m => m.MorePageModule)
  },
  { 
    path: 'profile', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./page/auth/forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'admin', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'add_staff',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/admin/add-staff/add-staff.module').then( m => m.AddStaffPageModule)
  },
  {
    path: 'add_user',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/admin/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'staff',
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        loadChildren: () => import('./page/admin/staff-list/staff-list.module').then(m => m.StaffListPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./page/admin/staff-list/modify-staff/modify-staff.module').then(m => m.ModifyStaffPageModule)
      },
    ]
  },
  {
    path: 'citizen',
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        loadChildren: () => import('./page/admin/user-list/user-list.module').then(m => m.UserListPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./page/admin/user-list/modify-user/modify-user.module').then(m => m.ModifyUserPageModule)
      },
    ]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./page/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'marry-register',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/marriage/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ic-register',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/children/icregister/icregister.module').then( m => m.IcregisterPageModule)
  },
  {
    path: 'birth-register',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/children/birthregister/birthregister.module').then( m => m.BirthregisterPageModule)
  },
  {
    path: 'children-profile',
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        loadChildren: () => import('./page/children/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./page/children/profile/profile-detail/profile-detail.module').then(m => m.ProfileDetailPageModule)
      },
    ]
  },
  {
    path: 'settings',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/settings/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/settings/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-profile-image',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./page/settings/edit-profile-image/edit-profile-image.module').then( m => m.EditProfileImagePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./page/auth/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'marriage-profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/marriage/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'renew-ic',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/personal/renew-ic/renew-ic.module').then( m => m.RenewIcPageModule)
  },
  {
    path: 'edit-ic',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/personal/edit-ic/edit-ic.module').then( m => m.EditIcPageModule)
  },
  {
    path: 'approval',
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        loadChildren: () => import('./page/staff/approval/approval.module').then(m => m.ApprovalPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./page/staff/approval/lists/lists.module').then(m => m.ListsPageModule )
      },
      {
        path: '',
        loadChildren: () => import('./page/staff/approval/marrylists/marrylists.module').then(m => m.MarrylistsPageModule )
      },
      {
        path: '',
        loadChildren: () => import('./page/staff/approval/birthlists/birthlists.module').then(m => m.BirthlistsPageModule )
      },
      {
        path: '',
        loadChildren: () => import('./page/staff/approval/details/details.module').then(m => m.DetailsPageModule)
      },
    ]
  },
  { // this path must always be at the end of the routes array
    path: '**',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
