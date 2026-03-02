export interface Usuario {
  id: string;
  email: string;    
  password: string; 
  name: string;
  role: 'admin' | 'user';
  token: string;
}