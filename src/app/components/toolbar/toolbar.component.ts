import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  // in base al type la toolbar viene strutturata in modo dinamico
  // articleId contiene l'id dell'articolo, questo è undefined se si sta creando un nuovo articolo
  // onSelected emette un evento per comunicare alla pagina article l'intenziuone dell'utente di filtrare la ricerca
  // categories$ è l'observable che contiene l'elenco di categorie
  // deleteSubscription è la sottoscrizione per l'eliominazione


  @Input() type!: string;
  @Input() articleId!: string | undefined;
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  categories$!: Observable<Categories[]>;
  deleteSubscription!: Subscription;

  constructor(public router: Router, private articleSrv: ArticleService) {}

  ngOnInit(): void {
    this.categories$ = this.articleSrv.getAllCategory();
  }

  // l'utente ha filtrato la ricerca, quindi emette un evento per comunicare l'intenzione al component padre
  onSelect(event: any) {
    this.onSelected.emit(event.target.value);
  }

  // tramite service l'articolo selezionato viene eliminato
  onDelete() {
    this.deleteSubscription = this.articleSrv
      .deleteArticle(this.articleId!)
      .subscribe(() => {
        this.router.navigate(['/Articles']);
      });
  }

  // unsubscribe
  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }
}
