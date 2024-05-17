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
  type?: "button" | "reset" | "submit";
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
