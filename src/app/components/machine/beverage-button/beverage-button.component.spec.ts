import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageButtonComponent } from './beverage-button.component';

describe('BeverageButtonComponent', () => {
  let component: BeverageButtonComponent;
  let fixture: ComponentFixture<BeverageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeverageButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeverageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
