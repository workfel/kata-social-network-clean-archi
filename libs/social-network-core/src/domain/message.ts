import { User } from '@poc-clean-archi-state-management/social-network-core';

export interface Message {
  id: string;
  content: string;
  user : User;
}

export type Messages = Message[];
