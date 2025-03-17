import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspOtpComponent } from './esp-otp.component';

describe('EspOtpComponent', () => {
  let component: EspOtpComponent;
  let fixture: ComponentFixture<EspOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
