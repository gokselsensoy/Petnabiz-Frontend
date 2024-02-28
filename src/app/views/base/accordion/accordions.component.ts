import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pet } from 'src/app/models/entities/pet';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { User } from 'src/app/models/entities/user';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit{

  currentUser!: User;
  pets!: Pet[];

  items = [1, 2, 3, 4];

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getByUserId(this.currentUser.id);
  }

  getAccordionBodyText(value: string) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }


  getByUserId(userId: number) {
    this.currentUser.id = userId;
    this.petService.getByPetUserId(userId).subscribe(response=>{
      this.pets = response.data;
    })
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }
}
