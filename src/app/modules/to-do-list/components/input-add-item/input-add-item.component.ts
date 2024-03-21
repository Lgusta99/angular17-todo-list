import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, input, output, viewChild } from '@angular/core';
import { IListItems } from '../../interface/IListItems.iterface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef);


  @ViewChild("inputText") public inputText!: ElementRef;


  @Input({ required: true }) public inputListItems: IListItems[] = []

  @Output() public outputAddListItems = new EventEmitter<IListItems>();
  public focusAndAddItem(value: string){
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const correntDate = new Date();
      const timestamp = correntDate.getTime()
      const id = `ID ${timestamp}`

      this.outputAddListItems.emit({
        id,
        chacked: false,
        value
      })
      return this.inputText.nativeElement.focus();
    }
  }
}
