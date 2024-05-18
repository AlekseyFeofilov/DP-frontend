export interface Company {
  id: string;
  name: string;
  contact: string | null;
  vacancies: string[];
  vacanciesNumber: string | null;
  isPartner: boolean;
  tutor: string;
  comment: string | null;
  communicationPlace: string | null;
}
