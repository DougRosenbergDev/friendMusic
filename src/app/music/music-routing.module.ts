import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
    { path: 'music', redirectTo: 'music/index', pathMatch: 'full' },
    { path: 'music/index', component: IndexComponent },
    { path: 'music/create', component: CreateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MusicRoutingModule {}