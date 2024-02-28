import { District } from "./district";
import { VeterinaryClinic } from "./veterinaryClinic";

export class City
{
    id!:number;
    name!: string;

    districts!: District[];
    veterinaryClinics!: VeterinaryClinic[];
}