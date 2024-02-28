import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit{

  currentUser!: User;
  patients!: User[];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.getCurrentUser();
      this.getPatientsByClinicId(this.currentUser.veterinaryClinicId);
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  getPatientsByClinicId(clinicId: number) {
    this.authService.getByClinicId(clinicId).subscribe(response =>{
      this.patients = response.data;
    })
  }
}
