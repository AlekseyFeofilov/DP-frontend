import { Data, Route } from '@angular/router';

export interface RouteWithTypedData<T extends Data> extends Route {
  data?: T;
}
