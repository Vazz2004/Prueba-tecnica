import net from 'node:net'
import { resolve } from 'node:path'
import fs from 'node:fs'
import path from "path";
import { fileURLToPath } from "url";

//Pasamos como parametro el callback para invocarlo despues de que el cliente termina su conexion y asi devovemos los datos esperados ya que el return en estos casos no me devuelve la info 

export const ping = (ip, callback) => {
    const startTime = process.hrtime()

    const client = net.connect({ port: 80, host: ip }, () => {
        client.end()
        //return { time: process.hrtime(startTime), ip }
        callback(null, { time: process.hrtime(startTime), ip })
    })

    //Se ve que le codigo es inaccesible el throw error no funciona se debe inbocar el callback para tambien procesar en caso de error 
    client.on('error', (err) => {
        // throw err
        client.end()
        callback(err)
    })
}

//ping('midu.dev', (err, info) => {
//if (err) console.error(err)
//console.log(info)
//})



//2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'datos importantes' });
        }, 2000);
    })
}


//obtenerDatosPromise()
//.then(info  =>{
//  console.log(info)
//})



//Saludo con retardo
//Crea una función saludar(nombre, callback) que reciba un nombre y un callback. El callback debe mostrar un saludo en consola después de 2 segundos.


const names = ['Samuel', 'Alejandro', 'Sebastian']


function saludar(nombre, callback) {
    setTimeout(() => {
        callback(`Hola, ${nombre}!`);
    }, 2000);
}



//for (let i of names) {
//  saludar(i, (mensaje) => {
//    console.log(mensaje);
// });

//}


//Operaciones matemáticas
//Crea una función operar(num1, num2, callback) que realice operaciones matemáticas (suma, resta, multiplicación) según el callback que se le pase.


function operaciones(num1, num2, callback) {
    if (isNaN(num1) || isNaN(num2)) {
        console.log('Los numero no son validos')
    } else {
        return callback(num1, num2)
    }

}

//console.log(operaciones(5,3,(a,b) => a + b))
//console.log(operaciones(6,7, (a,b) => a - b))
//console.log(operaciones(3,4, (a,b) => a * b))
//console.log(operaciones(5,5, (a,b) => a / b ))


//Simular una base de datos
//Crea una función buscarUsuario(id, callback) que busque en un array de objetos un usuario por su ID y ejecute el callback con el resultado.


const usuarios = [
    { id: 1, nombre: "Ana" },
    { id: 2, nombre: "Luis" },
    { id: 3, nombre: "Samuel" }
];

function buscarUsuario(id, callback) {

    setTimeout(() => {
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            callback(null, usuario);
        } else {
            callback("Usuario no encontrado", null);
        }
    }, 1000);
}
/*
buscarUsuario(2, (err, user) => {
    if (err) console.log(err);
    else console.log("Usuario encontrado:", user);


    buscarUsuario(5, (err, user) => {
        if (err) console.log(err);
        else console.log("Usuario encontrado:", user);



        buscarUsuario(5, (err, user) => {
            if (err) console.log(err);
            else console.log("Usuario encontrado:", user);
        });
    });
});
*/

//3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. 
// Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function procesarArchivo(callback) {
    const rutaEntrada = path.join(__dirname, "input.txt");
    const rutaSalida = path.join(__dirname, "output.txt");

    // Función para escribir archivo
    const handleWritefile = (error) => {
        if (error) {
            console.error("Error guardando archivo:", error.message);
            callback(error);
            return;
        }

        console.log("Archivo procesado y guardado con éxito");
        callback(null);
    };

    // Función para leer archivo
    const handleReadfile = (error, contenido) => {
        if (error) {
            console.error("Error leyendo archivo:", error.message);
            callback(error);
            return;
        }

        const textoProcesado = contenido.toUpperCase();
        fs.writeFile(rutaSalida, textoProcesado, handleWritefile);
    };

    fs.readFile(rutaEntrada, "utf8", handleReadfile);
}

// Ejecución
procesarArchivo((err) => {
    if (!err) console.log("ya funciona");
});





export async function procesarArchivoPromise() {
    const rutaEntrada = path.join(__dirname, "input.txt");
    const rutaSalida = path.join(__dirname, "output.txt");


    await fs.promises.readFile(rutaEntrada,'utf-8')
    const textoProcesado = contenido.toUpperCase()
    await fs.promises.writeFile(rutaSalida, textoProcesado)

    // Función para escribir archivo
    // const handleWritefile = (error) => {
    //     if (error) {
    //         console.error("Error guardando archivo:", error.message);
    //         callback(error);
    //         return;
    //     }

    //     console.log("Archivo procesado y guardado con éxito");
    //     callback(null);
    // };

    // // Función para leer archivo
    // const handleReadfile = (error, contenido) => {
    //     if (error) {
    //         console.error("Error leyendo archivo:", error.message);
    //         callback(error);
    //         return;
    //     }

    //     const textoProcesado = contenido.toUpperCase();
    //     fs.writeFile(rutaSalida, textoProcesado, handleWritefile);
    // };

    // fs.readFile(rutaEntrada, "utf8", handleReadfile);
}

// Ejecución
procesarArchivo((err) => {
    if (!err) console.log("ya funciona");
});