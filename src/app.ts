import express from 'express';
import cors from 'cors';
import { Database } from './database';
import { Validators } from './validators';
import { ValidationError, NotFoundError } from './errors';
import { seedDatabase } from './seedDatabase';

const app = express();
const db = new Database();
seedDatabase(db);

app.use(express.json());

app.use(cors());

// Swagger documentation
app.use(express.static('public'));
app.get(['/', '/doc', '/docs'], (_, res) => res.redirect('/docs.html'));
app.use(express.static('node_modules/swagger-ui-dist'));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ValidationError || err instanceof SyntaxError) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
});

// Students endpoints
app.get('/students', (req, res) => {
    res.json(db.getAllStudents());
});

app.post('/students', (req, res) => {
    try {
        Validators.validateStudent(req.body);
        const student = db.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.get('/students/:studentId', (req, res) => {
    const student = db.getStudent(req.params.studentId);
    if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
    }
    res.json(student);
});

app.put('/students/:studentId', (req, res) => {
    try {
        const student = db.getStudent(req.params.studentId);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        Validators.validateStudent(req.body);
        const updatedStudent = db.updateStudent(req.params.studentId, req.body);
        res.json(updatedStudent);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.delete('/students/:studentId', (req, res) => {
    if (db.deleteStudent(req.params.studentId)) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Classes endpoints
app.get('/classes', (req, res) => {
    res.json(db.getAllClasses());
});

app.post('/classes', (req, res) => {
    try {
        Validators.validateClass(req.body);
        const classData = db.createClass(req.body);
        res.status(201).json(classData);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.get('/classes/:classId', (req, res) => {
    const classData = db.getClass(req.params.classId);
    if (!classData) {
        res.status(404).json({ message: 'Class not found' });
        return;
    }
    res.json(classData);
});

app.put('/classes/:classId', (req, res) => {
    try {
        const classData = db.getClass(req.params.classId);
        if (!classData) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        Validators.validateClass(req.body);
        const updatedClass = db.updateClass(req.params.classId, req.body);
        res.json(updatedClass);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.delete('/classes/:classId', (req, res) => {
    if (db.deleteClass(req.params.classId)) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Class not found' });
    }
});

app.get('/classes/:classId/students', (req, res) => {
    const students = db.getClassStudents(req.params.classId);
    res.json(students);
});

// Professors endpoints
app.get('/professors', (req, res) => {
    res.json(db.getAllProfessors());
});

app.post('/professors', (req, res) => {
    try {
        Validators.validateProfessor(req.body);
        const professor = db.createProfessor(req.body);
        res.status(201).json(professor);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.get('/professors/:professorId', (req, res) => {
    const professor = db.getProfessor(req.params.professorId);
    if (!professor) {
        res.status(404).json({ message: 'Professor not found' });
        return;
    }
    res.json(professor);
});

app.put('/professors/:professorId', (req, res) => {
    try {
        const professor = db.getProfessor(req.params.professorId);
        if (!professor) {
            res.status(404).json({ message: 'Professor not found' });
            return;
        }
        Validators.validateProfessor(req.body);
        const updatedProfessor = db.updateProfessor(req.params.professorId, req.body);
        res.json(updatedProfessor);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.delete('/professors/:professorId', (req, res) => {
    if (db.deleteProfessor(req.params.professorId)) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Professor not found' });
    }
});

// Departments endpoints
app.get('/departments', (req, res) => {
    res.json(db.getAllDepartments());
});

app.post('/departments', (req, res) => {
    try {
        Validators.validateDepartment(req.body);
        const department = db.createDepartment(req.body);
        res.status(201).json(department);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.get('/departments/:departmentId', (req, res) => {
    const department = db.getDepartment(req.params.departmentId);
    if (!department) {
        res.status(404).json({ message: 'Department not found' });
        return;
    }
    res.json(department);
});

app.put('/departments/:departmentId', (req, res) => {
    try {
        const department = db.getDepartment(req.params.departmentId);
        if (!department) {
            res.status(404).json({ message: 'Department not found' });
            return;
        }
        Validators.validateDepartment(req.body);
        const updatedDepartment = db.updateDepartment(req.params.departmentId, req.body);
        res.json(updatedDepartment);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.delete('/departments/:departmentId', (req, res) => {
    if (db.deleteDepartment(req.params.departmentId)) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Department not found' });
    }
});

app.get('/departments/:departmentId/classes', (req, res) => {
    const classes = db.getDepartmentClasses(req.params.departmentId);
    res.json(classes);
});

app.get('/departments/:departmentId/professors', (req, res) => {
    const professors = db.getDepartmentProfessors(req.params.departmentId);
    res.json(professors);
});

export default app;
