import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { COption, OptionsChain } from './models/options';
import { OptionsService } from './services/options.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataOC: any;
  datestampNow = new Date();
 
  constructor(private optionsService: OptionsService) {
   
  }

  ngOnInit(): void {
    this.dataOC = this.optionsService.optionsChain;
  }
}

