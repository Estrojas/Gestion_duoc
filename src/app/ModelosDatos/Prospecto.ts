export interface Prospecto {
    rut: number | null ,
    dv: string,
    nombre: string;
    apellido: string;
    correo: string;
    telefono: number | null;
    estado: 'Pendiente' | 'Matriculado' | 'No matriculado'/*string;*/
    Matriculador: number | null;
    aut_corr: boolean;
    aut_tel: boolean;
}

export function verifyRutProspecto(prosp: Prospecto): boolean {
    let rut = String(prosp.rut);
    let dv = prosp.dv.toUpperCase();
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
/*rut
digito verificador
nombre
apellido
correo
telefono
tipo de admision
estado
atendido por
Observacion*/