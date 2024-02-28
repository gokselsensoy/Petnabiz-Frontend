import { Component, OnInit } from '@angular/core';
import { AppointmentDetails } from 'src/app/models/dtos/appointmentDetails';
import { User } from 'src/app/models/entities/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-button-groups',
  templateUrl: './button-groups.component.html',
  styleUrls: ['./button-groups.component.scss']
})
export class ButtonGroupsComponent implements OnInit{

  dataLoaded: boolean = false;
  currentUser!: User;
  appointments!: AppointmentDetails[];
  user!: User;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getWithDetails(this.currentUser.veterinaryClinicId);
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  getWithDetails(clinicId:number) {
    this.appointmentService.getWithDetails(clinicId).subscribe( response =>{
      this.appointments = response.data;
      this.dataLoaded = true;
    })
  }
}
