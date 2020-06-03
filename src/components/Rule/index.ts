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
  ticks: Array<number>; // 刻度 px 数组

  constructor(canvas: HTMLCanvasElement, direction: number) {
    this.canvas = canvas;
    this.direction = direction;
    this.isHorizontal = direction === 1 ? true : false;
    this.ratio = window.devicePixelRatio || 1;
    this.ticks = [1, 2, 5, 10, 20, 50, 100];
  }

  // 绘制
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

  // 设置像素比例
  setRatio(ctx: CanvasRenderingContext2D) {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    const { ratio, width, height } = this;
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    ctx.clearRect(0, 0, width, height);
  }

  // 绘制轴
  setAxis(ctx: CanvasRenderingContext2D, scale: number, start: number) {
    ctx.strokeStyle = '#90a0ae';
    ctx.lineWidth = 1;

    const { isHorizontal, ratio, width, height, ticks } = this;
    const line: number = isHorizontal ? height * ratio : width * ratio; // 刻度线长度
    const axis: number = isHorizontal ? width : height; // 轴长
    const startTick = start < 0 ? 0 : -Math.floor(start);
    const endTick = start < 0 ? axis - Math.floor(start) : axis;

    let actualTick;
    if (scale > 1) {
      actualTick = Math.max(0, 2 - Math.round(scale - 1));
    } else {
      actualTick = Math.min(ticks.length - 1, 2 + Math.round(1 / scale - 1));
    }
    const tick = ticks[actualTick];
    for (let j = startTick; j * tick < endTick / scale; j++) {
      const i = j * scale; // i => interval  每个格子间隔距离
      const from: Point = {
        x: (i * tick + start) * ratio,
        y: j % 10 === 0 ? 0 : j % 5 === 0 ? line * 0.33 : line * 0.66,
      };
      const to: Point = {
        x: (i * tick + start) * ratio,
        y: line,
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
        x: (i * tick + start) * ratio + 2,
        y: 12,
      };
      if (j % 10 === 0) {
        this.drawText(
          j * tick,
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

  // 绘制文本
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

  // 绘制线段
  drawLine(from: Point, to: Point, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.closePath();
  }
}
