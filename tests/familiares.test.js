const request = require('supertest');
const app = require('../server'); // Usa tu server real

const { setListaOficial } = require('../services/familiarService');

describe('Validación de cédula de familiar', () => {
  beforeAll(() => {
    setListaOficial([
      {
        id_cedula: '1725279812',
        nombre: 'Juan Perez',
        parentesco: 'padre'
      }
    ]);
  });

  test('Debe retornar 200 si la cédula existe en la lista oficial', async () => {
    const res = await request(app).get('/api/familiares/validar/1725279812');
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Juan Perez');
  });

  test('Debe retornar 404 si la cédula no está en la lista', async () => {
    const res = await request(app).get('/api/familiares/validar/9999999999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ mensaje: 'Familiar no encontrado o no asociado a ningún recluso.' });
  });
});
