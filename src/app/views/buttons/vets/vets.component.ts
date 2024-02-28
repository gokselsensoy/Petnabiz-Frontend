import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { Vet } from 'src/app/models/entities/vet';
import { AuthService } from 'src/app/services/auth.service';
import { VetService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-vets',
  templateUrl: './vets.component.html'
})
export class VetsComponent implements OnInit{

  currentUser!: User;
  vets!: Vet[];

  constructor(
    private authService: AuthService,
    private vetService: VetService
  ) { }

  ngOnInit(): void {
      this.getCurrentUser();
      this.getVetsByClinicId(this.currentUser.veterinaryClinicId);
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  getVetsByClinicId(clinicId: number) {
    this.vetService.getByClinicId(clinicId).subscribe( response =>{
      this.vets = response.data;
    })
  }

}
