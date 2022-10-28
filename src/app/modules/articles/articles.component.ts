import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles$!: Observable<Article[]>;

  post = {
    title: 'nuovo post',
  };
  constructor(private articleSrv: ArticleService, public router: Router) {}

  ngOnInit(): void {
    this.articles$ = this.articleSrv.getAll();
  }

  // tramite evento del componente figlio ToolbarComponent, il componente sa che l'utente vuole filtrare la ricerca
  // ed invoca il sevice per farlo
  onSelected(category: string) {
    this.articles$ = this.articleSrv.getAllFilteredByCategory(category);
  }
}
