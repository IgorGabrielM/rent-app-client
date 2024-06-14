import { AssetModel } from "./asset.model";
import { AssetCategoryModel } from "./assetCategory.model";
import { DefaultModel } from "./default.model";

export class ContractModel extends DefaultModel {
  identifier: string;
  neighborhood: string;
  street: string;
  cep: number;
  numberHouse: number;
  complement: string;
  endDateLocate: Date;

  image: string

  contactId: string;
  contactName: string;
  termsContract: string;
  titleContract: string;
  assetCategories?: AssetCategoryModel[];
  signaturePath: string;
}