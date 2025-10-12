export function isUuid(str) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export function validateBrazilianLicensePlate(plate) {
  if (!plate || typeof plate !== 'string') {
    return { isValid: false, message: 'Placa é obrigatória' };
  }

  // Remove espaços e converte para maiúsculo
  const cleanPlate = plate.replace(/\s/g, '').toUpperCase();

  // Formato antigo: ABC1234
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;

  // Formato Mercosul: ABC1D23
  const mercosulFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  if (oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate)) {
    return { isValid: true, formattedPlate: cleanPlate };
  }

  return {
    isValid: false,
    message: 'Formato de placa inválido. Use ABC1234 ou ABC1D23',
  };
}

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'E-mail é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return { isValid: true };
  }

  return { isValid: false, message: 'Formato de e-mail inválido' };
}

export function validateYear(year) {
  if (!year) {
    return { isValid: true }; // Ano é opcional
  }

  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);

  if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
    return {
      isValid: false,
      message: `Ano deve estar entre 1900 e ${currentYear + 1}`,
    };
  }

  return { isValid: true };
}
