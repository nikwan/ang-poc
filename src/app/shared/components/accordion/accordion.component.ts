import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Accordion } from "flowbite";
import type { AccordionOptions, AccordionItem, AccordionInterface } from "flowbite";
import type { InstanceOptions } from 'flowbite';
import { EspConstants } from '../../../constants/constants/esp-constants';
import { TxnInfo } from '../../../constants/constants/txn-info';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
    
  
  ngAfterViewInit(): void {
    const accordionEl = document.querySelector('#accordion-flush') as HTMLElement;
    
    if (!accordionEl) {
      console.error('Accordion element not found');
      return;
    }

    const accordionItems: AccordionItem[] = [
      {
        id: 'accordion-flush-heading-1',
        triggerEl: document.querySelector('accordion-flush-heading-1') as HTMLElement,
        targetEl: document.querySelector('#accordion-flush-body-1') as HTMLElement,
        active: true
      },
      
    ];

    // Options with default values
    const options: AccordionOptions = {
      alwaysOpen: true,
      activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen: (item) => {
          console.log('Accordion item has been shown');
          console.log(item);
      },
      onClose: (item) => {
          console.log('Accordion item has been hidden');
          console.log(item);
      },
      onToggle: (item) => {
          console.log('Accordion item has been toggled');
          console.log(item);
      },
    };

    // Instance options object
    const instanceOptions: InstanceOptions = {
      id: 'accordion-flush',
      override: true
    };

    const accordion: AccordionInterface = new Accordion(accordionEl, accordionItems, options, instanceOptions);

    // Open accordion item based on id
    accordion.open('accordion-flush-heading-1');

    // Destroy accordion
    accordion.destroy();

    
  }

  EspConstants = EspConstants;
}
