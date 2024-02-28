import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from '../models/responses/responseModel';
import { Examination } from '../models/entities/examination';
import { ExaminationDto } from '../models/dtos/examinationDto';
import { PetExaminationDetails } from '../models/dtos/petExaminationDetails';
import { PastExaminationDetails } from '../models/dtos/pastExaminationDetails';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getExaminations(): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getall"
    return this.httpClient.get<ListResponseModel<Examination>>(newPath);
  }

  getByExaminationId(examinationId: number): Observable<SingleResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getbyexaminationid?examinationid=" + examinationId
    return this.httpClient.get<SingleResponseModel<Examination>>(newPath)
  }

  getByPetId(petId: number): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getbypetid?petid=" + petId
    return this.httpClient.get<ListResponseModel<Examination>>(newPath)
  }

  getByPetUserId(userId: number): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getbypetuserid?userid=" + userId
    return this.httpClient.get<ListResponseModel<Examination>>(newPath)
  }

  getByVetId(vetId: number): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getbyvetid?vetid=" + vetId
    return this.httpClient.get<ListResponseModel<Examination>>(newPath)
  }

  getByClinicId(clinicId: number): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getbyclinicid?clinicid=" + clinicId
    return this.httpClient.get<ListResponseModel<Examination>>(newPath)
  }

  getByExaminationDetail(userId: number): Observable<ListResponseModel<ExaminationDto>> {
    let newPath = this.apiUrl + "examination/examinationdetail?userid=" + userId
    return this.httpClient.get<ListResponseModel<ExaminationDto>>(newPath)
  }

  getByPetExaminationDetail(petId: number): Observable<ListResponseModel<PetExaminationDetails>> {
    let newPath = this.apiUrl + "examination/petexaminationdetail?petid=" + petId
    return this.httpClient.get<ListResponseModel<PetExaminationDetails>>(newPath)
  }

  getByPastExaminationDetail(clinicId: number): Observable<ListResponseModel<PastExaminationDetails>> {
    let newPath = this.apiUrl + "examination/pastexaminationdetail?clinicid=" + clinicId
    return this.httpClient.get<ListResponseModel<PastExaminationDetails>>(newPath)
  }



  add(examination: Examination): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "examination/add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, examination)
  }

  delete(examination: Examination): Observable<ResponseModel> {
    let newPath = this.apiUrl + "examination/delete"
    return this.httpClient.post<ResponseModel>(newPath, examination)
  }

  update(examination: Examination): Observable<ResponseModel> {
    let newPath = this.apiUrl + "examination/update"
    return this.httpClient.post<ResponseModel>(newPath, examination)
  }
}
