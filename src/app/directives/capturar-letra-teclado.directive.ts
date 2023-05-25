import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCapturarLetraTeclado]',
})
export class CapturarLetraTecladoDirective {

  //#region Properties 

  letra : string = '';
  @Output() newItemEvent = new EventEmitter<string>();

   //#endregion

  constructor(private el: ElementRef) { }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('yellow');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('');
  // }

  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

    @HostListener('click') onClick() {
    this.CapturarLetraTeclado();
  }

    private CapturarLetraTeclado() {
    // console.log(this.el.nativeElement.innerHTML);
    this.letra = this.el.nativeElement.innerHTML;
    this.newItemEvent.emit(this.letra);
    // console.log(this.el.nativeElement);
  }  
}
