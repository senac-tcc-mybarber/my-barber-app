import { Agendamento } from './agendamento';

export class Cliente {
  id:Number;
  username: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  agendamentos: Agendamento[];
}
