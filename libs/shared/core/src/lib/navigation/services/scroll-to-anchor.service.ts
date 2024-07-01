import { ViewportScroller } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ScrollToAnchorService {
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = inject(TuiDestroyService);

  private readonly activeFragmentSubject$ = new BehaviorSubject<string | null>(
    null,
  );

  readonly activeFragment$ = this.activeFragmentSubject$.asObservable();

  scrollToAnchor(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.viewportScroller.scrollToAnchor(fragment);
      this.activeFragmentSubject$.next(fragment);
    }
  }
}
