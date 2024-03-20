import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild, inject, output, viewChild } from '@angular/core';
import { IListItems } from '../../interface/IListitems.iterface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef);


  @ViewChild("inputText") public inputText!: ElementRef;

  @Output() public outputListItems = new EventEmitter<IListItems>();
  public focusAndAddItem(value: string){
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const dataAtual = new Date();
      const timestamp = dataAtual.getTime()
      const id = `ID ${timestamp}`

      this.outputListItems.emit({
        id,
        chacked: false,
        value
      })
      return this.inputText.nativeElement.focus();
    }
  }
}
