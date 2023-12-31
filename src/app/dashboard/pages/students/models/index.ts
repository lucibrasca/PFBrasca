export interface Student {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    telefono: string;
    documento: number;
  }

  export interface CreateStudentData {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    telefono: string;
    documento: number;
  }

  export interface UpdateStudentData {
    nombre?: string;
    apellido?: string;
    email?: string;
    contrasenia?: string;
    telefono?: string;
    documento?: number;
  }