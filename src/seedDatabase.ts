import { Database } from './database';
import { Student, Professor, Class, Department } from './types';

export function seedDatabase(db: Database) {
  const dbClasses: Class[] = [];
  classes.forEach(classItem => {
    dbClasses.push(db.createClass(classItem));
  });

  const dbDepartments: Department[] = [];
  departments.forEach(department => {
    dbDepartments.push(db.createDepartment(department));
  });
  dbDepartments[0].classes = [dbClasses[0].id];
  dbDepartments[1].classes = [dbClasses[1].id, dbClasses[2].id];
  dbDepartments[2].classes = [dbClasses[3].id];

  const dbProfessors: Professor[] = [];
  professors.forEach(professor => {
    dbProfessors.push(db.createProfessor(professor));
  });
  dbProfessors[0].classes = [dbClasses[0].id, dbClasses[1].id];
  dbProfessors[1].classes = [dbClasses[2].id];
  dbProfessors[2].classes = [dbClasses[3].id];

  const dbStudents: Student[] = [];
  students.forEach(student => {
    dbStudents.push(db.createStudent(student));
  });
  dbStudents[0].enrolledClasses = [dbClasses[0].id, dbClasses[2].id];
  dbStudents[1].enrolledClasses = [dbClasses[1].id];
  dbStudents[2].enrolledClasses = [dbClasses[0].id, dbClasses[1].id, dbClasses[3].id];
  dbStudents[3].enrolledClasses = [dbClasses[2].id, dbClasses[3].id];

  dbClasses[0].students = [dbStudents[0].id, dbStudents[2].id];
  dbClasses[1].students = [dbStudents[1].id, dbStudents[2].id];
  dbClasses[2].students = [dbStudents[0].id, dbStudents[3].id];
  dbClasses[3].students = [dbStudents[2].id, dbStudents[3].id];
}

const classes: Omit<Class, 'id'>[] = [
  {
    name: 'Intro to Programming',
    description: 'Intro to Programming',
    term: 'Fall 2024',
    students: [],
    professor: 'Smarty Boy',
    department: 'Computer Science'
  },
  {
    name: 'Calculus I',
    description: 'Calculus I',
    term: 'Fall 2024',
    students: [],
    professor: 'Smarty Boy',
    department: 'Mathematics'
  },
  {
    name: 'Calculus II',
    description: 'Calculus I',
    term: 'Fall 2024',
    students: [],
    professor: 'Lucas Doe',
    department: 'Mathematics'
  },
  {
    name: 'Intro to Physics',
    description: 'Intro to Physics',
    term: 'Fall 2024',
    students: [],
    professor: 'Epaphroditus Smith',
    department: 'Physics'
  }
];

const departments: Omit<Department, 'id'>[] = [
  {
    name: 'Computer Science',
    description: 'Computer Science Department',
    headOfDepartment: 'HAL',
    classes: [],
  },
  {
    name: 'Mathematics',
    description: 'Mathematics Department',
    headOfDepartment: 'Euclid',
    classes: [],
  },
  {
    name: 'Physics',
    description: 'Physics Department',
    headOfDepartment: 'Albert Einstein',
    classes: [],
  }
];

const professors: Omit<Professor, 'id'>[] = [
  {
    name: 'Smarty Boy',
    hireDate: '2024-09-01',
    address: '111 Main St',
    phone: '1234567890',
    classes: [],
  },
  {
    name: 'Lucas Doe',
    hireDate: '1980-01-01',
    address: '123 Main St',
    phone: '1234567890',
    classes: []
  },
  {
    name: 'Epaphroditus Smith',
    hireDate: '1989-01-01',
    address: '777 Main St',
    phone: '1234567890',
    classes: []
  }
];

const students: Omit<Student, 'id'>[] = [
  {
    name: 'Maria Elena Rodriguez',
    birthDate: '1973-05-27',
    address: '4738 Oak Street, Portland, OR',
    phone: '(555) 234-8901',
    enrolledClasses: []
  },
  {
    name: 'James William Chen',
    birthDate: '2001-10-23',
    address: '892 Maple Avenue, Boston, MA',
    phone: '40512345678',
    enrolledClasses: []
  },
  {
    name: 'Aisha Nicole Thompson',
    birthDate: '1992-01-01',
    address: '1567 Pine Road, Atlanta, GA',
    phone: '(203) 567-1234',
    enrolledClasses: []
  },
  {
    name: 'Marcus Alexander Bennett',
    birthDate: '1988-09-01',
    address: '3201 Cedar Lane, Denver CO',
    phone: '20512345678',
    enrolledClasses: []
  }
];