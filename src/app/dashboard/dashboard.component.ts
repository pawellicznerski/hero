import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  heroes: Hero[];

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe((h)=>this.heroes=h.slice(1,5))
  }

  ngOnInit() {
    this.getHeroes()
  }

}
