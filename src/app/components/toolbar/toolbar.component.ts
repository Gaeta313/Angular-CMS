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
  @Input() type!: string;
  @Input() articleId!: string | undefined;
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  categories$!: Observable<Categories[]>;
  deleteSubscription!: Subscription;

  constructor(public router: Router, private articleSrv: ArticleService) {}

  ngOnInit(): void {
    this.categories$ = this.articleSrv.getAllCategory();
  }

  onSelect(event: any) {
    this.onSelected.emit(event.target.value);
  }

  onDelete() {
    this.deleteSubscription = this.articleSrv
      .deleteArticle(this.articleId!)
      .subscribe(() => {
        this.router.navigate(['/Articles']);
      });
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }
}
