import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { COption, OptionsChain } from '../../models/options';
import { OptionsService } from '../../services/options.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataOC: any;
  datestampNow = new Date();
  sub: Subscription;
  defaultExpDate: string = '';
  defaultExpDateStr: string = '';
  tradeList: any[] = [];
  callStrikePrices: number[] = [];
  putStrikePrices: number[] = [];

  saveOption: COption = {};
  myOptions: COption[] = [];



  constructor(private optionsService: OptionsService) {
    this.sub = interval(15000).subscribe((x => {
      this.callBE();
    }));
  }

  ngOnInit(): void {
    this.callBE();
    let str = localStorage.getItem('myoptions')?.toString();
    if (str) {
      this.myOptions = JSON.parse(str);
    }
  }

  getTotal(value: COption[]): number {
    let total = 0;
    value.forEach((coption: COption) => {
      total += (coption.CurrentValue ?? 0);
    })
    return total;
  }


  callBE() {
    this.optionsService.getOptions().subscribe((data: OptionsChain) => {
      this.dataOC = data;
      console.log(data);
      this.optionsService.optionsChain = data;
      this.optionsService.strikePrices = data.records.strikePrices;
      this.optionsService.expiryDates =data.records.expiryDates;
      this.defaultExpDate = data.records.expiryDates[1];
      this.defaultExpDateStr = this.defaultExpDate.slice(0, -5)
      this.datestampNow = new Date();

      this.myOptions = [];
      let str = localStorage.getItem('myoptions')?.toString();
      if (str) {
        this.myOptions = JSON.parse(str);
      }

      //let strikePrice = data?.records.underlyingValue;
      // console.log(this.defaultExpDate);
      // let expOptions = data.records.data.filter(p => p.expiryDate === this.defaultExpDate && p.strikePrice === 19000);
      // console.log(expOptions);

      // let strikeOptions = expOptions.filter(p => p.strikePrice === strikePrice)
      // console.log(strikeOptions);


      // let peOptions = expOptions.filter(p => p.PE.strikePrice < strikePrice);
      // console.log('peOptions', peOptions);

      // let last10peValumes = peOptions.sort((a, b) => (a.PE.totalTradedVolume < b.PE.totalTradedVolume) ? 1 : -1).slice(0, 10);
      // console.log('last10peValumes', last10peValumes);


      // let ceOptions = expOptions.filter(p => p.CE.strikePrice > strikePrice);
      // console.log('ceOptions', ceOptions);

      // let last10ceValumes = ceOptions.sort((a, b) => (a.CE.totalTradedVolume < b.CE.totalTradedVolume) ? 1 : -1).slice(0, 10);
      // console.log('last10ceValumes', last10ceValumes);

    });

  }
}
