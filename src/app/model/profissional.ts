import { Salao } from './salao';
import { Servico } from './Servico';

export class Profissional {
  id:Number;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  servicos:Servico[];
  saloes:Salao[];
}
