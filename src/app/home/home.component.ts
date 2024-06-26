import { Component, OnInit } from '@angular/core';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constracts: ContractModel[] = []
  results: ContractModel[] = []
  contractToDeleteId: string

  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit(): void {
    this.loadContracts()
  }

  loadContracts() {
    this.contractService.list().subscribe((contracts) => {
      this.constracts = contracts as ContractModel[]
      this.results = contracts as ContractModel[]
    })
  }

  filterByQuery(ev: any, query: string) {
    const param: string = ev.target.value.toLowerCase()
    if (param && param.length) {
      this.results = this.constracts.filter((c) => c[query].toLowerCase().indexOf(param) > -1)
    } else {
      this.results = this.constracts
    }
  }
}
