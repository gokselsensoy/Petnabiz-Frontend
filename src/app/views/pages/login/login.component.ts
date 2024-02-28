import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/dtos/userForLogin';
import { User } from 'src/app/models/entities/user';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  updateForm!: FormGroup;
  veterinaryClinics!: VeterinaryClinic;
  currentUser!: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    // this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let user = Object.assign({}, this.loginForm.value);
      this.authService.login(user).subscribe({
        next: (successResponse) => {
          if (successResponse.data && successResponse.data.token) {
            this.localStorage.add("token", successResponse.data.token);
            this.authService.isLoggedIn = true;
            console.log(successResponse);
            this.getCurrentUser();
            this.router.navigate(["/dashboard"]);
          } else {
            // Token alınamadı veya hatalı bir yapı varsa
            console.error("Invalid token structure in the response:", successResponse);
          }
        }, error: (errorResponse) => {
          this.authService.isLoggedIn = false;
          console.log(errorResponse);
        }
      })
    }
  }

  update() {
    if (this.updateForm.valid) {
      let user = Object.assign({}, this.updateForm.value);
      this.authService.update(user).subscribe({
        next: (successResponse) => {
          console.log(successResponse, "tepki");
        }, error: (errorResponse) => {
          console.log(errorResponse,"badtepki");
        }
      })
  }
}

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    console.log(this.currentUser, 'bulduk');
  }

}
