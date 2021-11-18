import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { TasksModule } from './tasks/tasks.module';
// import { UsersModule } from './users/users.module';
// import { AdminModule } from './admin/admin.module';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components';
import { MessagesService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TasksModule,
    // UsersModule,
    // AdminModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    MessagesService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
