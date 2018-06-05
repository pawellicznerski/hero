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

  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes=> this.heroes=heroes)
  }

  add(name: string): void{
    name= name.trim();
    if(!name){return;}
    this.heroService.addHero({name}as Hero)
    .subscribe(hero=> this.heroes.push(hero))
  }

  removeHero(id: number): void{
    this.heroes=this.heroes.filter((h)=>h.id!==id);
    this.heroService.deleteHero(id).subscribe()
  }

  ngOnInit() {
    this.getHeroes();
  }
  title="Heroes app"

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }
}
