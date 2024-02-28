import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, TableModule, FormModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DocsComponentsModule
  ],
  declarations: [
    ColorsComponent,
    ThemeColorComponent,
    TypographyComponent ]
})
export class ThemeModule {
}
