export enum EmploymentStatus {
  NonVerified = 'Не подтверждено',
  Verified = 'Подтверждено',
}

export interface Employment {
  vacancy: string;
  comment?: string;
  companyName: string;
  status: EmploymentStatus;
}
