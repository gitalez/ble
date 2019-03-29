import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dispositivosDesconectados: any[] = [];
  dispositivosAmostrar: any[] = [];
  dispositivosConectados:  any[] = [];
  dispositivosObtenidos: boolean;

  anularSubscripcion : Subscription;


  constructor(
    private alertCtrl: AlertController,
    private bluetoothSerial : BluetoothSerial,
    private route: Router)
  {
    this.dispositivosObtenidos = true;
  }

  ngOnInit(){}

  listener(){

     this.anularSubscripcion = this.bluetoothSerial.setDeviceDiscoveredListener()
      .subscribe( device => {
        console.log('id '+ device.id);
        console.log('nombre '+ device.name);
        const nombre = device.name;
        if(nombre !== undefined){
          this.dispositivosDesconectados.push(device)
          //this.dispositivosDesconectados = device
          console.log('viendo el array', this.dispositivosDesconectados);
          this.dispositivosAmostrar = this.dispositivosDesconectados;
       
        }
      
  })


  };

  simularScan(){
    this.dispositivosAmostrar = [{"name": 'rodolfo', "id": '21:21'}];
  
  }
comenzarScan(){

  this.dispositivosConectados = [];
  this.dispositivosDesconectados = [];
  this.dispositivosAmostrar = [];
  this.dispositivosObtenidos = false;

  this.listener();

  this.bluetoothSerial.discoverUnpaired()
  .then( device => {
      this.dispositivosObtenidos = true;
      this.anularSubscripcion.unsubscribe();
    
  })


}

  startScanning() {

    this.dispositivosConectados = [];
    this.dispositivosDesconectados = [];
    this.dispositivosObtenidos = false;

    //this.listener();

    this.bluetoothSerial.discoverUnpaired()
    .then( device => {
        this.dispositivosObtenidos = true;
        //this.dispositivosDesconectados.push(device)
        this.dispositivosDesconectados = device
        console.log('viendo el array', this.dispositivosDesconectados);
    })



  }

  irDispositivo(device: any){

    this.route.navigate(['/dispositivo',device])
  }
}

/*
    this.bluetoothSerial.list().then(
      success => {
        this.dispositivosConectados = success;
      },
      err => {
        alert(err);
      }
    );
    */
 // end startScanning




/*

  comenzarScan(){

    console.log('comenzamos el scan');
    alert('comenzamos el scan')
    this.dispositivosConectados = [];
    this.dispositivosDesconectados = null;
    this.dispositivosObtenidos = true;

    this.bluetoothSerial.discoverUnpaired()
    .then( dispo => {
      //console.log("dispositivos encontrados" , dispo);
      //this.dispositivosEncontrados = dispo;
      //this.dispositivosEncontrados.push(dispo)
      //console.log('el array contiene', this.dispositivosEncontrados);

    }).catch(error =>{
      console.log(error);
    })


  }

  pararScan(){
      return
      //this.dispositivosEncontrados = [];
      alert('paramos el scan')
      this.bluetoothSerial.disconnect()
      console.log('paramos el scan');
  }



  success = data => alert(data);
  fail = error => alert(error);

  async selectDevice(address: any) {
    
    let alert = await this.alertCtrl.create({

      header: "Connexion",
      message: "se desea conectar a ?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar clickeado");
          }
        },
        {
          text: "Conectar",
          handler: () => {
            this.bluetoothSerial
              .connect(address)
              .subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }

  async disconnect() {

    let alert = await this.alertCtrl.create({

      header: "Desconexion?",
      message: "se desea desconectar de ?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar clickeado");
          }
        },
        {
          text: "Desconectar",
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    await alert.present();
    this.dispositivosObtenidos = false;
  }

*/












