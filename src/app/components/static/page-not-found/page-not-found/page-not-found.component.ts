import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../header/header/header.component';
import { EspAuthComponent } from '../../../authentication/esp-auth/esp-auth.component';
import { EspConstants } from '../../../../constants/constants/esp-constants';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [TranslateModule, HeaderComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit {
  ngOnInit(): void {
    console.log("***********PageNotFoundComponent")
  }
  EspConstants = EspConstants;
}
