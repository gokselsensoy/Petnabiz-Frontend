import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { VeterinaryClinic } from '../models/entities/veterinaryClinic';
import { ClinicDetail } from '../models/dtos/clinicDetail';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryClinicService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getVeterinaryClinics(): Observable<ListResponseModel<VeterinaryClinic>> {
    let newPath = this.apiUrl + "veterinaryclinic/getall"
    return this.httpClient.get<ListResponseModel<VeterinaryClinic>>(newPath);
  }

  getByCityId(cityId: number): Observable<ListResponseModel<VeterinaryClinic>> {
    let newPath = this.apiUrl + "veterinaryclinic/getbycityid?cityid=" + cityId
    return this.httpClient.get<ListResponseModel<VeterinaryClinic>>(newPath)
  }

  getByDistrictId(districtId: number): Observable<ListResponseModel<VeterinaryClinic>> {
    let newPath = this.apiUrl + "veterinaryclinic/getbydistrictid?districtid=" + districtId
    return this.httpClient.get<ListResponseModel<VeterinaryClinic>>(newPath)
  }

  getByClinicId(clinicId: number): Observable<SingleResponseModel<VeterinaryClinic>> {
    let newPath = this.apiUrl + "veterinaryclinic/getbyclinicid?clinicId=" + clinicId
    return this.httpClient.get<SingleResponseModel<VeterinaryClinic>>(newPath)
  }

  getClinicDetails(clinicId: number): Observable<SingleResponseModel<ClinicDetail>> {
    let newPath = this.apiUrl + "veterinaryclinic/clinicdetail?clinicId=" + clinicId
    return this.httpClient.get<SingleResponseModel<ClinicDetail>>(newPath)
  }

  add(veterinaryClinic: VeterinaryClinic): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "veterinaryclinic/add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, veterinaryClinic)
  }

  delete(veterinaryClinic: VeterinaryClinic): Observable<ResponseModel> {
    let newPath = this.apiUrl + "veterinaryclinic/delete"
    return this.httpClient.post<ResponseModel>(newPath, veterinaryClinic)
  }

  update(veterinaryClinic: VeterinaryClinic): Observable<ResponseModel> {
    let newPath = this.apiUrl + "veterinaryclinic/update"
    return this.httpClient.post<ResponseModel>(newPath, veterinaryClinic)
  }

  getByUserClinic(): Observable<ListResponseModel<VeterinaryClinic>> {
    let newPath = this.apiUrl + "veterinaryclinic/getuserclinic"
    return this.httpClient.get<ListResponseModel<VeterinaryClinic>>(newPath)
  }
}
