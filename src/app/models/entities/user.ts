import { Pet } from "./pet";
import { Appointment } from "./appointment";
import { Examination } from "./examination";

export class User 
{
    id!: number;
    veterinaryClinicId!: number;
    TCID!: string;
    name!: string;
    surname!: string;
    email!: string;
    roles!: string[];

    pets!: Pet[];
    appointments!: Appointment[];
    examinations!: Examination[];
}