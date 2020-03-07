import { Salao } from './salao';
import { Servico } from './Servico';
import {Agendamento} from './agendamento';

export class Profissional {
  id: Number;
  nome: string;
  username: string;
  telefone: string;
  email: string;
  senha: string;
  servicos: Servico[];
  saloes: Salao[];
  agendamentos: Agendamento[];
}
