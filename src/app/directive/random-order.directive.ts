import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomOrder]'
})
export class RandomOrderDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const contenedor: HTMLElement = this.el.nativeElement;
    const filas: HTMLElement[] = Array.from(contenedor.querySelectorAll('.row'));

    filas.forEach((fila) => {
      const botones = Array.from(fila.querySelectorAll('.opcion'));
      const botonesAleatorios = botones.sort(() => Math.random() - 0.5);

      botonesAleatorios.forEach((boton) => {
        fila.appendChild(boton);
      });
    });
  }
}
