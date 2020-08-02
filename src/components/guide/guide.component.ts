import { Component } from "@angular/core";
import { select, NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";
import { IGuideState } from "src/store/reducers/guideReducer";
import { IAppState } from "src/store/store";
import { ReduxService } from "src/services/redux.service";
import pages from "./pages";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
  styleUrls: ["./guide.component.scss"]
})
export class GuideComponent {

  pages = pages.sort((a, b) => a.speciesName.localeCompare(b.speciesName));

  @select() guide: Observable<IGuideState>;

  constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, public ngRedux: NgRedux<IAppState>, public reduxService: ReduxService) {
    this.matIconRegistry.addSvgIcon(
      `toronto_zoo_logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/images/avatars/torontozoo.svg`)
    );
  }

  openPage(page: string) {
    this.reduxService.changeGuidePage(page);
  }
}