import { AssetModel } from "./asset.model";
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
  assets?: AssetModel[];
  signaturePath: string;
}