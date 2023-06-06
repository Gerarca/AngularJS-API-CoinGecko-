import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICoin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  dtOptions: DataTables.Settings = {};
  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: ICoin[] = [];
  titles: string[] = ['#', 'Coin', 'Price', 'Price Change', '24H Volume'];
  
  constructor(private http: HttpClient){}

  ngOnInit(): void { 
    this.http.get<ICoin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
      },
      (err) => console.error(err)
    );
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}
