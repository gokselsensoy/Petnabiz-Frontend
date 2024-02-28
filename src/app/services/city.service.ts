import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { Observable } from 'rxjs';
import { City } from '../models/entities/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getCities(): Observable<ListResponseModel<City>> {
    let newPath = this.apiUrl + "city/getall"
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }

  getByCityId(cityId: number): Observable<SingleResponseModel<City>> {
    let newPath = this.apiUrl + "city/getbyid?cityid=" + cityId;
    return this.httpClient.get<SingleResponseModel<City>>(newPath)
  }
}
