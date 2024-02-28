import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Vet } from '../models/entities/vet';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class VetService {
  
  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getVets(): Observable<ListResponseModel<Vet>> {
    let newPath = this.apiUrl + "vet/getall"
    return this.httpClient.get<ListResponseModel<Vet>>(newPath);
  }

  getByVetId(vetId: number): Observable<SingleResponseModel<Vet>> {
    let newPath = this.apiUrl + "vet/getbyvetid?vetid=" + vetId
    return this.httpClient.get<SingleResponseModel<Vet>>(newPath)
  }

  getByClinicId(clinicId: number): Observable<ListResponseModel<Vet>> {
    let newPath = this.apiUrl + "vet/getbyclinicid?clinicid=" + clinicId
    return this.httpClient.get<ListResponseModel<Vet>>(newPath)
  }
  
  add(vet: Vet): Observable<SingleResponseModel<Vet>> {
    let newPath = this.apiUrl + "vet/add"
    return this.httpClient.post<SingleResponseModel<Vet>>(newPath, vet);
  }

  delete(vet: Vet): Observable<ResponseModel> {
    let newPath = this.apiUrl + "vet/delete"
    return this.httpClient.post<ResponseModel>(newPath, vet)
  }

  update(vet: Vet): Observable<ResponseModel> {
    let newPath = this.apiUrl + "vet/update"
    return this.httpClient.post<ResponseModel>(newPath, vet)
  }
}
