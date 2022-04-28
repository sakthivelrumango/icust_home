import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  PerfectScrollbarModule, 
  PERFECT_SCROLLBAR_CONFIG, 
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';


import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ScheduleModule, RecurrenceEditorModule, MonthAgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedMaterialModule } from './shared/shared-material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

//import { KycVerificationMethodComponent } from './kyc-verification-method/kyc-verification-method.component';

// import { IgxCalendarModule } from 'igniteui-angular';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { LoggingInterceptor } from './shared/interceptors/logging-interceptor';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY:true,
  wheelPropagation: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    HammerModule,
    SharedModule,
    HttpClientModule,
    QuicklinkModule,
    SharedMaterialModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, { preloadingStrategy: QuicklinkStrategy, useHash: true, relativeLinkResolution: 'legacy' }),
    ScheduleModule, RecurrenceEditorModule
  ],

  declarations: [AppComponent],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
    
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
