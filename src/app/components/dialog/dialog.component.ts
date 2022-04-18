import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() mensagem: string = ''
  @Input() titulo: string = ''

  constructor() { }

  ngOnInit(): void {
    console.log('mensagem', this.mensagem)
    console.log('this.titulo', this.titulo)
  }

}
