import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   let headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36','Accept-Encoding': 'gzip, deflate, br','Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'};
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
    })
  };
    return this.http.get<OptionsChain>(this.configUrl,);
  }
}