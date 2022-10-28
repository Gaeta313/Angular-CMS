import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ModalWindowComponent } from 'src/app/components/modal-window/modal-window.component';
import { Categories } from 'src/app/interfaces/categories';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form!: NgForm;
  categories$!: Observable<Categories[]>;
  fileCoding!: string | ArrayBuffer | null;
  id:string = '0'
  data:Date = new Date();
  title:string = 'New Article'
  constructor(
    private articlesSrv: ArticleService,
    public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.categories$ = this.articlesSrv.getAllCategory();
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.id = params['id']
        this.articlesSrv
          .getArticleById(params['id'])
          .subscribe((article) => {
            this.form.form.value.title = article.title;
            this.form.form.value.author = article.author;
            this.form.form.value.category = article.category;
            this.form.form.value.content = article.content;
            this.fileCoding = article.image;
            this.data = article.date;
            this.title = 'Edit Article'
          });
      }
    });
  }

  onSubmit() {
    if(this.id === '0'){
      this.postNews();
    }
    else{
      this.putNews();
    }
  }

  open(){
    const modalRef = this.modalService.open(ModalWindowComponent, { size: 'lg' });
    let article = this.form.form.value;
    article.image = this.fileCoding
    article.date = this.data
    modalRef.componentInstance.article = article ;
  }

  postNews(){
    let form = this.form.form.value;
    form.image = this.fileCoding
    form.date = this.data;
    this.articlesSrv
      .postNew(form)
      .subscribe(() => this.router.navigate(['/Articles']));
  }

  putNews(){
    let form = this.form.form.value;
    form.image = this.fileCoding
    form.date = this.data;
    this.articlesSrv
    .putNews(form,this.id).subscribe(() => this.router.navigate(['/SingleArticle/' + this.id]));
  }

  onChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      this.fileCoding = reader.result;
    });
  }
}
