import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profissional } from '../../../model/profissional';
import { RestService } from '../../../rest.service';
import { Servico } from '../../../model/Servico';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-associar-servicos-profissional',
  templateUrl: './associar-servicos-profissional.component.html',
  styleUrls: ['./associar-servicos-profissional.component.scss']
})
export class AssociarServicosProfissionalComponent implements OnInit {

  profissional: Profissional = { id: 0, nome: '', username: '', telefone: '', email: '', senha: '', saloes: null, servicos: null, agendamentos: null};
  dataSource: Servico[];
  servicosProfissional: Servico[] = [];
  servicosForm: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute, private api: RestService, private formBuilder: FormBuilder) {
    this.servicosForm = this.formBuilder.group({
      servicos: new FormArray([])
    });
   }

  ngOnInit() {
    this.getProfissional(this.route.snapshot.params['id'])
    this.api.getServicos()
    .subscribe(res => {
      this.dataSource = res;
      this.addCheckboxes();
    }, err => {
      console.log(err);
    });

  }

  getProfissional(id) {
    this.api.getProfissional(id)
      .subscribe(data => {
        this.profissional = data;
      });
  }

  addCheckboxes() {
    this.dataSource.forEach( () => {
      const control = new FormControl();
      (this.servicosForm.controls.servicos as FormArray).push(control);
    });
  }

  submit() {
    const selectedServicosIds = this.servicosForm.value.servicos.map((v, i) => (v ? this.dataSource[i].id : null)).filter(v => v !== null);
    for(let i=0; i<selectedServicosIds.length; i++){
      this.servicosProfissional.push(this.dataSource.find(element => element.id === selectedServicosIds[i]))
    }
    this.api.associarServicos(this.profissional.id,  this.servicosProfissional).subscribe(() => {
        this.router.navigate(["layout","home"])
      },
      err => {
        console.log(err);
      });
  }
}
