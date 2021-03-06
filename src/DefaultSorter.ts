import {Component, Input, OnInit} from "@angular/core";
import {DataTable, SortEvent} from "./DataTable";

@Component({
    selector: "mfDefaultSorter",
    template: `
        <a style="cursor: pointer" (click)="sort()" class="text-nowrap" [ngClass]="{'datatable-sort-active': isSortedByMeAsc || isSortedByMeDesc}">
            <ng-content></ng-content>
            <span *ngIf="!isSortedByMeAsc && !isSortedByMeDesc" class="fe-bold-transform90 fe-code" aria-hidden="true"></span>
            <span *ngIf="isSortedByMeAsc" class="fe-bold-black fe-chevron-up" aria-hidden="true"></span>
            <span *ngIf="isSortedByMeDesc" class="fe-bold-black fe-chevron-down" aria-hidden="true"></span>
        </a>`
})
export class DefaultSorter implements OnInit {
    @Input("by") sortBy: string;

    isSortedByMeAsc: boolean = false;
    isSortedByMeDesc: boolean = false;

    public constructor(private mfTable: DataTable) {
    }

    public ngOnInit(): void {
        this.mfTable.onSortChange.subscribe((event: SortEvent) => {
            this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == "asc");
            this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == "desc");
        });
    }

    sort() {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        } else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    }
}