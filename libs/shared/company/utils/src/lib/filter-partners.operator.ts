import { CompanyDto } from '@dp/shared/company/dto';
import { Observable, map } from 'rxjs';

export function filterPartners(
  source$: Observable<Array<CompanyDto>>,
): Observable<Array<CompanyDto>> {
  return source$.pipe(
    map(companies => companies.filter(company => company.isPartner)),
  );
}
