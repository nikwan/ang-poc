import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { EspActionComponent } from './components/esp-action/esp-action.component';
import { EspAuthComponent } from './components/authentication/esp-auth/esp-auth.component';


@NgModule({
  declarations: [
    EspActionComponent,
    EspAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Import routing module
  ],
  providers: [],
  bootstrap: [EspActionComponent] // Bootstrapping the initial component
})
export class AppModule { }