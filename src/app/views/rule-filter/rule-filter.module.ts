import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleFilterRoutingModule } from './rule-filter-routing.module';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    RuleFilterRoutingModule
  ]
})
export class RuleFilterModule { }
