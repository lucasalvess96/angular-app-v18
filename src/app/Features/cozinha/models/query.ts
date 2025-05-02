export interface PaginatedQueryParameters {
  [filter: string]: string | number;

  /** Número de itens a serem exibidas */
  size: number;

  /** Número da páginas */
  page: number;

  /** Ordenação */
  sort: string;
}
