export interface DetalleFactura {
  id?: number;

  facturaId?: number;

  producto: string;

  cantidad: number;

  precio: number;

  total: number;
}
