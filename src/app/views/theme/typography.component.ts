import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/entities/city';
import { District } from 'src/app/models/entities/district';
import { User } from 'src/app/models/entities/user';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { DistrictService } from 'src/app/services/district.service';
import { VeterinaryClinicService } from 'src/app/services/veterinary-clinic.service';

@Component({
  templateUrl: 'typography.component.html',
})
export class TypographyComponent implements OnInit{

dataLoaded: boolean = false;

  cities!: City[];
  districts!: District[];
  vetClinics!: VeterinaryClinic[];
  currentUser!: User;

  selectedCity!: number | undefined;
  selectedDistrict!: number | undefined;
  filteredClinics: VeterinaryClinic[] = [];
  // filteredDistricts: District[] = [];

  changeClinicForm!: FormGroup;

  constructor(
    private vetClinicService: VeterinaryClinicService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private districtService: DistrictService
  ) {}

  ngOnInit(): void {
    this.createChangeClinicForm();
    this.getCurrentUser();
    this.getCities();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setValue(), 200);
  }

  setValue(): void {
    this.changeClinicForm.get('userName')?.setValue(this.currentUser.name);
  }

  createChangeClinicForm() {
    this.changeClinicForm = this.formBuilder.group({
      userName: ['', Validators.required],
      clinicId: ['', Validators.required]
    });
  }

  changeClinic() {
    if (this.changeClinicForm.valid) {
      let clinicId = Object.assign({}, this.changeClinicForm.value);
    this.authService.changeUserClinic(clinicId).subscribe({
      next: (successResponse) => {
        console.log(successResponse);
      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  } else {
    console.log('form is invalid')
  }
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  getCities() {
    this.cityService.getCities().subscribe(response=>{
      this.cities = response.data;
    })
  }

  getClinicByCityId(cityId: number) {
    this.vetClinicService.getByCityId(cityId).subscribe(response=>{
      this.vetClinics = response.data;
    })
  }

  getDistrictsByCityId(cityId: number) {
    this.districtService.getByCityId(cityId).subscribe(response => {
      this.districts = response.data;
    })
  }

  getClinicByDistrictId(districtId: number) {
    this.vetClinicService.getByDistrictId(districtId).subscribe(response=>{
      this.vetClinics = response.data;
    })
  }

  onCityChange() {
    console.log('selectedCity:', this.selectedCity)
      this.getClinicByCityId(this.selectedCity!);
      this.getDistrictsByCityId(this.selectedCity!);
  }

  onDistrictChange() {
    console.log('selectedDistrict:', this.selectedDistrict)
    this.getClinicByDistrictId(this.selectedDistrict!);
  }
}
