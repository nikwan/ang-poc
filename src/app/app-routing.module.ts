import { NgModule, OnInit } from '@angular/core';
import { PageNotFoundComponent } from './components/static/page-not-found/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { EspAuthComponent } from './components/authentication/esp-auth/esp-auth.component';





export const routes: Routes = [
  { path: '', component: PageNotFoundComponent }, 
  { path: 'authentication', component: EspAuthComponent },
  { path: 'error', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit{ 

  ngOnInit(): void {
    console.log("AppRoutingModule:@@@@@@@@@", "AppRoutingModule")
  }

}
