import prisma from "../config/prisma.js";

export const createIntern = async (req, res, next) => {
  try {
    const name = req.body?.name?.toString().trim();
    const email = req.body?.email?.toString().trim();

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const profileImage = req.file?.path || null;

    const existing = await prisma.intern.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Intern already exists" });

    const intern = await prisma.intern.create({
      data: { name, email, profileImage },
    });

    res.status(201).json({ message: "Intern created", intern });
  } catch (error) {
    next(error);
  }
};

export const getInterns = async (req, res, next) => {
  try {
    const interns = await prisma.intern.findMany({
      include: { tasks: true },
    });
    res.status(200).json({ interns });
  } catch (error) {
    next(error);
  }
};

export const getInternById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const intern = await prisma.intern.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!intern) return res.status(404).json({ message: "Intern not found" });

    res.status(200).json({ intern });
  } catch (error) {
    next(error);
  }
};

export const updateIntern = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    const intern = await prisma.intern.findUnique({ where: { id } });
    if (!intern) return res.status(404).json({ message: "Intern not found" });

    const updated = await prisma.intern.update({
      where: { id },
      data: {
        name: name || intern.name,
        email: email || intern.email,
        profileImage: profileImage || intern.profileImage,
      },
    });

    res.status(200).json({ message: "Intern updated", intern: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteIntern = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const intern = await prisma.intern.findUnique({ where: { id } });
    if (!intern) return res.status(404).json({ message: "Intern not found" });

    await prisma.intern.delete({ where: { id } });

    res.status(200).json({ message: "Intern deleted successfully" });
  } catch (error) {
    next(error);
  }
};
