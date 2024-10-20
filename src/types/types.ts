export interface FinanceHeader {
  _id: string;
  name: string;
  amount: string;
  feesCode: string;
  occurrence: string;
  dueDate: string;
  description?: string;
}

export interface FinanceMaster {
  _id: string;
  group: string;
  headers: FinanceHeader[];
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
