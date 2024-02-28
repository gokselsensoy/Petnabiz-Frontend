import { Component, OnInit } from '@angular/core';
import { PastExaminationDetails } from 'src/app/models/dtos/pastExaminationDetails';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit{

  dataLoaded: boolean = false;
  currentUser!: User;
  user!: User;
  pastExaminations!: PastExaminationDetails[];

  constructor(
    private authService: AuthService,
    private examinationService: ExaminationService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getPastExamamination(this.currentUser.veterinaryClinicId);  
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    console.log(this.currentUser, 'bulduk');
  }

  getPastExamamination(clinicId: number) {
    this.examinationService.getByPastExaminationDetail(clinicId).subscribe( response =>{
      this.pastExaminations = response.data;
      console.log('response:', response.data);
      this.dataLoaded = true;
      })
  }
}

