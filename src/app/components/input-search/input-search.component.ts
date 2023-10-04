import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {

  @Output() textChange = new EventEmitter<string>();
  inputText: string = '';

  onSearch() {
    this.textChange.emit(this.inputText);
  }

}
