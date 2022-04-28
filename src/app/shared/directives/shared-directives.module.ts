import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToDirective } from './scroll-to.directive';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { EgretSideNavToggleDirective } from './egret-side-nav-toggle.directive';
import { EgretSidenavHelperDirective, EgretSidenavTogglerDirective } from './egret-sidenav-helper/egret-sidenav-helper.directive';
import { RumWidgetToggleDirective } from './widget-toggle.directive';
import { UppercaseInputDirective } from './uppercase-input.directive';
import { DateAgoPipe } from './date-ago.pipe';
import { OnlyNumberDirective } from './only-number.directive';

const directives = [
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  EgretSideNavToggleDirective,
  EgretSidenavHelperDirective,
  EgretSidenavTogglerDirective,
  RumWidgetToggleDirective,
  UppercaseInputDirective,
  DateAgoPipe,
  OnlyNumberDirective,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}