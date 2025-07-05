const { validarCedulaEcuadoriana } = require('../utils/cedulaValidator');
const { createClient } = require('redis');
const redisClient = createClient();
redisClient.connect();

let listaOficial = [];
let familiares = [];

function setListaOficial(nuevaLista) {
  listaOficial = nuevaLista;
  familiares = nuevaLista; // para poder buscar luego
}

function validarFamiliar({ id_cedula, nombre, parentesco }) {
  if (!validarCedulaEcuadoriana(id_cedula)) {
    return { valido: false, error: 'Cédula inválida' };
  }

  const existe = listaOficial.find(f =>
    f.id_cedula === id_cedula &&
    f.nombre.toLowerCase() === nombre.toLowerCase() &&
    f.parentesco.toLowerCase() === parentesco.toLowerCase()
  );

  if (!existe) {
    return { valido: false, error: 'Familiar no autorizado' };
  }

  return { valido: true };
}

async function guardarFamiliarEnRedis(data) {
  const { id_cedula, nombre, parentesco, telefono, email, reclusos_asociados } = data;

  const familiar = {
    nombre,
    parentesco,
    telefono: telefono || '',
    email: email || '',
    reclusos_asociados: JSON.stringify(reclusos_asociados || []),
    fecha_registro: new Date().toISOString(),
    estado: 'activo'
  };

  await redisClient.hSet(`familiar:${id_cedula}`, familiar);
  return { mensaje: 'Familiar guardado en Redis correctamente.' };
}

function buscarFamiliar(id_cedula) {
  return familiares.find(fam => fam.id_cedula === id_cedula);
}

module.exports = {
  setListaOficial,
  validarFamiliar,
  guardarFamiliarEnRedis,
  buscarFamiliar
};


