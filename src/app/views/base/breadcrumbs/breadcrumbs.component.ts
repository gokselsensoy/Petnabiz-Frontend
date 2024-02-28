import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/entities/pet';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { User } from 'src/app/models/entities/user';
import { PetExaminationDetails } from 'src/app/models/dtos/petExaminationDetails';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public items = <any>[];
  dataLoaded: boolean = false;

  currentUser!: User;
  pets: Pet[] = [];
  petExaminationDetails: { [petId: number]: PetExaminationDetails[] } = {};

  constructor(
    private authService: AuthService,
    private petService: PetService,
    private examinationService: ExaminationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = [
      { label: 'Home', url: '/', attributes: { title: 'Home' } },
      { label: 'Library', url: '/' },
      { label: 'Data', url: '/dashboard/' },
      { label: 'CoreUI', url: '/' }
    ];

    setTimeout(() => {
      this.items = [
        { label: 'CoreUI', url: '/' },
        { label: 'Data', url: '/dashboard/' },
        { label: 'Library', url: '/' },
        { label: 'Home', url: '/', attributes: { title: 'Home' } }
      ];
    }, 5000);

    this.getCurrentUser();
    this.getByUserId(this.currentUser.id);
  }

  getByUserId(userId: number) {
    this.currentUser.id = userId;
    this.petService.getByPetUserId(userId).subscribe(response=>{
      this.pets = response.data;
      this.pets.forEach(pet => {
        this.getPetExaminationDetails(pet.id);
        console.log('pet:', pet.id)
      });
    })
  }

  getPetExaminationDetails(petId: number) {
    this.examinationService.getByPetExaminationDetail(petId).subscribe(response => {
      this.petExaminationDetails[petId] = response.data;
      console.log('response:', response.data)
      this.dataLoaded = true;
    })
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    console.log(this.currentUser);
  }
}
