import { NgModule, OnInit } from '@angular/core';
import { PageNotFoundComponent } from './components/static/page-not-found/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { EspAuthComponent } from './components/authentication/esp-auth/esp-auth.component';
import { EspActionComponent } from './components/esp-action/esp-action.component';
import { OtpInputComponent } from './shared/components/otp-input/otp-input.component';
import { EspOtpComponent } from './components/esp-otp/esp-otp.component';





export const routes: Routes = [
  { path: 'auth', component: EspAuthComponent },  // When no path is specified, redirect to EspAuthComponent
  { path: 'error', component: PageNotFoundComponent },  // Custom error route
  { path: 'action', component: EspActionComponent }, // Default route to EspActionComponent
  // { path: '', component: EspOtpComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit{ 

  ngOnInit(): void {
    console.log("AppRoutingModule:@@@@@@@@@", "AppRoutingModule")
  }

}
