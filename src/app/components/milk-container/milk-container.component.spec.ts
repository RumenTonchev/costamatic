import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkContainerComponent } from './milk-container.component';

describe('MilkContainerComponent', () => {
  let component: MilkContainerComponent;
  let fixture: ComponentFixture<MilkContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilkContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MilkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
