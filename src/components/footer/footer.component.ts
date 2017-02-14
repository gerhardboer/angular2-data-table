import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      role="row"
      [ngClass]="{'selected-count': selectedMessage}"
      [style.height.px]="footerHeight">
      <div class="page-count">
        <span *ngIf="selectedMessage">
          {{selectedCount.toLocaleString()}} {{selectedMessage}} / 
        </span>

        {{rowCount.toLocaleString()}} {{totalMessage}}
      </div>
      <datatable-pager
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        [aria]="aria.pager"
        (change)="page.emit($event)">
      </datatable-pager>
    </div>
  `,
  host: {
    class: 'datatable-footer'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFooterComponent {

  @Input() footerHeight: number;
  @Input() rowCount: number;
  @Input() pageSize: number;
  @Input() offset: number;
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;
  @Input() totalMessage: string;

  @Input() selectedCount: number;
  @Input() selectedMessage: string | boolean;

  @Input() aria: { [key: string]: string };

  @Output() page: EventEmitter<any> = new EventEmitter();

  get isVisible(): boolean {
    return (this.rowCount / this.pageSize) > 1;
  }

  get curPage(): number {
    return this.offset + 1;
  }

}
