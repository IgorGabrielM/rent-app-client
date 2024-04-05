import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetCategoryModel } from 'src/@core/models/assetCategory.model';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContractModel } from 'src/@core/models/contract.model';
import { AssetService } from 'src/@core/services/asset.service';
import { AssetCategoryService } from 'src/@core/services/assetCategory.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContractService } from 'src/@core/services/contract.service';

export class AssetCategoryForGraphs extends AssetCategoryModel {
  quantity?: number
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

  constructor(
    private assetCategoryService: AssetCategoryService,
    private contractService: ContractService,
    private contactService: ContactService,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.chartGraphicAssetsByCategory = {};

    this.loadDataForCategoryAsset()
    this.loadContractsForContactsAsset()
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

      //adicionar uma linha no grafico mostrando a quantidade total
      console.log(quantities)

      this.loadGraphicAssetCategoryByAsset(quantities);
    });
  }

  async getQuantity(assetCategoryId: string) {
    const contracts: ContractModel[] = await firstValueFrom(this.contractService.list())
    let quantityAssetsByCategoryInUsed: number = 0
    contracts.forEach((contract) => {
      const asset = contract.assets.find((asset) => asset.assetCategory.id === assetCategoryId)
      quantityAssetsByCategoryInUsed += asset ? asset.quantity : 0
    })
    return quantityAssetsByCategoryInUsed
  }

  loadGraphicAssetCategoryByAsset(data: AssetCategoryForGraphs[]): void {
    this.chartGraphicAssetsByCategory = {};
    this.chartGraphicAssetsByCategory = {
      xAxis: {
        data: data.map((category) => category.description),
        type: 'category',
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.map((category) => category.quantity),
          type: 'bar'
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
}
