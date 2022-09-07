import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "details-page/:name",
    component: DetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
