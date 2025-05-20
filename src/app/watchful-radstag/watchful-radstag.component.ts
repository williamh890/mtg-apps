import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { CopyTrigger, Creature, CreatureEtbTrigger, EvolveTrigger, Trigger } from './watchful-radstag.model';

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

  stags: { [id: string]: Creature };

  constructor() { }

  ngOnInit(): void {
    this.resetStags();
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
    const etbCreature: Creature = {
      power: this.etbCreaturePower,
      toughness: this.etbCreatureToughness,
      plusOneCounters: 0,
    }

    this.onCreatureETB({ creature: etbCreature, kind: "creatureEtbTrigger" });
  }

  onCreatureETB(etbTrigger: CreatureEtbTrigger): void {
    this.magicEngine([etbTrigger]);
  }

  magicEngine(triggers: Trigger[]) {
    while (triggers.length > 0) {
      const trigger = <Trigger>triggers.pop();
      console.log(trigger, triggers);

      switch (trigger.kind) {
        case 'creatureEtbTrigger': {
          const newEvolveTriggers = this.getEvolveTriggersFromStags(this.stags, trigger);

          triggers = [
            ...triggers, ...newEvolveTriggers
          ]
          break;
        }
        case 'evolveTrigger': {
          const stag = this.stags[trigger.stagId];
          stag.plusOneCounters += 1;

          triggers.push(<CopyTrigger>{ kind: 'copyTrigger', stagId: trigger.stagId });
          break;
        }
        case 'copyTrigger': {
          const newStag = {
            ...this.stags[trigger.stagId],
          };
          newStag.plusOneCounters = 0;

          const newEvolveTriggers = this.getEvolveTriggersFromStags(this.stags, {
            kind: 'creatureEtbTrigger', creature: newStag
          });

          triggers = [
            ...triggers, ...newEvolveTriggers
          ]

          this.stags[this.makeId()] = newStag;
          break;
        }
      }
    }
  }

  getEvolveTriggersFromStags(stags: { [id: string]: Creature }, trigger: CreatureEtbTrigger): EvolveTrigger[] {
    return Object.entries(stags)
      .filter(([_, stag]) => this.doesCreatureEvolve(stag, trigger.creature))
      .map(([stagId, _]) => (<EvolveTrigger>{ stagId, kind: 'evolveTrigger' }));

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

  resetStags() {
    const stagId = this.makeId();

    this.stags = {
      [stagId]: this.defaultStag()
    };
  }

  defaultStag(): Creature {
    return {
      power: 2,
      toughness: 2,
      plusOneCounters: 0,
    };
  }

  makeId() {
    return crypto.randomUUID();
  }
}
