import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementCreateComponent } from './role-management-create.component';

describe('RoleManagementCreateComponent', () => {
  let component: RoleManagementCreateComponent;
  let fixture: ComponentFixture<RoleManagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
