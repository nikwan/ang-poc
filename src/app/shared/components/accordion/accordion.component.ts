import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Accordion } from "flowbite";
import type { AccordionOptions, AccordionItem, AccordionInterface } from "flowbite";
import type { InstanceOptions } from 'flowbite';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TxnInfo } from '../../../constants/txn-info';
import { EspConstants } from '../../../constants/esp-constants';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule,TranslateModule,FormsModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterViewInit {

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
    
  
    EspConstants = EspConstants;
    isAccordionOpen = true; // Track the state of the accordion
  
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    }
  
    ngAfterViewInit(): void {
      // This is for any post-initialization logic if needed
    }
}
