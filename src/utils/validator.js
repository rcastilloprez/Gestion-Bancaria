// src/utils/validator.js — validaciones reutilizables
// Cada función retorna { valid: boolean, message: string }

export const required = (value) => ({
  valid: value !== null && value !== undefined && String(value).trim() !== '',
  message: 'Campo obligatorio.',
});

export const positiveAmount = (value) => ({
  valid: !isNaN(value) && Number(value) > 0,
  message: 'El monto debe ser mayor a cero.',
});

export const isEmail = (email) => ({
  valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  message: 'Email inválido.',
});

export const minLength = (value, min) => ({
  valid: String(value).trim().length >= min,
  message: `Mínimo ${min} caracteres.`,
});

/**
 * Ejecuta varias reglas y retorna el primer mensaje de error, o null si todo ok.
 */
export const validate = (value, rules) => {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.valid) return result.message;
  }
  return null;
};
