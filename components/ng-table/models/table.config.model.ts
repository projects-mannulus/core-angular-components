export interface NgTableConfig<T> {
  title?: string;
  /**
   * nombre de las columnas.
   */
  headerColumns?: string[];
  /**
   * ancho de las columnas.
   */
  widthColumns?: string[];
  /**
   * nombre del campo de cada dato que aparecera en cada columna en el mismo orden que se declara en este arreglo.
   */
  keys?: string[];
  /**
   * tipo informacion de la columna.
   */
  typeColumns?: TypeColumnsTable[];
  mapperColums?: ((column: any, row: T) => any)[];
  actions?: {
    key?: string;
    icon?: string;
    color?: string;
    label?: string;
    event?: (row: T) => void;
  }[];
  /**
   * si se quiere ocultar las acciones por defecto (CRUD).
   */
  hideDefaultActions?: {
    add?: boolean;
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
  /**
   * todos los datos de la tabla.
   */
  allData?: T[];
  urlData?: string;
  dataOptions?: {
    /**
     * nombre del parametro que se enviara en la peticion con todo los datos. por defecto es todo el objeto.
     */
    dataKey?: string;
  };
  /**
   * indica si la informacion de la tabla es paginada. (Si es true, se busca la informacion en "content" del body de la respuesta,
   *  a menos que se especifique en dataOptions.dataKey)
   */
  pageable?: boolean;
  pageableOptions?: {
    /**
     * nombre del parametro que se enviara en la peticion con el numero de pagina. por defecto es page.
     */
    pageKey?: string;
    /**
     * nombre del parametro que se enviara en la peticion con el numero de elementos por pagina. por defecto es size.
     */
    sizeKey?: string;
    /**
     * nombre del parametro que se enviara en la peticion con la key del elementos para hacer sort. por defecto es sort.
     */
    sortKey?: string;
    /**
     * cantidad de elementos por pagina. por defecto es 5.
     */
    pageSizeOptions?: number[];
    otherParams?: {
      [key: string]: any;
    };
  };
  /**
   * indica si se debe mostrar el filtro de busqueda. (por defecto es true).
   */
  showFilter?: boolean;
  /**
   * indica si se debe ocultar el paginador.
   */
  hidePaginator?: boolean;
  /**
   * indica si se debe mostrar el boton de check para seleccionar los elementos.
   */
  checkbox?: boolean;
}

export type TypeColumnsTable =
  | 'uuid'
  | 'date'
  | 'number'
  | 'string'
  | 'boolean'
  | 'currency'
  | 'percent'
  | 'time'
  | 'datetime'
  | 'badge'
  | 'custom';
