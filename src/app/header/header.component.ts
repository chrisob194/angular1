import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() argSelected = new EventEmitter<string>();

  constructor(private dsService : DataStorageService) { }

  ngOnInit() {

  }

  onSavingData() {
    this.dsService.storeRecipes();
  }

  onFetchingData() {
    this.dsService.fetchRecipes().subscribe();
  }

}
