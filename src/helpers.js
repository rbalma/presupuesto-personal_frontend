//Archivo que contiene funciones auxiliares para el proyecto
export const checkPresupuesto = (presupuesto) => {
    let clase;

    if( presupuesto > 1000){
        clase = 'alert alert-success';
    } else if(presupuesto > -1) {
        clase= 'alert alert-warning';
    } else {
        clase= 'alert alert-danger';
    }

    return clase;
}