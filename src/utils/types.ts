import { string } from "zod";

export type InputPropType = {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val?: any) => void;
  type?: string;
  isPassword?: boolean;
  isDisabled?: boolean;
};

export type ButtonProps = {
  onClick?: () => void;
  children: string | React.ReactNode;
  className?: string;
  type?: string;
  isSecondary?: boolean;
  isDisabled?: boolean;
};

export type RegisterCallResponse = {
  callId?: string;
  sampleRate: number;
};

export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export type AuthResponse = {
  message: string;
  data: {
    token: string;
  };
  success: boolean;
};

export type Tenant = {
  id: number;
  name: string;
  last_name: string;
  address: string;
  delinquency_notes: string;
  phone: string;
  amount_receivable: string;
};

export type Campaigns = {
  id: number;
  payment_status: string;
  commitment_status: null;
  next_call: string;
  tenant_id: number;
  user_id: number;
  conversation_id: 2;
  tenant: {
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
  };
  conversation: {
    summary: string;
  };
};

export type SingleCampaign = {
  id: number;
  payment_status: string;
  commitment_status: null;
  next_call: string;
  tenant_id: number;
  user_id: number;
  conversation_id: number;
  conversation: {
    id: 2;
    date: string;
    summary: string;
    transcript: [
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      },
      {
        role: string;
        content: string;
      }
    ];
  };
  tenant: {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
    amount: string;
    amount_paid: string;
    outstanding_balance: string;
    start_date: string;
    due_date: string;
    commitment_date: null;
    current_year: number;
    history: {};
    user_id: number;
  };
};

export type UpdateSettings = {
  voice_id: string;
  begin_message: string;
  general_prompt?: string;
  voice_speed: number;
};
