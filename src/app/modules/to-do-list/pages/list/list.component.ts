import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';

//Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

//interface
import { IListItems } from '../../interface/IListItems.iterface';

//enum
import { ElocalStorege } from '../../enum/ElocalStorege.enum';



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
    return JSON.parse(localStorage.getItem(ElocalStorege.MY_LIST) || '[]')
  }

  #updateLocalStorage(){
    return localStorage.setItem(
      ElocalStorege.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }


  public getInputAndAddItem(value: IListItems){
    localStorage.setItem(ElocalStorege.MY_LIST,JSON.stringify([...this.#setListItems(), value])
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

  public updateItemCheckbox(newItem: {id: string ; chacked: boolean }){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.chacked = newItem.chacked;
          return res;
        }
        return res;
      })
      return oldValue;
    });

    return this.#updateLocalStorage()
  }

  public updateItemText(newItem: {id: string; value: string}){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }
        return res;
      })
      return oldValue;
    });

    return this.#updateLocalStorage()

  }

  public deleteItem(id: string){

    Swal.fire({
      title: "Tem certeza?",
      text: "Não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar o item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });
    
        return this.#updateLocalStorage();
      }
    });


    
  }

  public deleteAllItems() {
    Swal.fire({
      title: "Tem certeza?",
      text: "Não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar tudo!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ElocalStorege.MY_LIST);
        return this.#setListItems.set(this.#parseItems())
      }
    });
  }

}
