export interface OptionsChain {
    filtered: Filtered; //current exp options
    records: Records; // future exp options
    heroesUrl: string;
    textfile: string;
    date: any;
}

export interface Records {
    data: StrikeInfo[];
    expiryDates: string[];
    underlyingValue: number; // current spot price
    timestamp: Date;
    strikePrices: number[];
}

export interface Filtered {
    data: StrikeInfo[];
}

export interface StrikeInfo {
    strikePrice: number;
    expiryDate: string;
    PE: OptionInfo;
    CE: OptionInfo;
}

export interface OptionInfo {
    strikePrice: number;
    expiryDate: string;
    underlying: string;
    openInterest: number;
    changeinOpenInterest: number;
    pchangeinOpenInterest: number;
    totalTradedVolume: number; //volume
    impliedVolatility: number;
    lastPrice: number;
    change: number;
    pChange: number;
    totalBuyQuantity: number;
    totalSellQuantity: number;
    bidQty: number;
    bidprice: number;
    askQty: number;
    askPrice: number;
    underlyingValue: number;

}


export class COption {
    CE?: boolean = false;
    PE?: boolean = false;
    BUY?: boolean = false;
    SELL?: boolean = false;
    Strike?: number = 0;
    Quantity?: number = 1;
    Entered?: number = 0;
    ExpDate?: string = "";
    CurrentPrice?: number = 0;
    CurrentValue?: number = 0;
}


export class StrikeOption {
    strike: number = 0;
    ce: boolean = false;
    get value(): string {
        return this.strike.toString() + (this.ce ? ' CE' : ' PE');
    }
    constructor(strike: number, isCe: boolean) {
        this.strike = strike;
        this.ce = isCe;
    }
}