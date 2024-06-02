import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable()
export class NavigationDataService {
  private readonly route = inject(ActivatedRoute);

  getData<T>(): Observable<T> {
    return this.route.data.pipe(
      map(data => data as T),
      shareReplay(1),
    );
  }
}
