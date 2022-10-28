import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { Article } from '../interfaces/article';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }

  getAll(){
  return  this.http.get<Article[]>('http://localhost:4201/articles')
  }

  getArticleById(id: string){
    return this.http.get<Article>('http://localhost:4201/articles/' + id)
  }

  postNew(article:any){
    return  this.http.post<Article[]>('http://localhost:4201/articles',article).pipe(switchMap(() => this.getAll()))
  }

  putNews(article:any, id:string){
    return this.http.put<Article[]>('http://localhost:4201/articles/' + id, article).pipe(switchMap(() => this.getAll()))
  }

  getAllCategory(){
    return this.http.get<Categories[]>('http://localhost:4201/categories');
  }

  getAllFilteredByCategory(category:string){
    if(category !== 'All'){
      return this.http.get<Article[]>('http://localhost:4201/articles?category=' + category);
    }
    else{
      return this.getAll();
    }
  }

  deleteArticle(id:string){
    return this.http.delete('http://localhost:4201/articles/' + id)
  }
}
