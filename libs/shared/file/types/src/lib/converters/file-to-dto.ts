export function convertFileToDto(file: File): FormData {
  const dto = new FormData();
  dto.append('formFile', file, file.name);
  return dto;
}
