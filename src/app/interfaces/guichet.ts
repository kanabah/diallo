export interface Guichet{
    _id: string;
    type: string;
    montant: number;
    variations: [{
        montantBrute: number,
        description: string,
        date: Date
    }];
    user_id: string;
    createdAt: Date;
}
