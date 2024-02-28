import { User } from "./user";
import { Vet } from "./vet";
import { Appointment } from "./appointment";
import { Examination } from "./examination";

export class VeterinaryClinic
{
    id!:number;
    cityId!: number;
    districtId!: number;
    clinicName!: string;
    email!: string;
    phoneNumber!: string;
    address!: string;

    users!: User[];
    vets!: Vet[];
    appointments!: Appointment[];
    examinations!: Examination[];

}