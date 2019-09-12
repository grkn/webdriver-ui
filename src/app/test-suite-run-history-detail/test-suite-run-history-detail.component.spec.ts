import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteRunHistoryDetailComponent } from './test-suite-run-history-detail.component';

describe('TestSuiteRunHistoryDetailComponent', () => {
  let component: TestSuiteRunHistoryDetailComponent;
  let fixture: ComponentFixture<TestSuiteRunHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteRunHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteRunHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
