import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "src/components/login/login.component";
import { MenuComponent } from "src/components/menu/menu.component";
import { TermsOfServiceComponent } from "src/components/terms-of-service/terms-of-service.component";
import { PasswordComponent } from "src/components/password/password.component";
import { SignUpComponent } from "src/components/signUp/sign-up.component";
import { ActivateComponent } from "src/components/activate/activate.component";
import { PartnersComponent } from "src/components/partners/partners.component";
import { NewObservationComponent } from "src/components/new-observation/new-observation.component";
import { MatchingGameComponent } from "src/components/matching-game/matching-game.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "menu",
    component: MenuComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: "menu/:page",
    component: MenuComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: "tos",
    component: TermsOfServiceComponent
  },
  {
    path: "priv",
    component: TermsOfServiceComponent
  },
  {
    path: "password",
    component: PasswordComponent
  },
  {
    path: "signUp",
    component: SignUpComponent
  },
  {
    path: "activate",
    component: ActivateComponent
  },
  {
    path: "partners",
    component: PartnersComponent
  },
  {
    path: "newObservation",
    component: NewObservationComponent
  },
  {
    path: "newObservation/:species",
    component: NewObservationComponent
  },
  {
    path: "matchingGame",
    component: MatchingGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
