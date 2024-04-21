import {Component, OnInit} from '@angular/core';
import {CloudService} from "../../services/cloud.service";
import {CloudMessageInterface} from "../../Interfaces/cloud-message-interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../State/app.state";
import {fillBeans} from "../../State/BeansContainer/beans-container.actions";
import {fillMilk} from "../../State/MilkContainer/milk-container.actions";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {

  messages: CloudMessageInterface[] = [];
  loading = true;

  constructor(
    private cloud: CloudService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.loading = true;
    this.cloud.getMessages().subscribe(resp => {
      this.messages = resp;
      this.loading = false;
    });
  }

  fillCoffeeContainer() {
    this.store.dispatch(fillBeans());
  }

  fillMilkContainer() {
    this.store.dispatch(fillMilk());
  }

}
