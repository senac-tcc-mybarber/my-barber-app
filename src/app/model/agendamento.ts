import {Cliente} from './cliente';
import {Profissional} from './profissional';
import {Salao} from './salao';
import {Servico} from './Servico';

export class Agendamento {
  id: bigint;
  cliente: Cliente;
  profissional: Profissional;
  salao: Salao;
  servico: Servico;
  inicioServico: string;
  fimServico: string;
}
