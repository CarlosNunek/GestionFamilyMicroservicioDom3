const express = require('express');
const cors = require('cors');
const { cargarFamiliares, registrarFamiliar, guardarFamiliar, validarFamiliarPorCedula} = require('./controllers/familiarController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/familiares/cargar', cargarFamiliares);
app.post('/api/familiares/registrar', registrarFamiliar);
app.post('/api/familiares/guardar', guardarFamiliar);
app.get('/api/familiares/validar/:id_cedula', validarFamiliarPorCedula);




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[✓] Microservicio de Gestión de Familiares corriendo en puerto ${PORT}`);
});
module.exports = app;