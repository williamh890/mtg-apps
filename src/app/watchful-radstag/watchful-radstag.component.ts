import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { Creature } from './watchful-radstag.model';

enum RadstagViews {
  CardView,
  CreatureETBView
}

@Component({
  selector: 'app-watchful-radstag',
  templateUrl: './watchful-radstag.component.html',
  styleUrls: ['./watchful-radstag.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ]
})
export class WatchfulRadstagComponent implements OnInit {
  imageHeight = 0;
  imageWidth = 0;
  views = RadstagViews;
  view = RadstagViews.CardView;

  etbCreatureToughness = 1;
  defaultValues = Array.from(Array(100).keys())
  etbCreaturePower = 1;

  creatures: Creature[];

  constructor() { }

  ngOnInit(): void {
    this.creatures = [
      this.defaultStag()
    ]
  }

  @ViewChild('radstagImage') cardImage!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('resizing', this.cardImage);
    if (!this.cardImage) {
      return;
    }

    const width = this.cardImage.nativeElement.offsetWidth;
    const height = this.cardImage.nativeElement.offsetHeight;

    this.imageHeight = height;
    this.imageWidth = width;
  }

  onSetView(view: RadstagViews) {
    this.view = view;
  }

  onCreatureETBClicked(): void {
    console.log(this.etbCreaturePower, this.etbCreatureToughness);

    const etbCreature = {
      power: this.etbCreaturePower,
      toughness: this.etbCreatureToughness,
      plusOneCounters: 0,
      isStag: false,
    }

    this.creatures
      .forEach((stag, index) => {
        if (stag.isStag && this.doesCreatureEvolve(stag, etbCreature)) {
          console.log('evolving');

          this.creatures[index].plusOneCounters += 1;

          this.creatures.push({ ...stag, plusOneCounters: 0});
          console.log(this.creatures);
        }
      })

    this.view = this.views.CardView;
  }

  doesCreatureEvolve(evolveCreature: Creature, etbCreature: Creature): boolean {
    return this.totalPower(evolveCreature) < this.totalPower(etbCreature) ||
      this.totalToughness(evolveCreature) < this.totalToughness(etbCreature);
  }

  totalPower(creature: Creature): number {
    return creature.power + creature.plusOneCounters;
  }

  totalToughness(creature: Creature): number {
    return creature.toughness + creature.plusOneCounters;
  }

  defaultStag(): Creature {
    return {
      power: 2,
      toughness: 2,
      plusOneCounters: 0,
      isStag: true,
    };
  }
}
