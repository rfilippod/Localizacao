import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  showLoading() 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...',
      dismissOnPageChange: false
    });
    this.loading.present();
  }

  favStores: {id: number, nome: string};
  stores: Array<{id: number, nome: string}>;
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private platform: Platform,
    private http: Http,
    private loadingCtrl: LoadingController) {
      this.stores = Array<{id: number, nome: string}>();
      this.favStores = {id: 0, nome: ''};
}

fn() : new Promise<number>();


ionViewWillEnter(){
  this.showLoading();
  let params = "?u_id=12";
  this.http.get('http://conecsites.com/projetos/Cond/get_animals_type.php' + params)
      .map(res => res.json())
      .subscribe(
        data => {
          let i, j = 0;
          console.log(data);
          this.stores = Array<{id: number, nome: string}>();
          for (i = 0; i < Object.keys(data).length; i++)
          {
            if (data[i] === undefined) continue;
              this.stores.push ({id: data[i].at_id, nome: data[i].at_name});
            
          }
          this.loading.dismiss();
        },
        err => {
          this.loading.dismiss();
          console.log(JSON.stringify(err));
        }
      );
}

}