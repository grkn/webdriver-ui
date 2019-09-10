import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTestDetailComponent } from './run-test-detail.component';

describe('RunTestDetailComponent', () => {
  let component: RunTestDetailComponent;
  let fixture: ComponentFixture<RunTestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunTestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
