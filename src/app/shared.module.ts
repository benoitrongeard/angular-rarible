import { NgModule } from "@angular/core";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        InfiniteScrollModule
    ],
    exports: [
        InfiniteScrollModule
    ]
})
export class SharedModule { }