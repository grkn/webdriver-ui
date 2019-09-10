import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTestSuitesComponent } from './run-test-suites.component';

describe('RunTestSuitesComponent', () => {
  let component: RunTestSuitesComponent;
  let fixture: ComponentFixture<RunTestSuitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunTestSuitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTestSuitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
