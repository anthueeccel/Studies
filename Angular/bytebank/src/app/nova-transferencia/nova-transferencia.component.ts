import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Transferencia } from '../models/transferencias.models';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent {

  @Output()
  aoTranferir = new EventEmitter<any>();

  valor: number;
  destino: number;
  data: Date;

  constructor(private service: TransferenciaService, private router: Router) {}

  transferir() {
    console.log('Solicitada nova transferĂȘncia');

    const emitir: Transferencia = {
      valor: this.valor,
      destino: this.destino
    };

    this.service.adicionar(emitir).subscribe(
      (resultado) => {
      console.log(resultado);
      this.limparCampos();
      this.router.navigateByUrl('extrato');

    },
    (error) => console.error(error)
    );
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
