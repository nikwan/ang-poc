import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';
import { LayoutComponent } from './components/header/layout/layout.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'protean-esp-app';

  constructor(private translate: TranslateService){
    this.defaultTranslation();
  }

  defaultTranslation() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    //this.espStorageService.checkIfTransactionIsActive('TXN123')
    //this.espStorageService.loadTemplateData();
  }
}
