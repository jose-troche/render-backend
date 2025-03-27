import { Student, Class, Professor, Department } from './types';
import { ValidationError } from './errors';

export class Validators {
    static validateStudent(data: Partial<Student>) {
        if (!data.name) {
            throw new ValidationError('Student name is required');
        }
        if (data.birthDate && !this.isValidDate(data.birthDate)) {
            throw new ValidationError('Invalid birth date format. Use YYYY-MM-DD');
        }
        if (data.phone && !this.isValidPhone(data.phone)) {
            throw new ValidationError('Invalid phone number format');
        }
    }

    static validateClass(data: Partial<Class>) {
        if (!data.name) {
            throw new ValidationError('Class name is required');
        }
        if (!data.term) {
            throw new ValidationError('Class term is required');
        }
    }

    static validateProfessor(data: Partial<Professor>) {
        if (!data.name) {
            throw new ValidationError('Professor name is required');
        }
        if (data.hireDate && !this.isValidDate(data.hireDate)) {
            throw new ValidationError('Invalid hire date format. Use YYYY-MM-DD');
        }
        if (data.phone && !this.isValidPhone(data.phone)) {
            throw new ValidationError('Invalid phone number format');
        }
    }

    static validateDepartment(data: Partial<Department>) {
        if (!data.name) {
            throw new ValidationError('Department name is required');
        }
    }

    private static isValidDate(date: string): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
    }

    private static isValidPhone(phone: string): boolean {
        const regex = /^\+?[\d\s-]{10,}$/;
        return regex.test(phone);
    }
}