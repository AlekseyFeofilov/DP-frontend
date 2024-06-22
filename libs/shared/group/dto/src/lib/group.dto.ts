export enum GradeDto {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
  Fourth = 'Fourth',
}

export interface GroupDto {
  id: string;
  number: number;
  grade: GradeDto;
}
