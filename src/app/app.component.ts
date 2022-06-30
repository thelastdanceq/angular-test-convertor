import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


interface Currency {
  r030: string,
  txt: string,
  rate: number,
  cc: string,
  exchangedate: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private http: HttpClient) {

  }

  firstInputValue: number = 1;
  secondInputValue: number = 1;

  firstSelectValue: string | null = null;
  secondSelectValue: string | null = null;

  eur: number | null = null;
  usd: number | null = null;

  data: Array<Currency> = [];


  changePrice(inputName: "first" | "second") {
    const getMultiplier = (firstValue: string, secondValue: string) => {
      const firstRate = this.data.filter((el: any) => {
        return el.cc === firstValue;
      })[0].rate;
      const secondRate = this.data.filter((el: any) => {
        return el.cc === secondValue;
      })[0].rate

      return firstRate / secondRate
    }

    if (this.secondSelectValue && this.firstSelectValue) {
      if (inputName === "first") {
        this.firstInputValue = this.secondInputValue * getMultiplier(this.secondSelectValue, this.firstSelectValue)
      } else {
        this.secondInputValue = this.firstInputValue * getMultiplier(this.firstSelectValue, this.secondSelectValue)
      }
    }
  }



  ngOnInit() {
    this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.data = data;
        }


        this.usd = this.data.filter((el: any) => {
          return el.cc === "USD";
        })[0].rate;
        this.eur = this.data.filter((el: any) => {
          return el.cc === "EUR";
        })[0].rate;


        this.firstSelectValue = "UAH";
        this.secondSelectValue = "EUR"



        this.data.push({
          cc: "UAH",
          exchangedate: "23.05.2022",
          r030: '1',
          rate: 1,
          txt: "Українська гривня",
        })
      }
      )
  }
}
