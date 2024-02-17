export interface DialogIcon {
  type: 'img' | 'mat-icon';
  /**
   * nombre del icono de material o la url de la imagen en los assets.
   */
  resource: string;
  width?: string;
  heigth?: string;
}
