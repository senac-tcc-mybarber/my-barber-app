import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { Profissional } from 'src/app/model/profissional';
import { Salao } from 'src/app/model/salao';
import { Servico } from 'src/app/model/Servico';

// TODO: Replace this with your own data model type
export interface DataTableHistoricoItem {
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
  finalizacao: Date;
}

/**
 * Data source for the DataTableHistorico view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableHistoricoDataSource extends DataSource<DataTableHistoricoItem> {
  data: DataTableHistoricoItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableHistoricoItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableHistoricoItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableHistoricoItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'servico': return compare(a.servico.descricao, b.servico.descricao, isAsc);
        case 'horario': return compare(a.inicioServico, b.inicioServico, isAsc);
        case 'local': return compare(a.salao.endereco, b.salao.endereco, isAsc);
        case 'servico': return compare(a.servico.descricao, b.servico.descricao, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
