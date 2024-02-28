import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/entities/pet';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getPets(): Observable<ListResponseModel<Pet>> {
    let newPath = this.apiUrl + "pet/getall"
    return this.httpClient.get<ListResponseModel<Pet>>(newPath);
  }

  getByPetId(petId: number): Observable<SingleResponseModel<Pet>> {
    let newPath = this.apiUrl + "pet/getbypetid?petId=" + petId;
    return this.httpClient.get<SingleResponseModel<Pet>>(newPath)
  }

  getByPetUserId(userId: number): Observable<ListResponseModel<Pet>> {
    let newPath = this.apiUrl + "pet/getbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<Pet>>(newPath)
  }

  add(pet: Pet): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "pet/add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, pet)
  }

  delete(pet: Pet): Observable<ResponseModel> {
    let newPath = this.apiUrl + "pet/delete"
    return this.httpClient.post<ResponseModel>(newPath, pet)
  }

  update(pet: Pet): Observable<ResponseModel> {
    let newPath = this.apiUrl + "pet/update"
    return this.httpClient.post<ResponseModel>(newPath, pet)
  }
  
}
