export interface CreateCompanyDto {
  companyName: string;
  placesQuantity?: string | null;
  communicationPlace?: string | null;
  contact?: string | null;
  comment?: string | null;
  isPartner: boolean;
  authorizedDelegate: string;
  vacancy: string;
}
