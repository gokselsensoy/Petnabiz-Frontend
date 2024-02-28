import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/models/entities/pet';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { User } from 'src/app/models/entities/user';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  petAddForm!: FormGroup;
  currentUser!: User;
  pets!: Pet[];


  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createPetAddForm();
    this.getCurrentUser();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setValue(), 200);
  }

  setValue(): void {
    if (this.currentUser) {
      this.petAddForm.get('appUserId')?.setValue(this.currentUser.id);
    }
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  createPetAddForm() {
    this.petAddForm = this.formBuilder.group({
      appUserId: ['', Validators.required],
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  add() {
    if (this.petAddForm.valid) {
      let pet = Object.assign({}, this.petAddForm.value);
      this.petService.add(pet).subscribe({
        next: (successResponse) => {
          console.log(successResponse, "tepki");
        }, error: (errorResponse) => {
          console.log(errorResponse,"badtepki");
        }
      })
  }
}

}
