import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspActionComponent } from './esp-action.component';

describe('EspActionComponent', () => {
  let component: EspActionComponent;
  let fixture: ComponentFixture<EspActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
