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

  title: string = 'bomba';

  firstInputValue: number = 1;
  secondInputValue: number = 1;

  firstSelectValue: string | null = null;
  secondSelectValue: string | null = null;

  eur: number | null = null;
  usd: number | null = null;

  data: Array<Currency> = [];


  changePrice(inputName: "first" | "second") {
    if (inputName === "first") {
      this.firstInputValue = this.secondInputValue * (this.data.filter((el: any) => {
        return el.cc === this.secondSelectValue;
      })[0].rate / this.data.filter((el: any) => {
        return el.cc === this.firstSelectValue;
      })[0].rate
      )
    } else {
      this.secondInputValue = this.firstInputValue * (this.data.filter((el: any) => {
        return el.cc === this.firstSelectValue;
      })[0].rate / this.data.filter((el: any) => {
        return el.cc === this.secondSelectValue;
      })[0].rate
      )
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
