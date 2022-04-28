import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from 'app/shared/models/animation';
import { LocalStoreService } from 'app/shared/services/local-store.service';



@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems:any;
  menuItemSub: Subscription;
  rumangoThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  navChilds:NavItem[];
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showChildMenu:boolean=false;
  isSelected:boolean=false;
  displayName: any;
  displaySubName: any;
  showBox = true;
  position = 'below';
  // displayName: any;
  displayChildSubName: any;
  @Input() notificPanel;
  user: any;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private dialog: MatDialog,
    private ls:LocalStoreService
  ) { }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.user = this.ls.getItem('ICUST_USER');
    this.rumangoThemes = this.themeService.rumangoThemes;
    this.menuItemSub = this.navService.menuItems$
    .subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      let limit = 4
      let mainItems:any[] = res.slice(0, limit)
      if(res.length <= limit) {
        return this.menuItems = mainItems
      }
      let subItems:any[] = res.slice(limit, res.length - 1)
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      })
      this.menuItems = mainItems
    })
  }

  changeTheme(theme) {
    this.layout.applyMatTheme(theme);
  }

  onChange(e): void {
    console.log("e", e);
    if (e.checked) {
      this.themeService.changeTheme('egret-blue','egret-dark-purple');
    } else {
      this.themeService.changeTheme('egret-dark-purple','egret-blue');
    }
  }

  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }

  events: string[] = [];
  bankName="XYZ Bank"

  

  // public pages: Page[] = [
  //   { name: 'Overview', link: 'some-link', icon: 'widgets' },
  //   { name: 'Accounts', link: 'some-link', icon: 'person_outline' },
  //   { name: 'Investment', link: 'some-link', icon: 'style' },
  //   { name: 'Loans', link: 'some-link', icon: 'insert_chart_outlined' },
  //   { name: 'Settings', link: 'some-link', icon: 'settings' },
   
  // ]

 

  onClickedOutside(e: Event) {
    this.showBox = false;
    this.displayName='';
    this.displaySubName='';
  console.log(this.displayName,'displayName');
  console.log(this.showBox);
    

  }

  mouseenter() {
    console.log("mouse enter " + this.isExpanded);
    this.showSubmenu = false;
    if (!this.isExpanded) {
      this.isShowing = true;
      this.isExpanded = true;
      console.log(this.isExpanded)
    }
    this.onClickedOutside(event);
  }

  mouseleave() {
    console.log("mouse leave " + this.isExpanded);
    console.log("submenu " + this.showSubmenu);

    if (this.isExpanded) {
      this.isShowing = false;
      this.isExpanded = false;
      // this.showSubmenu = false;
    }
    
  }
  selectmenu(navItem:NavItem[]){
    console.log(navItem,"Childrens");
  this.showChildMenu=true;
  this.navChilds=navItem;
  this.showBox=true;
  }
  selectSubmenu(navItem:NavItem[]){
    console.log(navItem,"Childrens");
  this.showChildMenu=true;
  this.navChilds=navItem;
  
  }
  
 
 


selectedName(dispName: any) {
 this.displayName = dispName;

}
selectedSubName(dispSubName: any) {
  console.log(dispSubName);
  this.displaySubName = dispSubName;
 
  console.log(this.displaySubName);
}

setLang() {
  this.translate.use(this.currentLang)
}

toggleNotific() {
  this.notificPanel.toggle();
}
toggleSidenav() {
  if(this.layoutConf.sidebarStyle === 'closed') {
    return this.layout.publishLayoutChange({
      sidebarStyle: 'full'
    })
  }
  this.layout.publishLayoutChange({
    sidebarStyle: 'closed'
  })
}


selectChildSubName(dispChildSubName: any){
  this.displayChildSubName = dispChildSubName;

}
  navItems: NavItem[] = [
    {
      displayName: 'Overview',
      iconName: 'widgets',
      route: 'overview',
    },
    {
      displayName: 'Accounts',
      iconName: 'person_outline',
      children: [
        {
          displayName: 'Core',
          iconName: 'security',
          children: [
            {
              displayName: 'Branch',
              iconName: 'person_outline',
              route: 'branch-maint',
            },
            {
              displayName: 'Currency',
              iconName: 'person_outline',
              route: 'currency-maint',
            },
            {
              displayName: 'Holiday',
              iconName: 'person_outline',
              route: 'holiday',
              children: [
                {
                  displayName: 'Local',
                  iconName: 'person_outline',
                  route: 'local-hol'
                },
                {
                  displayName: 'Currency',
                  iconName: 'person_outline',
                  route: 'ccy-hol'
                },
                {
                  displayName: 'Clearing',
                  iconName: 'person_outline',
                  route: 'clearing-hol'
                }
              ]
            },
            {
              displayName: 'Customer',
              iconName: 'person_outline',
              route: 'customer-maint',
            },
            {
              displayName: 'Accounts',
              iconName: 'person_outline',
              route: 'account-maint',
            },
          ]
        },
        {
          displayName: 'Security',
          iconName: 'person_outline',
          children: [
            {
              displayName: 'Role',
              iconName: 'person_outline',
              route: 'role-maint'
            },
            {
              displayName: 'User',
              iconName: 'person_outline',
              route: 'user-maint'
            },
            {
              displayName: 'System Config',
              iconName: 'person_outline',
              route: 'system-config'
            },
            {
              displayName: 'Common Params',
              iconName: 'person_outline',
              route: 'common-param'
            }
          ]
        },
        {
          displayName: 'Teller',
          iconName: 'security',
          children: [
            {
              displayName: 'Till Operation',
              iconName: 'home',
              route: 'till-operation'
            },
            {
              displayName: 'Till Balances',
              iconName: 'person_outline',
              route: 'till-balance'
            },
            {
              displayName: 'Product',
              iconName: 'person_outline',
              route: 'product-maint'
            },
            {
              displayName: 'Workflow',
              iconName: 'person_outline',
              route: 'teller-workflow'
            }
          ]
        },
      ]
    },
    {
      displayName: 'Cards',
      iconName: 'style',
      children: [
        {
          displayName: 'Cash Transaction',
          iconName: 'cash',
          route: 'cash-trns'
        },
        {
          displayName: 'Cheque Transaction',
          iconName: 'cheque',
          route: 'cheque-trns'
        },
        {
          displayName: 'Transfers',
          iconName: 'transfers',
          route: 'teller-transfer'
        },
        {
          displayName: 'Bill Payment',
          iconName: 'bill',
          route: 'bill-pay'
        }
      ]
    },
    {
      displayName: 'Investments',
      iconName: 'insert_chart_outlined',
      children: [
        {
          displayName: 'Customer',
          iconName: 'customer',
          children: [
            {
              displayName: 'Customer Onboarding',
              iconName: 'customer',
              route: 'customer-onboarding'
            },
            {
              displayName: 'KYC Verify',
              iconName: 'verify',
              route: 'kyc-verify'
            }
          ]
        }
        ,
        {
          displayName: 'Accounts',
          iconName: 'account',
          children: [
            {
              displayName: 'Account Opening',
              iconName: 'open',
              route: 'account-open'
            },
            {
              displayName: 'Account Modify',
              iconName: 'modify',
              route: 'account-modify'
            }
          ]
        },
        {
          displayName: 'Deposit Creation',
          iconName: 'deposit',
          route: 'deposit-create'
        },
        {
          displayName: 'Loan Creation',
          iconName: 'loan',
          route: 'loan-create'
        }
      ]
    },
    {
      displayName: 'Loans',
      iconName: 'account_balance_wallet',
      children: [
        {
          displayName: 'Customer',
          iconName: 'customer',
          children: [
            {
              displayName: 'Customer Onboarding',
              iconName: 'customer',
              route: 'customer-onboarding'
            },
            {
              displayName: 'KYC Verify',
              iconName: 'verify',
              route: 'kyc-verify'
            }
          ]
        }
        ,
        {
          displayName: 'Accounts',
          iconName: 'account',
          children: [
            {
              displayName: 'Account Opening',
              iconName: 'open',
              route: 'account-open'
            },
            {
              displayName: 'Account Modify',
              iconName: 'modify',
              route: 'account-modify'
            }
          ]
        },
        {
          displayName: 'Deposit Creation',
          iconName: 'deposit',
          route: 'deposit-create'
        },
        {
          displayName: 'Loan Creation',
          iconName: 'loan',
          route: 'loan-create'
        }
      ]
    },
    {
      displayName: 'Reports',
      iconName: 'content_copy',
      children: [
        {
          displayName: 'Customer',
          iconName: 'customer',
          children: [
            {
              displayName: 'Customer Onboarding',
              iconName: 'customer',
              route: 'customer-onboarding'
            },
            {
              displayName: 'KYC Verify',
              iconName: 'verify',
              route: 'kyc-verify'
            }
          ]
        }
        ,
        {
          displayName: 'Accounts',
          iconName: 'account',
          children: [
            {
              displayName: 'Account Opening',
              iconName: 'open',
              route: 'account-open'
            },
            {
              displayName: 'Account Modify',
              iconName: 'modify',
              route: 'account-modify'
            }
          ]
        },
        {
          displayName: 'Deposit Creation',
          iconName: 'deposit',
          route: 'deposit-create'
        },
        {
          displayName: 'Loan Creation',
          iconName: 'loan',
          route: 'loan-create'
        }
      ]
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      children: [
        {
          displayName: 'Customer',
          iconName: 'customer',
          children: [
            {
              displayName: 'Customer Onboarding',
              iconName: 'customer',
              route: 'customer-onboarding'
            },
            {
              displayName: 'KYC Verify',
              iconName: 'verify',
              route: 'kyc-verify'
            }
          ]
        }
        ,
        {
          displayName: 'Accounts',
          iconName: 'account',
          children: [
            {
              displayName: 'Account Opening',
              iconName: 'open',
              route: 'account-open'
            },
            {
              displayName: 'Account Modify',
              iconName: 'modify',
              route: 'account-modify'
            }
          ]
        },
        {
          displayName: 'Deposit Creation',
          iconName: 'deposit',
          route: 'deposit-create'
        },
        {
          displayName: 'Loan Creation',
          iconName: 'loan',
          route: 'loan-create'
        }
      ]
    }
  ];
  
}
