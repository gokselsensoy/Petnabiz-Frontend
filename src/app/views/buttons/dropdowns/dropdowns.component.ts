import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forEach } from 'lodash-es';
import { Appointment } from 'src/app/models/entities/appointment';
import { Pet } from 'src/app/models/entities/pet';
import { User } from 'src/app/models/entities/user';
import { Vet } from 'src/app/models/entities/vet';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { PetService } from 'src/app/services/pet.service';
import { VetService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
})
export class DropdownsComponent implements OnInit{

  users!: User[];
  pets!: Pet[];
  vets!: Vet[];
  appointments!: Appointment[];
  currentUser!: User;
  examinationAddForm!: FormGroup;

  selectedUser!: number | undefined;

  constructor(
    private authService: AuthService,
    private petService: PetService,
    private vetService: VetService,
    private appointmentService: AppointmentService,
    private examinationService: ExaminationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.createExaminationAddForm();
    this.getUsers(this.currentUser.veterinaryClinicId);
    this.getVetsByClinicId(this.currentUser.veterinaryClinicId);
    this.getAppointmentsByClinicId(this.currentUser.veterinaryClinicId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setValue(), 200);
  }

  setValue(): void {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
  
    this.examinationAddForm.get('examinationDate')?.setValue(formattedDate);
    this.examinationAddForm.get('veterinaryClinicId')?.setValue(this.currentUser.veterinaryClinicId);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  createExaminationAddForm() {
    this.examinationAddForm = this.formBuilder.group({
      petId: ['', Validators.required],
      appUserId: ['', Validators.required],
      vetId: ['', Validators.required],
      appointmentId: ['', Validators.required],
      veterinaryClinicId: ['', Validators.required],
      examinationDate: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  add() {
    if (this.examinationAddForm.valid) {
      let examination = Object.assign({}, this.examinationAddForm.value);
      this.examinationService.add(examination).subscribe({
        next: (successResponse) => {
          console.log(successResponse, "Success");
        }, error: (errorResponse) => {
          console.log(errorResponse,"Error");
        }
      })
  }
}

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  getUsers(clinicId: number) {
    this.authService.getByClinicId(clinicId).subscribe(response => {
      this.users = response.data;
    })
  }

  getPetsByUserId(userId: number) {
    this.petService.getByPetUserId(userId).subscribe(response=>{
      this.pets = response.data;
    })
  }

  getVetsByClinicId(clinicId: number) {
    this.vetService.getByClinicId(clinicId).subscribe(response => {
      this.vets = response.data;
    })
  }

  getAppointmentsByClinicId(clinicId: number) {
    this.appointmentService.getByClinicId(clinicId).subscribe(response => {
      this.appointments = response.data;
    })
  }

  OnUserChange() {
    this.users.forEach(user => {
      this.getPetsByUserId(user.id);
    })
  }
}

