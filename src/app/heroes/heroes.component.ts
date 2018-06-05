import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }


  heroes: Hero[];
  selectedHero: Hero;
  // hero: Hero={
  //   name:"John",
  //   id:1
  // };
  // console.log(HEROES)
  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes=> this.heroes=heroes)
  }

  ngOnInit() {
    this.getHeroes();
  }
  title="Heroes app"

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }
}
