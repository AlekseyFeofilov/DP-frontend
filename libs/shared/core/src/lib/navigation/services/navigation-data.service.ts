import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay, tap } from 'rxjs';

@Injectable()
export class NavigationDataService {
  private readonly route = inject(ActivatedRoute);

  getData<T>(): Observable<T> {
    return this.route.data.pipe(
      tap(a => console.log(a)),
      map(data => data as T),
      shareReplay(1),
    );
  }
}
