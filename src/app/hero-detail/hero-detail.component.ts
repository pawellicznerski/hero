import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute} from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  getHero(): void{
    // console.log(this.route)
    const id = +this.route.snapshot.paramMap.get('id');

    if(!id){
      this.messageService.add(`Hero's id is NaN`)
      return;
    }
    this.heroService.getHero(id)
    .subscribe((h)=>this.hero=h)
  }

  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(()=>this.goBack())
  }

  goBack(){
    this.location.back()
  }
  ngOnInit() {
    this.getHero()
  }

}
