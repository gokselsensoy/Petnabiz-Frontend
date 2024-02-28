import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/dtos/loginModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { RegisterModel } from '../models/dtos/registerModel';
import { ConfirmCode } from '../models/dtos/confirmCodeModel';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { UserInfo } from '../models/dtos/userInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { TokenModel } from '../models/dtos/tokenModel';
import { UserForLogin } from '../models/dtos/userForLogin';
import { UserForUpdate } from '../models/dtos/userForUpdate';
import { ClinicChange } from '../models/dtos/clinicChange';
import { User } from '../models/entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44328/api/auth/"
  private authToken: string | null = null;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private localStorage: LocalStorageService) { }

  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired());

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token !=null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.localStorage.getItem("token");
  }

  update(user: UserForUpdate): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'update'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)
  }

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)

  }

  logOut() {
    this.localStorage.removeToken("token");
    this.loggedIn.next(false);
  }

  register(newUser: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, newUser)
  }

  confirmCode(confirmCode: ConfirmCode): Observable<SingleResponseModel<ConfirmCode>> {
    let newPath = this.apiUrl + 'confirmcode'
    return this.httpClient.post<SingleResponseModel<ConfirmCode>>(newPath, confirmCode)
  }


  getregistermail(): Observable<string> {
    let newPath = this.apiUrl + 'registermail'
    return this.httpClient.get<string>(newPath)
  }

  getuserinfos(): Observable<ListResponseModel<UserInfo>> {
      let newPath = this.apiUrl + 'getuserinfo'
      return this.httpClient.get<ListResponseModel<UserInfo>>(newPath);
  }

  getByUserId(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyuserid?userid=' + userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getByClinicId(clinicId: number): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyclinicid?clinicid=' + clinicId
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  changeUserClinic(clinicId: ClinicChange): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'selectclinic'
    return this.httpClient.post<SingleResponseModel<number>>(newPath, clinicId)
  }

getUser(): User | undefined {
  let token = this.getToken();
  if (token != null) {
    let tokenDetails = Object.entries(this.jwtHelper.decodeToken(token));
    let user: User = new User;
    tokenDetails.forEach(detail => {
      switch (detail[0]) {
        case "email":
        {
          user.email = String(detail[1]);
          break;
        }
        case "veterinaryClinicId":
        {
          user.veterinaryClinicId = Number(detail[1]);
          break;
        }
        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
          user.name = String(detail[1]);
          break;
        }
        case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
          user.roles = detail[1] as Array<string>
          break;
        }
        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
          user.id = Number(detail[1]);
        }
      }
    });
    if (!user.roles) {  //if the user does not have a role
      user.roles = [];
    }
    return user;
  }
  return undefined;
}

getUsersByClinicId(clinicId: number): Observable<ListResponseModel<UserInfo>> {
  let newPath = this.apiUrl + 'getuserbyclinicid?clinicId=' + clinicId
  return this.httpClient.get<ListResponseModel<UserInfo>>(newPath);
}

hasRole(user: User, role: string): boolean {
  if (user.roles.indexOf(role) !== -1) {
    return true;
  }
  return false;
}



  // getUserInfoFromLocalStorage(): UserInfo | null {
  //   // Kullanıcı bilgilerini localStorage'dan al
  //   const userInfoString = localStorage.getItem('userInfo');
  //   if (userInfoString) {
  //     return JSON.parse(userInfoString);
  //   }
  //   return null;
  // }
}
