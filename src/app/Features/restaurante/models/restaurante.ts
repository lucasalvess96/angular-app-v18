import { Cozinha } from '../../cozinha/models/cozinha';

export interface Restaurante {
  id: number;
  nome: string;
  taxaFrete: number;
  ativo: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
  cozinha: Cozinha;
}
