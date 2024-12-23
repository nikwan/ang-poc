import { Component } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspConstants } from '../../../constants/constants/esp-constants';


export const availableLanguages: {label: string, value: string}[] = [
  {label: 'English', value: 'en'},
  {label: 'Hindi', value: 'hi'},
  {label: 'Telugu', value: 'te'},
  {label: 'Kannada', value: 'kn'},
  {label: 'Malayalam', value: 'ml'},
  {label: 'Bengali', value: 'bn'},
  {label: 'Gujarati', value: 'gu'},
  {label: 'Urdu', value: 'ur'},
  {label: 'Marathi', value: 'mr'}
]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logoUrl?: string;
  locale: string = 'en';
  showLanguageChange: boolean = true;
  availableLanguages = availableLanguages;
  EspConstants = EspConstants;

  constructor(
    private translate: TranslateService
  ) {
    //this.logoUrl = this.espStorageService.txnInfo?.client_logo;
  }

  setLanguage() {
    this.translate.use(this.locale);
    console.log('setLanguage')
    //this.storageService.set("locale", this.locale);
  }
}
