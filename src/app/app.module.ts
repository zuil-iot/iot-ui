//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,
  AngularFireModule.initializeApp(environment.firebase),
  ToasterModule
];

import { AppHeaderComponent } from "./widgets/app-header";
import { MenuAsideComponent } from "./widgets/menu-aside";
import { MessagesBoxComponent} from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box";
import { ToggleSwitchComponent } from './widgets/toggle-switch/toggle-switch.component';

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent,
  ToggleSwitchComponent
];

import { UserService } from "./services/user.service";
import { MessagesService } from "./services/messages.service";
import { AuthService } from "./services/auth.service";
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { DevicesService } from "./services/devices.service";

let services =  [
  UserService,
  MessagesService,
  AuthService,
  CanActivateGuard,
  NotificationService,
  DevicesService
];

import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { ClientComponent } from './pages/client/client.component';
import { DeviceRegComponent } from './pages/device-reg/device-reg.component';

let pages = [
  HomeComponent,
  PageNumComponent,
  ClientComponent,
  DeviceRegComponent
]

//main bootstrap
import { AppComponent } from './app.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    ...widgets,
    ...pages,
  ],
  imports: [
    ...modules,
    routing
  ],
  providers: [
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
