import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { AdhaarInputComponent } from '../../../shared/components/adhaar-input/adhaar-input.component';
import { HeaderComponent } from '../../header/header/header.component';
import { CommonModule } from '@angular/common';
import { EspConstants } from '../../../constants/constants/esp-constants';
import { TxnInfo } from '../../../constants/constants/txn-info';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-esp-auth',
  standalone: true,
  imports: [HeaderComponent,TranslateModule,FormsModule,FooterComponent,AdhaarInputComponent,CommonModule,AccordionComponent,CheckboxComponent,ButtonComponent],
  templateUrl: './esp-auth.component.html',
  styleUrl: './esp-auth.component.css'
})
export class EspAuthComponent {


  txnInfo: TxnInfo = {
    signDate: "16-12-2024",
    signTime: "12:87:00",
    espName: "ABC",
    aspName: "National Securities Depository Limited",
    aspTxnId: "TID12345612345",
    keyword_1: "asdfgh",
    keyword_2: "asdfg",
    response_url: "https://oabscoxuwehfi.com",
    client_logo: "https://oabscoxuwehfi.com/image.jpg"
  };
  id: string = "";
  
  ngOnInit(): void {
    console.log("***********esp-auth")
  }
  EspConstants = EspConstants;
  idEnter: boolean = true;


  setAadhaarInput(event: any) {
    this.id = event;
  }
}
