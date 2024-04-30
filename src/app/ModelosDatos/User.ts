// User.ts

export interface User {
    rut: number;
    dv: string;
    correo: string;
    password: string;
    nombre: string;
    apellido: string;
    rol: 'Administrativo' | 'Ayudante' |'';
    telefono: number;
  }

  export function verifyRut(user: User): boolean {
    let rut = String(user.rut);
    let dv = user.dv.toUpperCase();
    let total = 0;
    let factor = 2;
  
    for (let i = rut.length - 1; i >= 0; i--) {
      total += Number(rut.charAt(i)) * factor;
      factor = (factor === 7) ? 2 : factor + 1;
    }
  
    let dvExpected: number | string = 11 - (total % 11);
  
    if (dvExpected === 11) {
      dvExpected = '0';
    } else if (dvExpected === 10) {
      dvExpected = 'K';
    }
  
    return dv === String(dvExpected);
}

export function verificarRut(rut: number, dv: string): boolean {
    let total = 0; 
    let factor = 2;
  
    for (let i = String(rut).length - 1; i >= 0; i--) { // se recorre el rut de atrás hacia adelante
      total += Number(String(rut).charAt(i)) * factor; // se multiplica cada dígito por el factor correspondiente
      factor = (factor === 7) ? 2 : factor + 1; // en caso de que factor sea 7, se reinicia a 2, sino se suma 1
    }
  
    let dvExpected: number | string = 11 - (total % 11);
  
    if (dvExpected === 11) {
      dvExpected = '0';
    } else if (dvExpected === 10) {
      dvExpected = 'K';
    }
  
    return dv === String(dvExpected);
}