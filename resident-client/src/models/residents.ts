export class Resident {
  constructor (
    public id: number,
    public first_name: string,
    public middle_name: string,
    public last_name: string,
    public email: string,
    public date_issued: string,
    public valid_until: string,
    public date_of_birth: string,
    public gender: string,
    public place_of_birth: string,
    public nationality: string,
    public civil_status: string
  ){}
}