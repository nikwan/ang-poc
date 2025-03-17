import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspBioComponent } from './esp-bio.component';

describe('EspBioComponent', () => {
  let component: EspBioComponent;
  let fixture: ComponentFixture<EspBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
