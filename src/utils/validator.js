// src/utils/validator.js — validaciones reutilizables
// Cada función retorna { valid: boolean, message: string }

export const required      = (value)      => ({ valid: /* TODO */ false, message: 'Campo obligatorio.' });
export const positiveAmount= (value)      => ({ valid: /* TODO */ false, message: 'Monto inválido.' });
export const isEmail       = (email)      => ({ valid: /* TODO */ false, message: 'Email inválido.' });
export const minLength     = (value, min) => ({ valid: /* TODO */ false, message: `Mínimo ${min} caracteres.` });

/**
 * Ejecuta varias reglas y retorna el primer mensaje de error, o null si todo ok.
 * @param {*} value
 * @param {Function[]} rules
 * @returns {string|null}
 */
export const validate = (value, rules) => {
  // TODO: iterar rules, si alguna retorna valid:false => retornar su message
};
