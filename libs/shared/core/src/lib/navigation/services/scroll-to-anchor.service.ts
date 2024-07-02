import { ViewportScroller } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ScrollToAnchorService {
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly route = inject(ActivatedRoute);

  readonly activeFragment$ = this.route.fragment;

  scrollToAnchor(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.viewportScroller.scrollToAnchor(fragment);
    }
  }
}
