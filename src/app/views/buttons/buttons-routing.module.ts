import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { VetsComponent } from './vets/vets.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buttons'
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Geçmiş muayeneler'
        }
      },
      {
        path: 'button-groups',
        component: ButtonGroupsComponent,
        data: {
          title: 'Randevular'
        }
      },
      {
        path: 'dropdowns',
        component: DropdownsComponent,
        data: {
          title: 'Muayene girişi'
        }
      },
      {
        path: 'vets',
        component: VetsComponent,
        data: {
          title: 'Veterinerlerim'
        }
      },
      {
        path: 'patients',
        component: PatientsComponent,
        data: {
          title: 'Kliniğime kayıtlı kullanıcılar'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {
}
