import {VeterinaryClinic} from "./veterinaryClinic";

export class District
{
    id!: number;
    cityId!: number;
    name!: string;

    veterinaryClinics!: VeterinaryClinic[];
}