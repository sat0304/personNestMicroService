// DTO data transfer object -промежуточный макет данных для маршрутизации,
// вынесен в отдельный файл для разделения кода на функциональные подмодули
export class CreatePersonDto {
    personKinopoiskId: number;
    photoLink: string;
    name: string;
    enName: string;
}