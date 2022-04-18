import { Herois } from './../../../../store/herois.store';
import { HeroisFacade } from './../../../../store/herois.facade';
import { CRUDHeroisApi } from 'src/app/core/api/crud-herois.api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-superpoder',
  templateUrl: './adicionar-superpoder.component.html',
  styleUrls: ['./adicionar-superpoder.component.scss']
})
export class AdicionarSuperpoderComponent implements OnInit {

  constructor(
    private api: CRUDHeroisApi,
    private facade: HeroisFacade,
    private dialogRef: MatDialogRef<AdicionarSuperpoderComponent>
  ) { }

  ngOnInit(
  ): void {
  }

  formularioSuperpoder = new FormGroup({
    superpoder: new FormControl('', [(Validators.required)]),
    descricao: new FormControl('', [(Validators.required)])
  })

  adicionarSuperpoder(){
    var superpoder = this.formularioSuperpoder.get('superpoder')?.value;
    var descricao = this.formularioSuperpoder?.get('descricao')?.value;
    console.log('superpoder', superpoder)
    console.log('descricao', descricao)
    if(this.formularioSuperpoder.valid && superpoder != '' && descricao != ''){
      this.api.cadastrarSuperpoder(
        superpoder, descricao
        ).subscribe({
          next: (data) => {
            if(data.success == true){
              this.facade.atualizarSuperpoderes()
              this.dialogRef.close()
            }
          }
        });
    }
  }
  
}
