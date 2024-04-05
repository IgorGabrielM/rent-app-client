import { DefaultModel } from "./default.model";

export class ContactModel extends DefaultModel {
  name: string;
  telephone: string;
  email?: string;
}