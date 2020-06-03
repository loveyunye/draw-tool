interface Point {
  x: number;
  y: number;
}

export class Rule {
  canvas: HTMLCanvasElement;
  direction: number; // 1 horizontal、 0 vertical
  isHorizontal: boolean; // 1 horizontal、 0 vertical
  ratio: number; // 像素比
  width!: number;
  height!: number;

  static DPR = window.devicePixelRatio;

  constructor(canvas: HTMLCanvasElement, direction: number) {
    this.canvas = canvas;
    this.direction = direction;
    this.isHorizontal = direction === 1 ? true : false;
    this.ratio = window.devicePixelRatio || 1;
  }

  draw(scale = 1, start = 0) {
    // 获取ctx
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return false;
    }
    ctx as CanvasRenderingContext2D;
    // 设置像素比例
    this.setRatio(ctx);
    this.setAxis(ctx, scale, start);
  }

  setRatio(ctx: CanvasRenderingContext2D) {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    const { ratio, width, height } = this;
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    ctx.clearRect(0, 0, width, height);
  }

  setAxis(ctx: CanvasRenderingContext2D, scale: number, start: number) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.75;
    const { isHorizontal, ratio, width, height } = this;
    const tickLength: number = isHorizontal ? height * ratio : width * ratio;
    const axisLength: number = isHorizontal ? width : height;
    for (let j = -Math.floor(start); j * 5 < axisLength / scale; j++) {
      const i = j * scale; // i => interval  每个格子间隔距离
      const from: Point = {
        x: (i * 5 + start) * ratio,
        y:
          j % 10 === 0
            ? 0
            : j % 5 === 0
            ? tickLength * 0.33
            : tickLength * 0.66,
      };
      const to: Point = {
        x: (i * 5 + start) * ratio,
        y: tickLength,
      };
      this.drawLine(
        {
          x: isHorizontal ? from.x : from.y,
          y: isHorizontal ? from.y : from.x,
        },
        {
          x: isHorizontal ? to.x : to.y,
          y: isHorizontal ? to.y : to.x,
        },
        ctx,
      );
      const text: Point = {
        x: (i * 5 + start) * ratio + 2,
        y: 12,
      };
      if (j % 20 === 0) {
        this.drawText(
          j * 5,
          ctx,
          {
            x: isHorizontal ? text.x : text.y,
            y: isHorizontal ? text.y : text.x,
          } as Point,
          isHorizontal,
        );
      }
    }
  }

  drawText(
    tick: number,
    ctx: CanvasRenderingContext2D,
    position: Point,
    isHorizontal: boolean,
  ): void {
    if (!isHorizontal) {
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(Math.PI / 2);
    }
    ctx.fillStyle = '#90a0ae';
    ctx.font = `${20}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.fillText(
      `${tick}`,
      isHorizontal ? position.x : 0,
      isHorizontal ? position.y : 0,
    );
    ctx.restore();
  }

  drawLine(from: Point, to: Point, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.closePath();
  }
}
