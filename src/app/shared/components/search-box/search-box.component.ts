import {
  Component, Input,
  input,
  InputSignal, OnDestroy, OnInit, Output,
  output,
  OutputEmitterRef
} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  public placeholder: InputSignal<string> = input.required<string>();
  public initialValue: InputSignal<string> = input.required<string>();
  public onValue: OutputEmitterRef<string> = output<string>();
  public onDebounce: OutputEmitterRef<string> = output<string>();
  // rxjs
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;


  constructor() {
  }

  // ciclo de vida destroy cse ejecuta ej. cuando se redirecciona la vista
  public ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
    console.log('searchBoxDestroyed')
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  protected onKeyUpEnter(value: string): void {
    this.onValue.emit(value);
  }

  protected onKeyPress(searchKey: string): void {
    this.debouncer.next(searchKey);
  }
}
