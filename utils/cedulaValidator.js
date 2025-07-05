function validarCedulaEcuadoriana(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;
  const coef = [2,1,2,1,2,1,2,1,2];
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let val = parseInt(cedula[i]) * coef[i];
    if (val > 9) val -= 9;
    suma += val;
  }
  const verificador = parseInt(cedula[9]);
  const residuo = suma % 10;
  const resultado = residuo === 0 ? 0 : 10 - residuo;
  return resultado === verificador;
}

module.exports = { validarCedulaEcuadoriana };
