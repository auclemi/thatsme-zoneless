
// import { waitForSignal } from './utils/tests/test-helpers';
// import { TestBed } from '@angular/core/testing';
// import { App } from './app';
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
// fdescribe('App', () => {
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(App);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it('updates title after service response', async () => {
//     const fixture = TestBed.createComponent(App);
//     const component = fixture.componentInstance;
//     const compiled = fixture.nativeElement as HTMLElement;

//     // Initial render 
//     fixture.detectChanges();
//     const expected = 'Création sites internet';

//     // Wait until the signal matches 
//     await waitForSignal(() => component.page()?.title?.rendered, expected, 10000);

//     // DOM auto-updated thanks to signals
//     expect(compiled.querySelector('h1')?.textContent).toContain(expected);
//   });
// });



import { waitForSignal } from './utils/tests/test-helpers';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
fdescribe('App', () => {
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('updates title after service response', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    // Initial render 
    // fixture.detectChanges();
    const expected = 'Création sites internet';

    // Wait until the signal matches 
    // await component.page()?.title?.rendered === expected;
    // await new Promise(res => setTimeout(res, 500));
    // for (let i = 0; i < 100; i++) {

    //   if (component.page()?.title?.rendered === expected) {
    //     continue;
    //   }
    //   await new Promise(res => setTimeout(res, 100));
      // fixture.detectChanges();
    // }
    // DOM auto-updated thanks to signals
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('h1')?.textContent).toContain(expected);
    })
  });
});

