export interface Restaurante {
  id: number;
  nome: string;
  taxaFrete: number;
  ativo: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
  cozinha: Cozinha;
}

export interface Cozinha {
  id: number;
  nome: string;
}
