import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  @Input() article!: Article; // questa variabile contiene un riferimento all'articolo per la preview
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
