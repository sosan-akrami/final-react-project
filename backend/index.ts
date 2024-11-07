import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import { University } from "./database/entity/University";
import { Department } from "./database/entity/Department";
import { Specialization } from "./database/entity/Specialization";
import { Student } from "./database/entity/Student";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
AppDataSource.initialize();
const PORT: number = 3000;


app.post('/api/universities', async (req: Request, res: Response) => {
    const { name } = req.body;

    const university = new University();
    university.name = name;

    await AppDataSource.getRepository(University).save(university)

    res.status(201).json({ message: 'University created successfully' });
});

app.get('/api/universities', async (req: Request, res: Response) => {

    const universities = await AppDataSource.manager.find(University, {
        order: { id: 'DESC' }
    });

    res.json(universities);
});


app.put('/api/universities/:id', async (req: Request, res: Response) => {
    const universityId = parseInt(req.params.id);
    const { name } = req.body;

    try {
        const universityRepository = AppDataSource.getRepository(University)
        const university = await universityRepository.findOneBy({ id: universityId });

        if (!university) {
            res.status(404).json({ message: 'University not found' });
        }

        university!.name = name;

        await universityRepository.save(university!);

        res.status(200).json({ message: 'University updated successfully', university });
    } catch (error) {
        console.error('Error updating university:', error);
        res.status(500).json({ message: 'Error updating university' });
    }
});

app.delete('/api/universities/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const universityRepository = AppDataSource.getRepository(University)
        const university = await universityRepository.findOneBy({
            id: parseInt(id)
        });

        if (!university) {
            res.status(404).json({ message: 'University not found' });
        }

        await universityRepository.remove([university as University]);

        res.status(200).json({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete university' });
    }
});



app.get('/api/universities/:universityId/departments', async (req, res) => {
    const uniID: number = Number(req.params.universityId);

    const departments = await AppDataSource.manager.find(Department, {
        where: {
            university: { id: uniID }
        }
    });

    res.json(departments);
});


app.get('/api/departments/:departmentId/specializations', async (req, res) => {
    const departmentId: number = Number(req.params.departmentId);

    const specializations = await AppDataSource.manager.find(Specialization, {
        where: {
            department: { id: departmentId }
        }
    });

    res.json(specializations);
});


app.get('/api/specializations/:specializationtId/students', async (req, res) => {
    const specializationtId: number = Number(req.params.specializationtId);

    const students = await AppDataSource.manager.find(Student, {
        where: {
            specialization: { id: specializationtId }
        }
    });

    res.json(students);
});

app.get("/", (req: Request, res: Response): any => {
    return res.json({
        'message': "Server is running!",
    });
})

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})