import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  public placeholder: InputSignal<string> = input.required<string>();
  public onValue: OutputEmitterRef<string> = output<string>();

  constructor() {
  }

  protected onKeyUpEnter(value: string): void {
    this.onValue.emit(value);
  }
}
