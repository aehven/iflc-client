import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Angular2TokenService } from 'angular2-token';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Autosize } from 'angular2-autosize/angular2-autosize';

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';

import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { AccountListComponent } from './account/account-list.component';
import { ContactDetailComponent } from './contact/contact-detail.component';
import { ContactListComponent } from './contact/contact-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ActivityListComponent } from './activity/activity-list.component';
import { ActivityDetailComponent } from './activity/activity-detail.component';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuardService] },
  { path: 'accounts', component: AccountListComponent, canActivate: [AuthGuardService] },
  { path: 'contact/:id', component: ContactDetailComponent, canActivate: [AuthGuardService] },
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuardService] },
  { path: 'contacts/:account_id', component: ContactListComponent, canActivate: [AuthGuardService] },
  { path: 'activities/:account_id', component: ActivityListComponent, canActivate: [AuthGuardService] },
  { path: 'activities', component: ActivityListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService]  }
]

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UserListComponent,
    AccountDetailComponent,
    AccountListComponent,
    ContactDetailComponent,
    ContactListComponent,
    ActivityListComponent,
    ActivityDetailComponent,
    LoginComponent,
    HomeComponent,
    FavoriteComponent,
    Autosize
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    NgbModule.forRoot(),
    NgbPaginationModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      placement: 'top'
    }),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
      Angular2TokenService,
      AuthGuardService,
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
