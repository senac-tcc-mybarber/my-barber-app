import {Cliente} from "./cliente";
import {Profissional} from "./profissional";
import {Salao} from "./salao";
import {Servico} from "./Servico";

export class Agendamento {
  id: number;
  cliente: Cliente;
  profissional: Profissional;
  salao: Salao;
  servico: Servico;
  inicioServico: Date;
  fimServico: Date;
  status: String;
  checkInCliente: Date;
  checkInProfissional: Date;
<<<<<<< HEAD
  finalizacao: Date;
=======
>>>>>>> master
}
