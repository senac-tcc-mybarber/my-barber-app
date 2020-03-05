import { Servico } from './Servico';
import { Agendamento } from './agendamento';

export class Cliente {
  id:Number
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  agendamentos:Agendamento[];
}
