import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { SiteCreation } from './site-creation';
import { WpService } from '../../services/wpService';


class FakeService {
  page$ = new BehaviorSubject<any | null>(null);
  error$ = new BehaviorSubject<string | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  loadBySlug(slug: string) {
    if (slug === 'valid-slug') {
      this.page$.next({ title: { rendered: 'Existing page' }, content: { rendered: '<p>Content</p>' } });
      this.error$.next(null);
    
    } else {
      this.page$.next(null);
      this.error$.next('Page not found');
      this.page$.next(null);
      this.error$.next('Page not found');
    }
  }
}


fdescribe('SiteCreationComponent', () => {
  let fixture: ComponentFixture<SiteCreation>;
  let component: SiteCreation;
  let fakeService: FakeService;

  beforeEach(async () => {
    fakeService = new FakeService();

    fakeService = new FakeService();

    await TestBed.configureTestingModule({
      imports: [SiteCreation],
      providers: [{ provide: WpService, useValue: fakeService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteCreation);
    component = fixture.componentInstance;

  });

  it('shows page when slug is valid', () => {
    component.slug = 'valid-slug';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Existing page');
  });

  it('shows error when slug is invalid', () => {
    component.slug = 'wrong-slug';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent)
      .toContain('Page not found');
  });
});

