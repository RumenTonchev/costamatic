import {inject, Injectable} from '@angular/core';
import {CloudMessageInterface} from "../Interfaces/cloud-message-interface";
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";
import {from, map} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../State/app.state";
import {selectMachineData} from "../State/Machine/machine.selectors";

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  firestore: Firestore = inject(Firestore);

  messagesCollection = collection(this.firestore, 'messages');
  machineData = this.store.select(selectMachineData);

  constructor(
    private store: Store<AppState>
  ) {
  }

  sendMessage(msg: CloudMessageInterface) {
    this.machineData.subscribe(data => {
      return from(addDoc(this.messagesCollection, {
        machineId: data.id,
        datetime: new Date(),
        ...msg,
      }));
    }).unsubscribe();
  }

  getMessages() {
    return from(getDocs(this.messagesCollection)).pipe(
      map(resp => {
        return resp.docs.map(message => {
          const data = message.data();
          return {
            machineId: data['machineId'],
            type: data['type'],
            message: data['message'],
            datetime: data['datetime'].toDate(),
          }
        }).sort((a, b) => b.datetime - a.datetime);
      })
    );
  }
}
