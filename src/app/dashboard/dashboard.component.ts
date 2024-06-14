import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContractModel } from 'src/@core/models/contract.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContractService } from 'src/@core/services/contract.service';
export class AssetCategoryForGraphs extends AssetCategoryModel {
  assetsAllByCategory?: number
}
export class ContactsForGraphs extends ContactModel {
  quantity?: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: AssetCategoryForGraphs[] = []

  chartGraphicAssetsByCategory: any;
  chartGraphicContractsByContacts: any;
  chartGraphicAssetsByCategoryPie: any;

  constructor(
    private assetCategoryService: AssetCategoryService,
    private contractService: ContractService,
    private contactService: ContactService,
    private assetService: AssetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadDataForCategoryAsset()
    this.loadContractsForContactsAsset()

    /*     setTimeout(() => {
          this.generatePDF();
        }, 2000) */
  }

  loadDataForCategoryAsset() {
    this.assetCategoryService.list().subscribe(async (assetCategories) => {
      const assets = await firstValueFrom(this.assetService.list())

      let quantities = await Promise.all(assetCategories.map(async (category) => {
        return {
          ...category,
          quantity: await this.getQuantity(category.id),
          assetsAllByCategory: assets.filter((asset) => asset.assetCategory.id === category.id).length
        }
      })) as { description: string, id: string, quantity: number, uid: string, value: number, assetsAllByCategory: number }[]

      this.loadGraphicAssetCategoryByAsset(quantities);
      this.loadChartGraphicAssetsByCategoryPie(quantities)
    });
  }

  async getQuantity(assetCategoryId: string) {
    const contracts: ContractModel[] = await firstValueFrom(this.contractService.list())
    let quantityAssetsByCategoryInUsed: number = 0
    contracts.forEach((contract) => {
      const asset = contract.assetCategories.find((asset) => asset.id === assetCategoryId)
      quantityAssetsByCategoryInUsed += asset ? asset.quantity : 0
    })
    return quantityAssetsByCategoryInUsed
  }

  loadGraphicAssetCategoryByAsset(data: AssetCategoryForGraphs[]): void {
    this.chartGraphicAssetsByCategory = {};
    this.chartGraphicAssetsByCategory = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Alugados', 'Total']
      },
      xAxis: [
        {
          type: 'category',
          data: data.map((category) => category.description),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Total',
        },
      ],
      series: [
        {
          name: 'Alugados',
          type: 'bar',
          data: data.map((category) => category.quantity),
        },
        {
          name: 'Total',
          type: 'line',
          data: data.map((category) => category.assetsAllByCategory)
        }
      ]
    };
  }

  async loadContractsForContactsAsset() {
    const contracts: ContractModel[] = await firstValueFrom(this.contractService.list())
    let contacts: ContactsForGraphs[] = await firstValueFrom(this.contactService.list())

    contacts = contacts.map((contact) => {
      return {
        ...contact,
        quantity: contracts.filter((contract) => contract.contactId === contact.id).length
      }
    })
    this.loadGraphicContactByContracts(contacts)
  }

  loadGraphicContactByContracts(data: ContactsForGraphs[]): void {
    this.chartGraphicContractsByContacts = {};
    this.chartGraphicContractsByContacts = {
      xAxis: {
        data: data.map((contact) => contact.name),
        type: 'category',
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.map((contact) => contact.quantity),
          type: 'bar'
        }
      ]
    };
  }

  loadChartGraphicAssetsByCategoryPie(data: AssetCategoryForGraphs[]) {
    this.chartGraphicAssetsByCategoryPie = {}
    this.chartGraphicAssetsByCategoryPie = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data.reverse().map((asset) => {
            return {
              value: asset.quantity,
              name: asset.description
            }
          })
        }
      ]
    };
  }

  generatePDF() {
    window.print();
    this.router.navigate(['../home']).then(() => {
      window.location.reload()
    })
  }
}
