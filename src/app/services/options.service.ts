import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OptionsChain } from '../models/options';



@Injectable({
    providedIn: 'root'
  })

export class OptionsService {
  constructor(private http: HttpClient) { }

  configUrl = 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY';

  getOptions() {
    return this.http.get<OptionsChain>(this.configUrl);
  }
}