import { Salao } from './SalaoX';
import { Servico } from './Servico';

export class Profissional {
  id:Number;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  Servico:Servico[];
  Saloes:Salao[];
}
