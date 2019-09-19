import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteDetailComponent } from './test-suite-detail.component';

describe('TestSuiteDetailComponent', () => {
  let component: TestSuiteDetailComponent;
  let fixture: ComponentFixture<TestSuiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
