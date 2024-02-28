import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { Observable } from 'rxjs';
import { District } from '../models/entities/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getDistricts(): Observable<ListResponseModel<District>> {
    let newPath = this.apiUrl + "district/getall"
    return this.httpClient.get<ListResponseModel<District>>(newPath);
  }

  getByCityId(cityId: number): Observable<ListResponseModel<District>> {
    let newPath = this.apiUrl + "district/getbycityid?cityid=" + cityId;
    return this.httpClient.get<ListResponseModel<District>>(newPath);
  }

  getByDistrictId(districtId: number): Observable<SingleResponseModel<District>> {
    let newPath = this.apiUrl + "district/getbyid?districtid=" + districtId;
    return this.httpClient.get<SingleResponseModel<District>>(newPath)
  }
}
