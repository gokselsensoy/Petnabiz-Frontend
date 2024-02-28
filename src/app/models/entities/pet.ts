import { Examination } from "./examination";
import { Appointment } from "./appointment";

export interface Pet 
{
    id: number;
    appUserId: number;
    name: string;
    species: string;
    breed: string;
    gender: string;
    
    examinations: Examination[];
    appointments: Appointment[];
}