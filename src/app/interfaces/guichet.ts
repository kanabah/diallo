export interface Guichet{
    _id: string;
    type: string;
    description: string;
    montant: number;
    tel: number;
    action: number;
    code: string;
    user_id: any;
    agence_id: string;
    autorise: number;
    delete: number;
    createdAt: Date;
}
