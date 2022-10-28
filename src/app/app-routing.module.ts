import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Articles',
    loadChildren: () =>
      import('./modules/articles/articles.module').then(
        (m) => m.ArticlesModule
      ),
  },
  {
    path: 'NewArticle/:id',
    loadChildren: () =>
      import('./modules/new-article/new-article.module').then(
        (m) => m.NewArticleModule
      ),
  },
  {
    path: 'SingleArticle/:id',
    loadChildren: () =>
      import('./modules/single-article/single-article.module').then(
        (m) => m.SingleArticleModule
      ),
  },
  {
    path: 'Credits',
    loadChildren: () =>
      import('./modules/credits/credits.module').then((m) => m.CreditsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
