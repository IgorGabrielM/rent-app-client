import { AssetCategoryModel } from "./assetCategory.model";
import { DefaultModel } from "./default.model";

export class AssetModel extends DefaultModel {
  identifier: string;
  name: string;
  is_available: boolean;
  assetCategory?: AssetCategoryModel

  quantity?: number
}