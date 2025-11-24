import { Component, signal, effect, computed, inject } from '@angular/core';
import { WpService } from '../../services/wpService';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ErrorComponent } from "../../components/error/error.component";
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-site-creation',
  imports: [LoaderComponent, ErrorComponent],
  templateUrl: './site-creation.html',
  styleUrl: './site-creation.scss',
  standalone: true,
})
export class SiteCreation {
 private readonly wp = inject(WpService);
  private pages: any[] = ['creation-sites-internet', 'developpement-front-end-angular', 'developpement-back-end-wordpress'];
  page = toSignal(this.wp.page$, { initialValue: null });
  loading = toSignal(this.wp.loading$, { initialValue: false });
  error = toSignal(this.wp.error$, { initialValue: null });

  ngOnInit() {
    this.wp.loadBySlug(this.pages[0])
  }
}
