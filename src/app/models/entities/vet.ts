import { Examination } from "./examination";

export interface Vet 
{
    id: number;
    veterinaryClinicId: number;
    firstName: string;
    lastName: string;
    gender: string;

    examinations: Examination[];
}