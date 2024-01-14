import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldModalComponentComponent } from './add-field-modal-component.component';

describe('AddFieldModalComponentComponent', () => {
  let component: AddFieldModalComponentComponent;
  let fixture: ComponentFixture<AddFieldModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFieldModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFieldModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
