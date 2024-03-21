import { Component, EventEmitter, Input, Output } from '@angular/core';

//interface
import { IListItems } from '../../interface/IListItems.iterface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  @Input({ required: true }) public inputListItems: IListItems[] = []

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{ id: string, chacked: boolean}>();

  public updateItemCheckbox( id: string, chacked: boolean){
    return this.outputUpdateItemCheckbox.emit({id, chacked});
  }

  @Output() public outputUpdateItemText = new EventEmitter<{ id: string, value: string}>();

  public updateItemText( id: string, value: string){
    return this.outputUpdateItemText.emit({id, value});
  }

  @Output() public outputDeleteItem = new EventEmitter<string>();

  public deleteItem( id: string){
    return this.outputDeleteItem.emit(id);
  }
  
}
