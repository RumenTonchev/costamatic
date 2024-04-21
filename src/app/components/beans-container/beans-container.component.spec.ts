import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeansContainerComponent } from './beans-container.component';

describe('BeansContainerComponent', () => {
  let component: BeansContainerComponent;
  let fixture: ComponentFixture<BeansContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeansContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeansContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
