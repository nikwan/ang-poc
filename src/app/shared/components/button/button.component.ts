import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EspConstants } from '../../../constants/constants/esp-constants';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  loadingText: string | undefined = undefined;

  @Input() type: string = "primary";
  @Input() secondary: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading?: boolean = false;
  @Input() text: string = "";

  @ViewChild('appbutton', { static: true })
  button?: ElementRef<HTMLButtonElement>;

  actionLoadingMessage: string = EspConstants.PLEASE_WAIT;
  actionLoadingTimeout: any = null;
  actionLongerLoadingTimeout: any = null;

  @Input()
  set setLoadingWithText(value: string | undefined) {
    this.loadingText = value;
    if (this.loadingText === undefined) {
      this.actionLoadingMessage = EspConstants.PLEASE_WAIT;
      this.clearLoadingTimeouts();
    } else {
      this.updateLoadingMessage();
    }
  }

  constructor() {}

  ngAfterViewInit(): void {
    if (this.type === 'primary') {
      this.button?.nativeElement.classList.add('btn-primary');
    } else if (this.type === 'secondary') {
      this.button?.nativeElement.classList.add('btn-secondary');
    }
  }

  updateLoadingMessage() {
    this.clearLoadingTimeouts();
    this.actionLoadingMessage = this.loadingText!;
    this.actionLoadingTimeout = setTimeout(() => {
      this.actionLoadingMessage = EspConstants.LOADING_MSG_1;

      this.actionLongerLoadingTimeout = setTimeout(() => {
        this.actionLoadingMessage = EspConstants.LOADING_MSG_2;
      }, 5000);
    }, 4000);
  }

  clearLoadingTimeouts() {
    if (this.actionLoadingTimeout) {
      clearTimeout(this.actionLoadingTimeout);
      this.actionLoadingTimeout = null;
    }

    if (this.actionLongerLoadingTimeout) {
      clearTimeout(this.actionLongerLoadingTimeout);
      this.actionLongerLoadingTimeout = null;
    }
  }
}
