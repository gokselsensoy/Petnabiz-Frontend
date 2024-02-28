import { Pet } from "../entities/pet";

export class UserForLogin {
    id!: number;
    email!: string;
    name!: string;
    clinicId!: number;
    roles!: string[];
    pets!: Pet[];
}