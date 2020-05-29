interface Point {
  x: number;
  y: number;
}

export class Rule {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  direction: number; // 1 horizontal、 0 vertical

  static DPR = window.devicePixelRatio;

  constructor(canvas: HTMLCanvasElement, direction: number) {
    this.canvas = canvas;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.direction = direction;
  }

  init() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return false;
    }
    const isHorizontal: boolean = this.direction === 1 ? true : false;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    if (isHorizontal) {
      for (let i = 0; i < this.width / 10; i++) {
        const form: Point = {
          x: i * 10,
          y: i % 5 === 0 ? 0 : this.height / 2,
        };
        const to: Point = {
          x: i * 10,
          y: this.height,
        };
        this.drawLine(form, to, ctx);
      }
    } else {
      for (let i = 0; i < this.height / 10; i++) {
        const form: Point = {
          x: i % 5 === 0 ? 0 : this.width / 2,
          y: i * 10,
        };
        const to: Point = {
          x: this.width,
          y: i * 10,
        };
        this.drawLine(form, to, ctx);
      }
    }
  }

  drawLine(form: Point, to: Point, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(form.x, form.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.closePath();
  }
}
