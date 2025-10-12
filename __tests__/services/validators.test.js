import {
  validateBrazilianLicensePlate,
  validateEmail,
  validateYear,
  isUuid,
} from '../../services/api/validators';

describe('Validators', () => {
  describe('validateBrazilianLicensePlate', () => {
    it('should validate old format plates', () => {
      const result = validateBrazilianLicensePlate('ABC1234');
      expect(result.isValid).toBe(true);
      expect(result.formattedPlate).toBe('ABC1234');
    });

    it('should validate Mercosul format plates', () => {
      const result = validateBrazilianLicensePlate('ABC1D23');
      expect(result.isValid).toBe(true);
      expect(result.formattedPlate).toBe('ABC1D23');
    });

    it('should handle lowercase input', () => {
      const result = validateBrazilianLicensePlate('abc1234');
      expect(result.isValid).toBe(true);
      expect(result.formattedPlate).toBe('ABC1234');
    });

    it('should handle spaces in input', () => {
      const result = validateBrazilianLicensePlate('ABC 1234');
      expect(result.isValid).toBe(true);
      expect(result.formattedPlate).toBe('ABC1234');
    });

    it('should reject invalid formats', () => {
      const result = validateBrazilianLicensePlate('ABC12345');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Formato de placa inválido');
    });

    it('should reject empty input', () => {
      const result = validateBrazilianLicensePlate('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Placa é obrigatória');
    });

    it('should reject null input', () => {
      const result = validateBrazilianLicensePlate(null);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Placa é obrigatória');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid email format', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Formato de e-mail inválido');
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('E-mail é obrigatório');
    });

    it('should reject null email', () => {
      const result = validateEmail(null);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('E-mail é obrigatório');
    });
  });

  describe('validateYear', () => {
    const currentYear = new Date().getFullYear();

    it('should validate current year', () => {
      const result = validateYear(currentYear.toString());
      expect(result.isValid).toBe(true);
    });

    it('should validate next year', () => {
      const result = validateYear((currentYear + 1).toString());
      expect(result.isValid).toBe(true);
    });

    it('should validate year 1900', () => {
      const result = validateYear('1900');
      expect(result.isValid).toBe(true);
    });

    it('should reject year before 1900', () => {
      const result = validateYear('1899');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Ano deve estar entre 1900');
    });

    it('should reject year too far in future', () => {
      const result = validateYear((currentYear + 2).toString());
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Ano deve estar entre 1900');
    });

    it('should accept empty year (optional)', () => {
      const result = validateYear('');
      expect(result.isValid).toBe(true);
    });

    it('should reject non-numeric year', () => {
      const result = validateYear('abc');
      expect(result.isValid).toBe(false);
    });
  });

  describe('isUuid', () => {
    it('should validate correct UUID v4', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      expect(isUuid(uuid)).toBe(true);
    });

    it('should reject invalid UUID format', () => {
      expect(isUuid('invalid-uuid')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isUuid('')).toBe(false);
    });

    it('should reject null', () => {
      expect(isUuid(null)).toBe(false);
    });
  });
});
