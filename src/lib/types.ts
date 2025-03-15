// Investment Interface
export interface Investment {
    id: number;
    name: string;
    amount: number;
    roi: number;
    date: string;
  }
  
  export interface InvestmentFormData {
    name: string;
    amount: number;
    document?: File | null;
  }
  
  export interface TableState {
    data: Investment[];
    loading: boolean;
    error: string | null;
  }