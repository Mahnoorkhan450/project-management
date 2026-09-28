import type { Request, Response } from "express";

import {
getDepartments,
getDepartmentById,
createDepartment,
updateDepartment,
deleteDepartment,
} from "../services/departmentService.js";

export const getAllDepartments = async (
_req: Request,
res: Response
): Promise<void> => {
const departments = await getDepartments();

res.status(200).json({
success: true,
data: departments,
});
};

export const getDepartment = async (
req: Request,
res: Response
): Promise<void> => {
const id = Number(req.params.id);

const department = await getDepartmentById(id);

res.status(200).json({
success: true,
data: department,
});
};

export const create = async (
req: Request,
res: Response
): Promise<void> => {
const { name, description } = req.body;

const department = await createDepartment(
name,
description
);

res.status(201).json({
success: true,
message: "Department created successfully",
data: department,
});
};

export const update = async (
req: Request,
res: Response
): Promise<void> => {
const id = Number(req.params.id);

const { name, description } = req.body;

const department = await updateDepartment(
id,
name,
description
);

res.status(200).json({
success: true,
message: "Department updated successfully",
data: department,
});
};

export const remove = async (
req: Request,
res: Response
): Promise<void> => {
const id = Number(req.params.id);

await deleteDepartment(id);

res.status(200).json({
success: true,
message: "Department deleted successfully",
});
};
