import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COption, StrikeOption } from 'src/app/models/options';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-manage-option',
  templateUrl: './manage-option.component.html',
  styleUrls: ['./manage-option.component.css']
})
export class ManageOptionComponent implements OnInit {

  saveOption: COption = { Strike: 0, BUY: true, SELL: false, CE: true, PE: false, CurrentPrice: 0, CurrentValue: 0, Entered: 0, Quantity: 0, ExpDate: '' };
  myOptions: COption[] = [];
  strikeOptions: StrikeOption[] = [];
  expiryDates: string[] = [];
  selectedStrike: any= {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private optionService: OptionsService) {
    let abc: any = this.router.getCurrentNavigation()?.extras.state;
    this.saveOption = abc?.myOption as COption;
  }

  ngOnInit(): void {
    console.log(this.optionService.strikePrices);
    this.expiryDates = this.optionService.expiryDates;    
    this.optionService.strikePrices.forEach((strike: number) => {
      this.strikeOptions.push(new StrikeOption(strike, true));
      this.strikeOptions.push(new StrikeOption(strike, false));
    });
    this.selectedStrike = this.strikeOptions[3];
  }

  onChangeManager(evnt: any){
    //this.selectedStrike = strikeOption;
    console.log(this.selectedStrike);
  }

  toggleCEPE(optionType: string) {
    if (optionType === 'CE') {
      this.saveOption.CE = true;
      this.saveOption.PE = false;
    }
    else {
      this.saveOption.CE = false;
      this.saveOption.PE = true;
    }
  }

  toggleBUYSELL(orderType: string) {
    if (orderType === 'BUY') {
      this.saveOption.BUY = true;
      this.saveOption.SELL = false;
    }
    else {
      this.saveOption.BUY = false;
      this.saveOption.SELL = true;
    }
  }

  clear() {
    localStorage.removeItem('myoptions');
    this.myOptions = [];
  }

  cancel() {

  }

  add(): string {
    if (this.saveOption.Strike && this.saveOption.Strike <= 0) {
      return '';
    }
    else if (!this.saveOption.CE && !this.saveOption.PE) {
      return '';
    }
    else if (!this.saveOption.BUY && !this.saveOption.SELL) {
      return '';
    }
    else {
      let str = localStorage.getItem('myoptions')?.toString();
      if (str) {
        this.myOptions = JSON.parse(str);
        let ext = this.myOptions.find(p => p.Strike == this.saveOption.Strike && p.CE == this.saveOption.CE && p.PE == this.saveOption.PE);
        if (!ext) {
          this.myOptions.push(this.saveOption);
          localStorage.setItem('myoptions', JSON.stringify(this.myOptions));
        }
      }
      else {
        this.myOptions = [];
        this.myOptions.push(this.saveOption);
        localStorage.setItem('myoptions', JSON.stringify(this.myOptions));
      }
      this.saveOption = new COption();
      return '';
    }
  }

}
