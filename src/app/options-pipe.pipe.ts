import { Pipe, PipeTransform } from '@angular/core';
import { COption, OptionsChain } from './models/options';

@Pipe({
  name: 'optionsPipe',
  pure: false
})
export class OptionsPipePipe implements PipeTransform {

  transform(value: COption[], dataOC: OptionsChain, expiryDate: string): COption[] {

    if (value && dataOC) {
      value.forEach((coption: COption) => {
        let strike = dataOC.records.data.find((p: any) => p.expiryDate == expiryDate && p.strikePrice == coption.Strike);
        if (!strike)
          strike = dataOC.filtered.data.find((p: any) => p.expiryDate == expiryDate && p.strikePrice == coption.Strike);

        if (strike) {
          if (coption.BUY) {
            if (coption.CE) {
              coption.CurrentValue = (strike.CE.lastPrice - (coption.Entered ?? 0)) * (coption.Quantity ?? 0) * 50;
              coption.CurrentPrice = strike.CE.lastPrice;
            }
            else { //PE
              coption.CurrentValue = (strike.PE.lastPrice - (coption.Entered ?? 0)) * (coption.Quantity ?? 0) * 50;
              coption.CurrentPrice = strike.PE.lastPrice;
            }
          } else { // SELL
            if (coption.CE) {
              coption.CurrentValue = ((coption.Entered ?? 0) - strike.CE.lastPrice) * (coption.Quantity ?? 0) * 50;
              coption.CurrentPrice = strike.CE.lastPrice;
            }
            else { // PE
              coption.CurrentValue = ((coption.Entered ?? 0) - strike.PE.lastPrice) * (coption.Quantity ?? 0) * 50;
              coption.CurrentPrice = strike.PE.lastPrice;
            }
          }
        }
      });

      return value.sort((a, b) => ((a.Strike ?? 0) < (b.Strike ?? 0)) ? 1 : -1);
    }

    return value;
  }

}
