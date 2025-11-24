import { TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

import { SiteCreation } from './site-creation';
import { WpService } from '../../services/wpService'; // adjust to your actual token

class FakeWpService {
  private _page = signal<any | null>(null);
  private _error = signal<any | null>(null);
  private _loading = signal<any | null>(null);

  page = computed(() => this._page());
  error = computed(() => this._error());
  loading = computed(() => this._loading());

  loadBySlug(slug: string) {
    // Synchronously seed the signal
    if (slug === 'creation-sites-internet') {
      this._page.set({
        title: { rendered: 'Création sites internet' },
        content: { rendered: '<p>Hello world</p>' }
      });
    } else {
      this._error.set(true);
    }
  }
}

fdescribe('SiteCreation (zoneless)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCreation],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: WpService, useClass: FakeWpService }
      ]
    }).compileComponents();
  });


  it('renders title when loadBySlug sets page()', () => {
    const fixture = TestBed.createComponent(SiteCreation);
    fixture.detectChanges(); // component calls wp.loadBySlug() in ngOnInit
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Création sites internet');
  });
});


