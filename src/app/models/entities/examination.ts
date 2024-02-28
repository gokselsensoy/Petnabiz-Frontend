export interface Examination
{
    id: number;
    veterinaryClinicId: number;
    petId: number;
    appUserId: number;
    vetId: number;
    appointmentId: number;
    examinationDate: Date;
    description: string;
}