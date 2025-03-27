import { Student, Class, Professor, Department } from './types';
import { v4 as uuidv4 } from 'uuid';

export class Database {
    private students: Map<string, Student> = new Map();
    private classes: Map<string, Class> = new Map();
    private professors: Map<string, Professor> = new Map();
    private departments: Map<string, Department> = new Map();

    // Student operations
    createStudent(student: Omit<Student, 'id'>): Student {
        const id = uuidv4();
        const newStudent = { ...student, id, enrolledClasses: [] };
        this.students.set(id, newStudent);
        return newStudent;
    }

    getStudent(id: string): Student | undefined {
        return this.students.get(id);
    }

    getAllStudents(): Student[] {
        return Array.from(this.students.values());
    }

    updateStudent(id: string, student: Partial<Student>): Student {
        const existingStudent = this.students.get(id);
        if (!existingStudent) {
            throw new Error('Student not found');
        }
        const updatedStudent = { ...existingStudent, ...student, id };
        this.students.set(id, updatedStudent);
        return updatedStudent;
    }

    deleteStudent(id: string): boolean {
        return this.students.delete(id);
    }

    // Class operations
    createClass(classData: Omit<Class, 'id'>): Class {
        const id = uuidv4();
        const newClass = { ...classData, id, students: [] };
        this.classes.set(id, newClass);
        return newClass;
    }

    getClass(id: string): Class | undefined {
        return this.classes.get(id);
    }

    getAllClasses(): Class[] {
        return Array.from(this.classes.values());
    }

    updateClass(id: string, classData: Partial<Class>): Class {
        const existingClass = this.classes.get(id);
        if (!existingClass) {
            throw new Error('Class not found');
        }
        const updatedClass = { ...existingClass, ...classData, id };
        this.classes.set(id, updatedClass);
        return updatedClass;
    }

    deleteClass(id: string): boolean {
        return this.classes.delete(id);
    }

    getClassStudents(classId: string): Student[] {
        const classData = this.classes.get(classId);
        if (!classData) return [];
        return classData.students
            .map(studentId => this.students.get(studentId))
            .filter((student): student is Student => student !== undefined);
    }

    // Professor operations
    createProfessor(professor: Omit<Professor, 'id'>): Professor {
        const id = uuidv4();
        const newProfessor = { ...professor, id, classes: [] };
        this.professors.set(id, newProfessor);
        return newProfessor;
    }

    getProfessor(id: string): Professor | undefined {
        return this.professors.get(id);
    }

    getAllProfessors(): Professor[] {
        return Array.from(this.professors.values());
    }

    updateProfessor(id: string, professor: Partial<Professor>): Professor {
        const existingProfessor = this.professors.get(id);
        if (!existingProfessor) {
            throw new Error('Professor not found');
        }
        const updatedProfessor = { ...existingProfessor, ...professor, id };
        this.professors.set(id, updatedProfessor);
        return updatedProfessor;
    }

    deleteProfessor(id: string): boolean {
        return this.professors.delete(id);
    }

    // Department operations
    createDepartment(department: Omit<Department, 'id'>): Department {
        const id = uuidv4();
        const newDepartment = { ...department, id, classes: [] };
        this.departments.set(id, newDepartment);
        return newDepartment;
    }

    getDepartment(id: string): Department | undefined {
        return this.departments.get(id);
    }

    getAllDepartments(): Department[] {
        return Array.from(this.departments.values());
    }

    updateDepartment(id: string, department: Partial<Department>): Department {
        const existingDepartment = this.departments.get(id);
        if (!existingDepartment) {
            throw new Error('Department not found');
        }
        const updatedDepartment = { ...existingDepartment, ...department, id };
        this.departments.set(id, updatedDepartment);
        return updatedDepartment;
    }

    deleteDepartment(id: string): boolean {
        return this.departments.delete(id);
    }

    getDepartmentClasses(departmentId: string): Class[] {
        const department = this.departments.get(departmentId);
        if (!department) return [];
        return department.classes
            .map(classId => this.classes.get(classId))
            .filter((cls): cls is Class => cls !== undefined);
    }

    getDepartmentProfessors(departmentId: string): Professor[] {
        const department = this.departments.get(departmentId);
        if (!department) return [];
        return Array.from(this.professors.values())
            .filter(professor => professor.classes
                .some(classId => this.classes.get(classId)?.department === departmentId));
    }
}