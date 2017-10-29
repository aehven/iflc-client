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
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';

import { BackgroundImage } from './background/background.directive';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { CeeDetailComponent } from './cee/cee-detail.component';
import { CeeListComponent } from './cee/cee-list.component';
import { FlavorDetailComponent } from './flavor/flavor-detail.component';
import { FlavorListComponent } from './flavor/flavor-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NoteListComponent } from './note/note-list.component';
import { NoteDetailComponent } from './note/note-detail.component';

import {MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";

const appRoutes: Routes = [
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'cee/:id', component: CeeDetailComponent, canActivate: [AuthGuardService] },
  { path: 'cees', component: CeeListComponent, canActivate: [AuthGuardService] },
  { path: 'flavor/:id', component: FlavorDetailComponent, canActivate: [AuthGuardService] },
  { path: 'flavors', component: FlavorListComponent, canActivate: [AuthGuardService] },
  { path: 'flavors/:cee_id', component: FlavorListComponent, canActivate: [AuthGuardService] },
  { path: 'notes/:cee_id', component: NoteListComponent, canActivate: [AuthGuardService] },
  { path: 'notes', component: NoteListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService]  }
]

@NgModule({
  declarations: [
    AppComponent,
    BackgroundImage,
    UserDetailComponent,
    UserListComponent,
    CeeDetailComponent,
    CeeListComponent,
    FlavorDetailComponent,
    FlavorListComponent,
    NoteListComponent,
    NoteDetailComponent,
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
    SimpleNotificationsModule.forRoot(),
    ImageUploadModule.forRoot(),
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatCardModule
  ],
  providers: [
      Angular2TokenService,
      AuthGuardService,
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
