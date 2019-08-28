import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleToUserComponent } from './add-role-to-user.component';

describe('AddRoleToUserComponent', () => {
  let component: AddRoleToUserComponent;
  let fixture: ComponentFixture<AddRoleToUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoleToUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
