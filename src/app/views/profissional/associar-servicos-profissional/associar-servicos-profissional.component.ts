import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profissional } from 'src/app/model/profissional';
import { RestService } from 'src/app/rest.service';
import { Servico } from 'src/app/model/Servico';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-associar-servicos-profissional',
  templateUrl: './associar-servicos-profissional.component.html',
  styleUrls: ['./associar-servicos-profissional.component.scss']
})
export class AssociarServicosProfissionalComponent implements OnInit {

  profissional: Profissional = { id: 0, nome: '', telefone: '', email: '', senha: '', saloes: null, servicos: null};
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
      console.log(this.dataSource);
    }, err => {
      console.log(err);
    });   
    
  }

  getProfissional(id) {
    this.api.getProfissional(id)
      .subscribe(data => {
        this.profissional = data;
        console.log(this.profissional);
      });
  }

  addCheckboxes() {
    this.dataSource.forEach( (element) => {
      const control = new FormControl();
      (this.servicosForm.controls.servicos as FormArray).push(control);
    });
  }
  
  submit() {
    const selectedServicosIds = this.servicosForm.value.servicos.map((v, i) => (v ? this.dataSource[i].id : null)).filter(v => v !== null);
    for(let i=0; i<selectedServicosIds.length; i++){
      this.servicosProfissional.push(this.dataSource.find(element => element.id === selectedServicosIds[i]))
    }
    this.api.associarServicos(this.profissional.id,  this.servicosProfissional).subscribe(console.table);
  }
}
