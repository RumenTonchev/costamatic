import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CloudMessageInterface} from "../Interfaces/cloud-message-interface";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(
    private http: HttpClient
  ) {
  }

  sendMessage(msg: CloudMessageInterface) {
    //this.http.post('http://')
  }
}
