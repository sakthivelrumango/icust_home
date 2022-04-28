import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from 'app/shared/models/animation';
// import { NavItem } from './animation';
// import { animateText, NavItem, onSideNavChange } from './animation';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  // animations: [onSideNavChange, animateText]
})
export class SidemenuComponent implements OnInit {
  @Input() items: NavItem[];
  displaySubName:any;
  // @Output() isExpanded = new EventEmitter<boolean>();
  @ViewChild('childMenu') public childMenu;
  
  // @Output() isExpanded = new EventEmitter(true);
  constructor(public router: Router) {
  }

  // public sideNavState: boolean = false;
  // public linkText: boolean = false;

  ngOnInit() {
    // this.isExpanded.emit(true);
  }
  selectedSubName(dispSubName: any) {
    console.log(dispSubName);
    this.displaySubName = dispSubName;
   
    console.log(this.displaySubName);
  
  }

 

}
