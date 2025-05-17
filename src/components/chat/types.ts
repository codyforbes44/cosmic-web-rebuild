
export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export interface UserInfo {
  name: string;
  email: string;
  submitted: boolean;
}
