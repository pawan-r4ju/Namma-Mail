export type Role = 'user' | 'team-lead' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  lastLogin: string;
}

export interface Email {
  id: number;
  sender: string;
  email: string;
  recipients: {
    to: string[];
    cc: string[];
    bcc: string[];
  };
  subject: string;
  body: string;
  preview: string;
  time: string;
  starred: boolean;
  read: boolean;
  labels: string[];
  important: boolean;
  attachments: {
    name: string;
    size: number;
    type: string;
  }[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
}

export type EmailFilter = 'all' | 'unread' | 'starred' | 'important';

export interface EmailFolder {
  id: string;
  name: string;
  icon: string;
  count: number;
}