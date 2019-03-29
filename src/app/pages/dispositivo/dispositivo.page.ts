import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  texto: string;
  nombre : string;
  id: string;
  respuesta : string;

  constructor( public activatedRoute: ActivatedRoute, 
    public ble: BluetoothSerial) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params =>{
      const nombre = params['name'];
      const id = params['id']
      console.log(nombre,id);

      this.ble.connect(id)
        .subscribe(success => {
          console.log(success);
          this.respuesta = success;
      });
      this.nombre = nombre;
      this.id = id;
      
    })

  }

  onSubmitTemplate(form){

    console.log(form.value.texto);
   this.ble.write(form.value.texto).then(success => {
    console.log(success);
   })
   .catch(error =>{
     console.log(error);
   })
  }


}
