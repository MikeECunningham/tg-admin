import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "../components/app/app.component";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http";
import { MenuComponent } from "src/components/menu/menu.component";
import { LoginComponent } from "src/components/login/login.component";
import { NgRedux, NgReduxModule, DevToolsExtension } from "@angular-redux/store";
import { IAppState, initialState } from "src/store/store";
import { rootReducer } from "src/store/reducers/reducers";
import { FormsModule } from "@angular/forms";
import { TermsOfServiceComponent } from "src/components/terms-of-service/terms-of-service.component";
import { PasswordComponent } from "src/components/password/password.component";
import { SignUpComponent } from "src/components/signUp/sign-up.component";
import { RestService } from "src/services/rest.service";
import { StoreDataService } from "src/services/store-data.service";
import { NgxWebstorageModule } from "ngx-webstorage";
import { StoreEnhancer } from "redux";
import { ActivateComponent } from "src/components/activate/activate.component";
import { GuideComponent } from "src/components/guide/guide.component";
import { ObservationsComponent } from "src/components/observations/observations.component";
import { ProfileComponent } from "src/components/profile/profile.component";
import { ReduxService } from "src/services/redux.service";
import { PartnersComponent } from "src/components/partners/partners.component";
import { NewObservationComponent } from "src/components/new-observation/new-observation.component";
import { ObservationThanksDialogComponent } from "src/components/dialogs/observation-thanks/observation-thanks.component";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import * as Hammer from "hammerjs";
import { ActivitiesComponent } from "src/components/activities/activities.component";
import { TestPassedDialogComponent } from "src/components/dialogs/test-passed/test-passed.component";
import { MatchingGameComponent } from "src/components/matching-game/matching-game.component";
import { BlockingOverlayDialogComponent } from "src/components/dialogs/blocking-overlay/blocking-overlay-dialog.component";
import { TestExplanationDialogComponent } from "src/components/dialogs/test-explanation/test-explanation.component";
import { ImageCarouselComponent } from "src/components/image-carousel/image-carousel.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GuidePageComponent } from "src/components/guide-page/guide-page.component";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DeleteAccountComponent } from "src/components/dialogs/delete-account/delete-account.component";
import { MatIconRegistry } from "@angular/material/icon";
import { ChangePasswordComponent } from 'src/components/dialogs/change-password/change-password.component';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { VarDirective } from 'src/directive/ng-var.directive';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    // override hammerjs default configuration
    swipe: { direction: Hammer.DIRECTION_ALL }
  } as any;
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/** All the declarations and imports rquired to allow the application to function*/
export const moduleInfo: NgModule = {
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    TermsOfServiceComponent,
    PasswordComponent,
    SignUpComponent,
    ActivateComponent,
    GuideComponent,
    ObservationsComponent,
    ProfileComponent,
    NewObservationComponent,
    PartnersComponent,
    ObservationThanksDialogComponent,
    TestPassedDialogComponent,
    BlockingOverlayDialogComponent,
    TestExplanationDialogComponent,
    ActivitiesComponent,
    MatchingGameComponent,
    ImageCarouselComponent,
    GuidePageComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    VarDirective
  ],
  entryComponents: [
    ObservationThanksDialogComponent,
    TestPassedDialogComponent,
    BlockingOverlayDialogComponent,
    TestExplanationDialogComponent,
    DeleteAccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
  }}),
  IonicModule.forRoot(),
  ],
  providers: [
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }, HttpClientModule, RestService, StoreDataService, ReduxService, Camera],
  bootstrap: [AppComponent]
};

@NgModule(moduleInfo)
export class AppModule {

  public static storageService: StoreDataService;

  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension, restService: RestService,
              storageService: StoreDataService, matIconRegistry: MatIconRegistry,
              domSanitizer: DomSanitizer, storeData: StoreDataService, translate: TranslateService) {
    AppModule.storageService = storageService;
    let enhancers: StoreEnhancer<IAppState, {}>[] = [];
    if (devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer() as StoreEnhancer<IAppState, {}>];
    }
    ngRedux.configureStore(rootReducer, initialState, [], enhancers);
    restService.checkLoggedIn();
    const base = document.getElementsByTagName("base")[0].href;
    matIconRegistry.addSvgIcon("turtle", domSanitizer.bypassSecurityTrustResourceUrl(`${base}assets/images/icons/turtle.svg`));
    if (!storeData.getLanguage()) {storeData.setLanguage("en"); }
    translate.setDefaultLang("en");
    translate.use(storeData.getLanguage());
  }
}
