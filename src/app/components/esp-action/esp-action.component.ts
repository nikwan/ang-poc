import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esp-action',
  standalone: true,
  imports: [],
  templateUrl: './esp-action.component.html',
  styleUrl: './esp-action.component.css'
})
export class EspActionComponent  {
  constructor(private router: Router) { }
  redirectToAuth(txnId: string, authMod: string): void {
    // Set a timeout of 5 seconds before navigating
    setTimeout(() => {
      // Navigate to /auth with dynamic query parameters
      this.router.navigate(['/auth'], {
        queryParams: { tid: txnId, authMod: authMod }
      });
    }, 5000); // 5000ms = 5 seconds
  }
}
