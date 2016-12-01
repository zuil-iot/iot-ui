// External modules
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

// Widgets
import { AppHeaderComponent } from "./widgets/app-header";
import { MenuAsideComponent } from "./widgets/menu-aside";
import { MessagesBoxComponent} from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box";
import { ToggleSwitchComponent } from './widgets/toggle-switch/toggle-switch.component';
import { BoolIconComponent } from './widgets/bool-icon/bool-icon.component';
import { AnalogBarComponent } from './widgets/analog-bar/analog-bar.component';
import { TachometerComponent } from './widgets/tachometer/tachometer.component';
import { ChartistChartComponent } from './widgets/chartist-chart/chartist-chart.component';

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent,
  ToggleSwitchComponent,
  BoolIconComponent,
  AnalogBarComponent,
  TachometerComponent,
  ChartistChartComponent
];

// Services
import { UserService }			from "./services/user.service";
import { MessagesService }		from "./services/messages.service";
import { AuthService }			from "./services/auth.service";
import { CanActivateGuard }		from './services/guard.service';
import { NotificationService }		from './services/notification.service';
import { DevicesService }		from "./services/devices.service";
import { DeviceTypesService }		from "./services/device-types.service";
import { StreamService }		from "./services/stream.service";
import { IotApiService }		from "./services/iot-api.service";

let services =  [
  UserService,
  MessagesService,
  AuthService,
  CanActivateGuard,
  NotificationService,
  DevicesService,
  DeviceTypesService,
  StreamService,
  IotApiService
];

// Pages
//  Global Pages
import { HomeComponent }		from './pages/home/home.component';
// User Pages
import { DeviceListComponent }		from './pages/user/device-list/device-list.component';
import { DeviceDetailComponent }	from './pages/user/device-detail/device-detail.component';
// Admin Pages
import { DeviceRegComponent }		from './pages/admin/device-reg/device-reg.component';
// SuperAdmin Pages

let pages = [
  HomeComponent,
  DeviceRegComponent,
  DeviceListComponent,
  DeviceDetailComponent
]

// Main bootstrap
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
