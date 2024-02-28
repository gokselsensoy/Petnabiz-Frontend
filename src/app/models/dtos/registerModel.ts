import { LoginModel } from "./loginModel";

export interface RegisterModel extends LoginModel {
    tcid: string;
    name: string;
    surname: string;
    confirmPassword: string;
}