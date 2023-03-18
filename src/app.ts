import cors from 'cors';
import express from 'express';
import z from 'zod';
import { prisma } from './lib/prisma';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/employee', async (req, res) => {
  const employees = await prisma.employee.findMany();

  return res.status(200).json(employees);
});

app.get('/employee/:id', async (req, res) => {
  const { id } = req.params;

  const employee = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  });

  if (employee) {
    return res.status(200).json(employee);
  } else {
    return res.status(404).json({ message: 'Employee not found' });
  }
});

app.post('/employee', async (req, res) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    salary: z.number(),
    profilePicture: z.string(),
    jobTitle: z.string(),
    cpf: z.string(),
    hiringDate: z.string(),
  });

  try {
    const data = bodySchema.parse(req.body);

    const employeeExists = await prisma.employee.findUnique({
      where: {
        email: data.email,
      },
    });

    if (employeeExists) {
      return res
        .status(400)
        .json({ message: 'Employee with this email already exists' });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        hiringDate: new Date(data.hiringDate),
      },
    });

    return res.status(201).json(employee);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
  }
});

app.put('/employee/:id', async (req, res) => {
  const { id } = req.params;

  const bodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    salary: z.number().optional(),
    profilePicture: z.string().optional(),
    jobTitle: z.string().optional(),
    cpf: z.string().optional(),
    hiringDate: z.string().optional(),
  });

  try {
    const data = bodySchema.parse(req.body);

    const employeeExists = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!employeeExists) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        hiringDate: data.hiringDate && new Date(data.hiringDate),
      },
    });

    return res.status(200).json(employee);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

app.delete('/employee/:id', async (req, res) => {
  const { id } = req.params;

  const employeeExists = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  });

  if (!employeeExists) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  const employee = await prisma.employee.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json(employee);
});

app.listen(process.env.PORT || 3333, () =>
  console.log('Server is running on port 3333')
);
