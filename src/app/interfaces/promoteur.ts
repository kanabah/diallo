export interface Promoteur{
    _id: string;
    montant: number;
    description: string;
    type: string;
    tel: number;
    client_id: string;
    agence_id: string;
    user_id: string;
    active: number;
    createdAt: Date;
}
