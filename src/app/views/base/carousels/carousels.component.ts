import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import { Appointment } from 'src/app/models/entities/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/entities/user';
import { VeterinaryClinicService } from 'src/app/services/veterinary-clinic.service';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/entities/pet';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit{

  dataLoaded: boolean = false;

  addAppointmentForm!: FormGroup;
  currentUser!: User;
  clinic!: VeterinaryClinic;
  pets!: Pet[];

  appointments: Appointment[] = [];
  availableAppointments: Appointment[] = [];

  selectedDate: Date | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private vetClinicService: VeterinaryClinicService,
    private petService: PetService
  ) { }

    ngOnInit(): void {
      this.getCurrentUser();
      this.getClinicByClinicId(this.currentUser.veterinaryClinicId);
      this.getPetsByUserId(this.currentUser.id);
      this.getAvailable();
      this.createAddAppointmentForm();
    }

    ngAfterViewInit(): void {
      setTimeout(() => this.setValue(), 200);
    }
  
    setValue(): void {
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);
    
      this.addAppointmentForm.get('entryDate')?.setValue(formattedDate);
      this.addAppointmentForm.get('veterinaryClinicId')?.setValue(this.currentUser.veterinaryClinicId);
      this.addAppointmentForm.get('appUserId')?.setValue(this.currentUser.id);
    }
    
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
    
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    createAddAppointmentForm() {
      this.addAppointmentForm = this.formBuilder.group({
        entryDate: ['', Validators.required],
        appointmentDate: ['', Validators.required],
        appUserId: ['', Validators.required],
        petId: ['', Validators.required],
        veterinaryClinicId: ['', Validators.required],
      });
     }

    getAppointments(): void {
      this.appointmentService.getAppointments().subscribe(response => {
        this.appointments = response.data;
      });
    }

    getAvailable() {
      if (this.selectedDate) {
        this.appointmentService.getAvailableAppointments(this.selectedDate).subscribe(response => {
          this.availableAppointments = response.data;
        });
      }
    }

    addAppointment() {
      if (this.addAppointmentForm.valid) {
        let appointment = Object.assign({}, this.addAppointmentForm.value);
        this.appointmentService.addAppointment(appointment).subscribe({
          next: (successResponse) => {
            console.log(successResponse, "Success");
          }, error: (errorResponse) => {
            console.log(errorResponse,"Error");
          }
        })
      }
    }

    getClinicByClinicId(clinicId: number) {
      this.vetClinicService.getByClinicId(clinicId).subscribe(response => {
        this.clinic = response.data;
        console.log('Examinations for Clinic ID ' + 1 + ':', response.data);
        this.dataLoaded = true;
      });
    }

    getPetsByUserId(userId: number) {
      this.petService.getByPetUserId(userId).subscribe(response=>{
        this.pets = response.data;
      })
    }

    getCurrentUser() {
      this.currentUser = this.authService.getUser()!;
    }
}
