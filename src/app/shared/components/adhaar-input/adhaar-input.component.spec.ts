import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhaarInputComponent } from './adhaar-input.component';

describe('AdhaarInputComponent', () => {
  let component: AdhaarInputComponent;
  let fixture: ComponentFixture<AdhaarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdhaarInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdhaarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
