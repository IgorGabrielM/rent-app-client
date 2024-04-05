import { DefaultModel } from "./default.model"

export class UserModel extends DefaultModel {
    email: string
    password: string

    name: string
    cnpj: string
    contractTerms: string
}