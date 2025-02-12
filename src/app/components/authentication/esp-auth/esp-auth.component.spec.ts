import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspAuthComponent } from './esp-auth.component';

describe('EspAuthComponent', () => {
  let component: EspAuthComponent;
  let fixture: ComponentFixture<EspAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
