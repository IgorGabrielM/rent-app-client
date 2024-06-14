import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';

@Component({
  selector: 'app-contract-information',
  templateUrl: './contract-information.component.html',
  styleUrls: ['./contract-information.component.scss']
})
export class ContractInformationComponent implements OnInit {
  contract: ContractModel

  constructor(
    private contractService: ContractService,

    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadContract();

    setTimeout(() => {
      this.generatePDF();
    }, 2000)
  }

  loadContract() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      this.contractService.find(id).then((contract) => {
        console.log(contract)
        this.contract = contract as ContractModel
      })
    });
  }

  getTotalValue(): number {
    let totalValue: number = 0;

    this.contract?.assetCategories.forEach((asset) => {
      totalValue += Number(asset.value) * asset.quantity;
    });

    return totalValue;
  }

  totalValueCalculator(assetQuantity: number, assetPrice: number) {
    return String(assetQuantity * assetPrice)
  }

  generatePDF() {
    window.print();
    this.router.navigate(['../home']).then(() => {
      window.location.reload()
    })
  }
}
