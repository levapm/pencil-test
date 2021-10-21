import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({providedIn: 'root'})
export class FabricService {

  protected _canvas?: fabric.Canvas;
  protected _brush?: fabric.FreeDrawingBrush;
  options: Partial<fabric.Image>;
  changes: BehaviorSubject<any> = new BehaviorSubject({});


  constructor() {}

  public set canvas(surface: fabric.Canvas) {
    if (surface !== undefined && surface != null && surface instanceof fabric.Canvas) {
      this._canvas = surface;
      this._brush = surface.freeDrawingBrush;
      this._canvas.on('after:render', () => {
        this.changes.next(JSON.stringify(this._canvas));
      });
    }
  }

  public get canvas() {
    return this._canvas;
  }

  public set color(color: string) {
    this._brush.color = color;
  }

  public set lineWeight(width: number) {
    this._brush.width = width;
  }

  public set isDrawingMode(value: boolean) {
    this._canvas.isDrawingMode = value;
  }

  async addImage(url: string) {
    await fabric.Image.fromURL(url, (myImg) => {
      const img = myImg.set({ left: 50, top: 50});
      img.scale(.1);
      this._canvas.add(img);
      this._canvas.renderAll();
      this._canvas.isDrawingMode = false;
    });
    return true;
  }

  public load(data: string, callback?) {
    this.clear();
    this._canvas.loadFromJSON(data, callback);
  }

  public clear() {
    this._canvas.clear();
  }

  public detectChanges(): Observable<any> {
    return this.changes.asObservable();
  }




}
