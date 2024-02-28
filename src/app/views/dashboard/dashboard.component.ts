import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Pet } from 'src/app/models/entities/pet';
import { PetService } from 'src/app/services/pet.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/entities/user';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser!: User;
  pets!: Pet[];

  constructor(
    private chartsData: DashboardChartsData,
    private authService: AuthService,
    private petService: PetService
    ) {
  }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
    this.getCurrentUser();
    this.getByUserId(this.currentUser.id);
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  //

  getByUserId(userId: number) {
    this.currentUser.id = userId;
    this.petService.getByPetUserId(userId).subscribe(response=>{
      this.pets = response.data;
      console.log('response:', response.data);
    })
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    console.log(this.currentUser);
  }
}
