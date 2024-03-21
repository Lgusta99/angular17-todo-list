import { Component, signal } from '@angular/core';

//Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

//interface
import { IListItems } from '../../interface/IListItems.iterface';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItenm = signal(true)

  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem('@-limyst') || '[]')
  }


  public getInputAndAddItem(value: IListItems){
    localStorage.setItem('@-limyst',JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value : 'pending' | 'completed'){
    return this.getListItems().filter((res: IListItems) => {
      if(value === 'pending'){
        return !res.chacked;
      }

      if(value === 'completed'){
        return res.chacked;
      }

      return res;
    })
  }

  public deleteAllItems() {
    localStorage.removeItem('@-limyst');
    return this.#setListItems.set(this.#parseItems())
  }

}
