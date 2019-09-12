import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteRunHistoryComponent } from './test-suite-run-history.component';

describe('TestSuiteRunHistoryComponent', () => {
  let component: TestSuiteRunHistoryComponent;
  let fixture: ComponentFixture<TestSuiteRunHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteRunHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteRunHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
