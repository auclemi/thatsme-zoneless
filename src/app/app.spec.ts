import { waitForSignal } from './utils/tests/test-helpers';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
describe('App', () => {
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('updates title after service response', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    const expected = 'Création sites internet';
    // DOM auto-updated thanks to signals
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('h1')?.textContent).toContain(expected);
    })
  });
});

