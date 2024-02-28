import { Examination } from "./examination";
import { Pet } from "./pet";
import { User } from "./user";

export interface Appointment 
{
    id: number;
    appUserId: number;
    veterinaryClinicId: number;
    petId: number;
    entryDate: Date;
    appointmentDate: Date;

    examinations: Examination[];
}