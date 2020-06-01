interface Point {
  x: number;
  y: number;
}

export class Rule {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  direction: number; // 1 horizontal、 0 vertical
  isHorizontal: boolean; // 1 horizontal、 0 vertical

  static DPR = window.devicePixelRatio;

  constructor(canvas: HTMLCanvasElement, direction: number) {
    this.canvas = canvas;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.direction = direction;
    this.isHorizontal = direction === 1 ? true : false;
  }

  init() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return false;
    }
    ctx as CanvasRenderingContext2D;
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.width * devicePixelRatio;
    this.canvas.height = this.height * devicePixelRatio;
    this.isHorizontal = this.direction === 1 ? true : false;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.75;
    if (this.isHorizontal) {
      for (let i = 0; i * 5 < this.width; i++) {
        const form: Point = {
          x: i * 5 * devicePixelRatio,
          y:
            i % 10 === 0
              ? 0
              : i % 5 === 0
              ? this.height * devicePixelRatio * 0.33
              : this.height * devicePixelRatio * 0.66,
        };
        const to: Point = {
          x: i * 5 * devicePixelRatio,
          y: this.height * devicePixelRatio,
        };
        this.drawLine(form, to, ctx);
        if (i % 10 === 0) {
          this.drawText(i * 5, ctx, {
            x: i * 5 * devicePixelRatio + 2,
            y: 12,
          } as Point);
        }
      }
    } else {
      for (let i = 0; i * 5 < this.height; i++) {
        const form: Point = {
          x:
            i % 10 === 0
              ? 0
              : i % 5 === 0
              ? this.width * devicePixelRatio * 0.33
              : this.width * devicePixelRatio * 0.66,
          y: i * 5 * devicePixelRatio,
        };
        const to: Point = {
          x: this.width * devicePixelRatio,
          y: i * 5 * devicePixelRatio,
        };
        this.drawLine(form, to, ctx);
      }
      for (let i = 0;i * 50 < this.height;i++) {
        ctx.translate(100, i * 50 * devicePixelRatio + 2)
        ctx.rotate(Math.PI / 2);
        this.drawText(i * 50, ctx, {
          x: 100,
          y: i * 50 * devicePixelRatio + 2,
        } as Point);
        ctx.rotate(-Math.PI / 2);
      }
    }
  }

  drawText(tick: number, ctx: CanvasRenderingContext2D, position: Point): void {
    // if (!this.isHorizontal) {
    //   ctx.translate(position.x, position.y)
    //   ctx.save();
    //   ctx.rotate(Math.PI / 2);
    // }
    ctx.fillStyle = '#90a0ae';
    ctx.font = `${20}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.fillText(`${tick}`, position.x, position.y);
    // ctx.rotate(-Math.PI / 2);
    // ctx.restore();
  }

  drawLine(form: Point, to: Point, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(form.x, form.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.closePath();
  }
}
