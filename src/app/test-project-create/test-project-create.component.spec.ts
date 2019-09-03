import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProjectCreateComponent } from './test-project-create.component';

describe('TestProjectCreateComponent', () => {
  let component: TestProjectCreateComponent;
  let fixture: ComponentFixture<TestProjectCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
