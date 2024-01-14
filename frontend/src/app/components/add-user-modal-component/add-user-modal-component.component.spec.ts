import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserModalComponentComponent } from './add-user-modal-component.component';

describe('AddUserModalComponentComponent', () => {
  let component: AddUserModalComponentComponent;
  let fixture: ComponentFixture<AddUserModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
