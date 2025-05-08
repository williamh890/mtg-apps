import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { RouterModule } from '@angular/router';

import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { COUNTERS } from '../counters';
import { CommonModule } from '@angular/common';

const KEYWORDS: string[] = [
  'flying',
  'first strike',
  'deathtouch',
  'hexproof',
  'lifelink',
  'menace',
  'reach',
  'trample',
  'vigilance',
  '+1/+1'
];

interface Counter {
  name: string;
  count: number;
}

@Component({
  selector: 'app-crystalline-giant',
  templateUrl: './crystalline-giant.component.html',
  styleUrls: ['./crystalline-giant.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CrystallineGiantComponent implements OnInit, AfterViewInit {
  keywords: Counter[] = KEYWORDS.map(
    keyword => ({
      name: keyword,
      count: 0
    })
  );

  counters = COUNTERS;
  filterCounters: Observable<string[]>;
  customCounterControl = new FormControl();

  customKeywords: Counter[] = []

  title = 'cystalline-giant';
  imageHeight = 0;
  imageWidth = 0;
  isEditing = false;

  @ViewChild('cardImage') cardImage!: ElementRef;

  ngOnInit(): void {
    this.filterCounters = this.customCounterControl.valueChanges.pipe(
      startWith(''),
      map(v => this._filter(v || ''))
    )
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.counters.filter(option => option.toLowerCase().includes(filterValue));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('resizing', this.cardImage);
    if(!this.cardImage) {
      return;
    }

    const width = this.cardImage.nativeElement.offsetWidth;
    const height = this.cardImage.nativeElement.offsetHeight;

    this.imageHeight = height;
    this.imageWidth = width;
  }

  ngAfterViewInit() {
    timer(200).subscribe(_ => this.onResize());
  }

  addKeyword() {
    const remainingKeywords = this.keywords.filter(counter => counter.count === 0);

    if (!remainingKeywords.length) {
      return;
    }

    const keywordIndex = Math.floor(Math.random() * remainingKeywords.length);
    remainingKeywords[keywordIndex].count += 1;
  }

  resetKeywords() {
    this.keywords = this.keywords.map(
      keyword => {
        keyword.count = 0;
        return keyword;
    });
    this.customKeywords = [];
  }

  proliforate() {
    this.keywords = this.keywords
      .map(
        keyword => {
          if (keyword.count > 0) {
            keyword.count += 1;
          }
          return keyword;
        });
    this.customKeywords = this.customKeywords
      .map(
        keyword => {
          if (keyword.count > 0) {
            keyword.count += 1;
          }
          return keyword;
        });
  }

  filteredKeywords() {
    return this.keywords.concat(this.customKeywords).filter(counter => counter.count !== 0);
  }

  capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
  }

  setEditMode(newMode: boolean) {
    this.isEditing = newMode;
    this.onResize();
  }

  onAddCustomCounter() {
    if (this.customCounter === '') {
      return;
    }

    const kwSet = new Set(KEYWORDS);

    if (kwSet.has(this.customCounter.toLowerCase())) {
      this.addCounter(this.customCounter.toLowerCase());
    } else {
      this.customKeywords.push({
        name: this.customCounter.toLowerCase(),
        count: 1,
      });
    }
    this.customCounter = '';
  }

  addCounter(name: string) {
    this.keywords = this.keywords.map(kw => {
      if (kw.name === name) {
        kw.count += 1;
      }

      return kw
    })

    this.customKeywords = this.customKeywords.map(kw => {
      if (kw.name === name) {
        kw.count += 1;
      }

      return kw
    })
  }

  removeCounter(name: string) {
    this.keywords = this.keywords.map(kw => {
      if (kw.name === name) {
        kw.count -= 1;
      }

      return kw
    });

    this.customKeywords = this.customKeywords.map(kw => {
      if (kw.name === name) {
        kw.count -= 1;
      }

      return kw
    });
  }

  customCounter = '';
}
