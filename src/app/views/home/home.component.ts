import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public mainVersion;
  public baseUrl:string = "http://icust.rumango.com";
  public versions: any[] = [
    {
      name: 'iCust Teller',
      photo: 'assets/images/screenshots/teller.png',
      dest: 'release/iCust-Teller',
      version:"0.1",
      build:"23"
    }, {
      name: 'Customer Onboarding',
      photo: 'assets/images/screenshots/onboarding.png',
      dest: 'release/Customer-Onboarding',
      version:"0.1",
      build:"23"
    },
    {
      name: 'Kiosk Staging',
      photo: 'assets/images/screenshots/kiosk.png',
      dest: 'release/Icust_Kiosk_Staging',
      version:"0.1",
      build:"23"
    },
    {
      name: 'iCust Mobile',
      photo: 'assets/images/screenshots/mobile.png',
      dest: 'release/iCust-Mobile',
      version:"0.1",
      build:"23"
    },
  ];

  public icustDemo_versions: any[] = [
    {
      name: 'iCust Teller (DEMO)',
      photo: 'assets/images/screenshots/teller.png',
      dest: 'demo/iCust-Teller',
      version:"1.0",
      build:"23"
    }, {
      name: 'Customer Onboarding (DEMO)',
      photo: 'assets/images/screenshots/onboarding.png',
      dest: 'demo/Customer-Onboarding',
      version:"0.1",
      build:"1.0"
    },
    {
      name: 'Kiosk Staging (DEMO)',
      photo: 'assets/images/screenshots/kiosk.png',
      dest: 'demo/Icust_Kiosk_Staging',
      version:"0.1",
      build:"1.0"
    },
    {
      name: 'iCust Mobile (DEMO)',
      photo: 'assets/images/screenshots/mobile.png',
      dest: 'demo/iCust-Mobile',
      version:"0.1",
      build:"1.0"
    },
  ];

  public median_versions: any[] = [
   {
      name: 'Median V1 (Old)',
      photo: 'assets/images/screenshots/median-old.png',
      dest: 'release/median-v1',
      version:"0.1",
      build:"1"
    },{
      name: 'Median V2 (New)',
      photo: 'assets/images/screenshots/Median-DTB-Bank.png',
      dest: 'release/median-v2',
      version:"0.2",
      build:"15"
    }, 
  ];

  public median_demo_versions: any[] = [
    {
       name: 'Median V1 (DEMO)',
       photo: 'assets/images/screenshots/median-old.png',
       dest: 'demo/median-v1',
       version:"0.1",
       build:"1"
     },{
       name: 'Median V2 (DEMO)',
       photo: 'assets/images/screenshots/Median-DTB-Bank.png',
       dest: 'demo/median-v2',
       version:"0.2",
       build:"15"
     }, 
   ];

  constructor(
    private router: Router,
    private loader: AppLoaderService,
  ) { }

  ngOnInit() {
    this.mainVersion = this.versions[0]
  }

  ngOnDestroy() {
    this.loader.close();
  }

  ngAfterViewInit() {
  }

  goToDashboard(v) {
    window.open(`${this.baseUrl}/${v.dest}`, '_blank');
  }
}
