export interface User{
    _id: string;
    email: string;
    name: string;
    nameAgence: string;
    adress: string;
    tel: string;
    photo: string;
    user_id: string;
    agence_id: string;
    soldActuel: [{
        date: any,
        montant,
        _id: string
    }];
    soldSortie: [{
        date: any,
        montant,
        _id: string
    }];
    role: string;
    password: string;
    active: number;
    // confirm: number;
    exp: number;
    iat: number;
}
