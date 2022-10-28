import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ModalWindowComponent } from 'src/app/components/modal-window/modal-window.component';
import { Categories } from 'src/app/interfaces/categories';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit, AfterViewInit, OnDestroy {

  // form contiene un riferimento al form
  // categories$ contiene l'elenco delle categorie
  // imageCode64 contiene l'immagine codificata
  // id contiene l'id dell'articolo, oppure 0 se si sta creando un nuovo articolo
  //data contiene la data odierna
  // title mostra il titolo della pagina, che cambia se si sta modificando un articolo esistente

  @ViewChild('form') form!: NgForm;
  categories$!: Observable<Categories[]>;
  imageCode64!: string | ArrayBuffer | null;
  id: string = '0';
  data: Date = new Date();
  title: string = 'New Article';
  subscription!: Subscription

  constructor(
    private articlesSrv: ArticleService,
    public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.categories$ = this.articlesSrv.getAllCategory();
  }

  // se nella rotta è presente un paramatro(quindi stiamo modificando un articolo esistente),
  // recupera i dati dell'articolo e li collega al form
  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.id = params['id'];
        this.articlesSrv.getArticleById(params['id']).subscribe((article) => {
          this.form.form.value.title = article.title;
          this.form.form.value.author = article.author;
          this.form.form.value.category = article.category;
          this.form.form.value.content = article.content;
          this.imageCode64 = article.image;
          this.data = article.date;
          this.title = 'Edit Article';
        });
      }
    });
  }

  // onSubmit, se stiamo creando un articolo(id === 0), effettua una post, altrimenti una put all'articolo che stiamo modificando
  onSubmit() {
    if (this.id === '0') {
      this.postNews();
    } else {
      this.putNews();
    }
  }

  // apre il modale passandogli i dati dal form, per mostrare una preview
  open() {
    const modalRef = this.modalService.open(ModalWindowComponent, {
      size: 'lg',
    });
    let article = this.form.form.value;
    article.image = this.imageCode64;
    article.date = this.data;
    modalRef.componentInstance.article = article;
  }

  // raccoglie i dati dal form e li passa al service per effettuare una post ad un nuovo articolo
  postNews() {
    let form = this.form.form.value;
    form.image = this.imageCode64;
    form.date = this.data;
   this.subscription = this.articlesSrv
      .postNew(form)
      .subscribe(() => this.router.navigate(['/Articles']));
  }

  // raccoglie i dati dal form e li passa al service per modificare l'articolo corrispondente all'id(ottenuto dai params della rotta)
  putNews() {
    let form = this.form.form.value;
    form.image = this.imageCode64;
    form.date = this.data;
  this.subscription =  this.articlesSrv
      .putNews(form, this.id)
      .subscribe(() => this.router.navigate(['/SingleArticle/' + this.id]));
  }

  // quando viene selezionata un immagine raccoglie i dati dal form inerente l'immagine,
  // e poi la codifica e la salva in una variabile
  onChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      this.imageCode64 = reader.result;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
