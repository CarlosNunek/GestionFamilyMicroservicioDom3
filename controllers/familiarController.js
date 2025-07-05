const {
  setListaOficial,
  validarFamiliar,
  guardarFamiliarEnRedis,
  buscarFamiliar
} = require('../services/familiarService');

function cargarFamiliares(req, res) {
  const { familiares } = req.body;
  if (!Array.isArray(familiares)) {
    return res.status(400).json({ error: 'Debe enviar un array de familiares.' });
  }

  setListaOficial(familiares);
  res.json({ mensaje: 'Lista oficial cargada.', total: familiares.length });
}

function registrarFamiliar(req, res) {
  const resultado = validarFamiliar(req.body);
  if (!resultado.valido) {
    return res.status(403).json({ error: resultado.error });
  }

  res.json({ mensaje: 'Familiar validado correctamente.' });
}

async function guardarFamiliar(req, res) {
  const data = req.body;

  if (!data.id_cedula || !data.nombre || !data.parentesco) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  try {
    const resultado = await guardarFamiliarEnRedis(data);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar en Redis', detalle: err.message });
  }
}

function validarFamiliarPorCedula(req, res) {
  const { id_cedula } = req.params;
  const familiar = buscarFamiliar(id_cedula);
  if (familiar) {
    res.status(200).json(familiar);
  } else {
    res.status(404).json({ mensaje: 'Familiar no encontrado o no asociado a ningún recluso.' });
  }
}

module.exports = {
  cargarFamiliares,
  registrarFamiliar,
  guardarFamiliar,
  validarFamiliarPorCedula
};

