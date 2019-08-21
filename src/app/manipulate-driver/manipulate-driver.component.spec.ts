import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManipulateDriverComponent } from './manipulate-driver.component';

describe('ManipulateDriverComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ManipulateDriverComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ManipulateDriverComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'driver'`, () => {
    const fixture = TestBed.createComponent(ManipulateDriverComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('driver');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ManipulateDriverComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to driver!');
  });
});
