import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TriviaCategory } from 'src/app/enum/trivia-category';

declare var ruleta: any;

@Component({
  selector: 'app-roulettewheel',
  templateUrl: './roulettewheel.component.html',
  styleUrls: ['./roulettewheel.component.css']
})
export class RoulettewheelComponent implements OnInit {

  //Aqui tengo el output
  @Output() onEnviarItemHaciaPadre = new EventEmitter<number>();

  //Metodo que al ser llamado emite el idPregunta.
  enviarItemHaciaPadre(idPregunta: number){
    this.onEnviarItemHaciaPadre.emit(idPregunta)
  }

  private stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    const degrees = this.startAngle * 180 / Math.PI + 90;
    const arcd = this.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();
    this.ctx.font = 'bold 30px Helvetica, Arial';
    const text = this.options[index];
    this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
    this.ctx.restore();
  
    this.selectedCategory = this.options[index];

    var idPregunta = this.ObtenerIdPregunta(this.selectedCategory);

    //Activo el metodo para emitir el valor hacia el padre.
    this.enviarItemHaciaPadre(idPregunta)
  }

  private ObtenerIdPregunta(categoriaTrivia:TriviaCategory): number {
    var idPregunta:number = 0;

    switch(categoriaTrivia)
    {
        case TriviaCategory.General_Knowledge:
          idPregunta = 9
          break;
        case TriviaCategory.Films:
          idPregunta = 11
          break;
        case TriviaCategory.Music:
            idPregunta = 12
            break;
        case TriviaCategory.Video_Games:
          idPregunta = 15
          break;
        case TriviaCategory.Computers:
          idPregunta = 18
          break;
        case TriviaCategory.Sports:
          idPregunta = 21
          break;
        case TriviaCategory.Geography:
          idPregunta = 22
          break;
        case TriviaCategory.History:
          idPregunta = 23
          break;
        case TriviaCategory.Animals:
          idPregunta = 27
          break;
        case TriviaCategory.Vehicles:
          idPregunta = 28
          break;
    }

    return idPregunta;
  }

  private options = [TriviaCategory.Animals, TriviaCategory.Computers, TriviaCategory.Films, TriviaCategory.General_Knowledge,
  TriviaCategory.Geography, TriviaCategory.Geography, TriviaCategory.History, TriviaCategory.Sports, TriviaCategory.Music,
  TriviaCategory.Sports, TriviaCategory.Vehicles, TriviaCategory.Video_Games];

  private startAngle = 0;
  private arc = Math.PI / (this.options.length / 2);
  private spinTimeout: any;

  private spinArcStart = 10;
  private spinTime = 0;
  private spinTimeTotal = 0;

  private ctx!: CanvasRenderingContext2D;

  selectedCategory: TriviaCategory | undefined;

  ngOnInit() {
    this.drawRouletteWheel();
  }

  private byte2Hex(n: number): string {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  private RGB2Color(r: number, g: number, b: number): string {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  private getColor(item: number, maxitem: number): string {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  private drawRouletteWheel() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas.getContext) {
      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 125;

      this.ctx = canvas.getContext("2d")!;
      this.ctx.clearRect(0, 0, 500, 500);

      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;

      this.ctx.font = 'bold 12px Helvetica, Arial';

      for (let i = 0; i < this.options.length; i++) {
        const angle =  this.startAngle + i * this.arc;
        this.ctx.fillStyle = this.getColor(i, this.options.length);

        this.ctx.beginPath();
        this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "rgb(220,220,220)";
        this.ctx.fillStyle = "black";
        this.ctx.translate(
          250 + Math.cos(angle + this.arc / 2) * textRadius,
          250 + Math.sin(angle + this.arc / 2) * textRadius
        );
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        const text = this.options[i];
        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      }

      // Arrow
      this.ctx.fillStyle = "black";
      this.ctx.beginPath();
      this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.fill();
    }
  }

  spin() {
    this.spinArcStart = 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }

  private rotateWheel() {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = this.spinArcStart - this.easeOut(this.spinTime, 0, this.spinArcStart, this.spinTimeTotal);
    this.startAngle += spinAngle * Math.PI / 180;
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 30);
  }

  private easeOut(t: number, b: number, c: number, d: number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  
}