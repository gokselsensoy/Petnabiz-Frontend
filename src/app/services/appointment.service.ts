import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Appointment } from '../models/entities/appointment';
import { AppointmentDetails } from '../models/dtos/appointmentDetails';
import { SingleResponseModel } from '../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getAppointments(): Observable<ListResponseModel<Appointment>> {
    let newPath = this.apiUrl + 'appointment/getall'
    return this.httpClient.get<ListResponseModel<Appointment>>(newPath);
  }

  getAvailableAppointments(selectedDate: Date): Observable<ListResponseModel<Appointment>> {
    let newPath = this.apiUrl + 'appointment/getavailable'
    return this.httpClient.get<ListResponseModel<Appointment>>(newPath + "?selectedDate=" + selectedDate);
  }

  addAppointment(appointment: Appointment): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'appointment/add'
    return this.httpClient.post<SingleResponseModel<number>>(newPath, appointment);
  }

  getByClinicId(clinicId: number): Observable<ListResponseModel<Appointment>> {
    let newPath = this.apiUrl + "appointment/getbyclinicid?clinicid=" + clinicId
    return this.httpClient.get<ListResponseModel<Appointment>>(newPath)
  }

  getWithDetails(clinicId: number): Observable<ListResponseModel<AppointmentDetails>> {
    let newPath = this.apiUrl + "appointment/getappointmentdetails?clinicid=" + clinicId
    return this.httpClient.get<ListResponseModel<AppointmentDetails>>(newPath)
  }
}
