import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {selectGrinderState} from "../../State/Grinder/grinder.selectors";

@Component({
  selector: 'app-grinder',
  templateUrl: './grinder.component.html',
  styleUrl: './grinder.component.css'
})
export class GrinderComponent {
  isGrinding = this.store.select(selectGrinderState);

  constructor(
    private store: Store<AppState>
  ) {
  }
}
