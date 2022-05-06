import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from 'src/app/services/correntista.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-movimentacao-list',
  templateUrl: './movimentacao-list.component.html',
  styleUrls: ['./movimentacao-list.component.css'],
})
export class MovimentacaoListComponent implements OnInit {
  movimentacoes: any;
  correntistas: any;
  correntista: any = {};
  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService
  ) {}
  ngOnInit(): void {
    this.exibirCorrentistas();
  }

  listMovimentacoes(): void {
    this.movimentacaoService.findByIdConta(this.correntista.id).subscribe(
      (data) => {
        this.movimentacoes = data;
        this.movimentacoes.map((data: any) => {
          data.dataHoraFormatada = this.formatarData(data);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatarData(data: any): String {
    return `${data.dataHora[0]}-${data.dataHora[1]}-${data.dataHora[2]} ${data.dataHora[3]}:${data.dataHora[4]}:${data.dataHora[5]}`;
  }

  exibirCorrentistas(): void {
    this.correntistaService.list().subscribe(
      (data) => {
        this.correntistas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
