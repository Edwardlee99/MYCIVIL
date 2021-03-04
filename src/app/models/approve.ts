//This interface is use for approval list
export interface approveList {
    IC: string;
    NAME: string;
    STATUS: string;
    STARTDATE: string;
    STATUSDATE: string;
    EMAIL: string;
    TELNO: string;
    REFNO: string;
    
}

//This interface is use for birth approval list
export interface bapproveList {
    FATHERIC: string;
    FATHERNAME: string;
    MOTHERIC: string;
    MOTHERNAME: string;
    STATUS: string;
    STARTDATE: string;
    STATUSDATE: string;
    EMAIL: string;
    TELNO: string;
    REFNO: string;
    STATE: string;
}


//This interface is use for marry approval list
export interface mapproveList {
    MANIC: string;
    MANNAME: string;
    WOMANIC: string;
    WOMANNAME: string;
    STATUS: string;
    STARTDATE: string;
    STATUSDATE: string;
    WOMANEMAIL: string;
    WOMANTELNO: string;
    MANEMAIL: string;
    MANTELNO: string;
    REFNO: string;
}