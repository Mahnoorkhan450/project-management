import prisma from "../lib/prisma.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import { generateToken } from "../utils/generateToken.js";

import type {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
} from "../validations/authValidation.js";

const sanitizeUser = (user: {
  id: number;
  name: string;
  email: string;
  role: any;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = async (
  data: RegisterInput
) => {
  const {
    name,
    email,
    password,
  } = data;

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    const error = new Error(
      "Email is already registered"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 409;

    throw error;
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
};

export const loginUser = async (
  data: LoginInput
) => {
  const {
    email,
    password,
  } = data;

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    const error = new Error(
      "Invalid email or password"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 401;

    throw error;
  }

  const passwordMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!passwordMatch) {
    const error = new Error(
      "Invalid email or password"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 401;

    throw error;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
};

export const getCurrentUser = async (
  userId: number
) => {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    const error = new Error(
      "User not found"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  return sanitizeUser(user);
};

export const changeUserPassword = async (
  userId: number,
  data: ChangePasswordInput
) => {
  const {
    currentPassword,
    newPassword,
  } = data;

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    const error = new Error(
      "User not found"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  const passwordMatch =
    await comparePassword(
      currentPassword,
      user.password
    );

  if (!passwordMatch) {
    const error = new Error(
      "Current password is incorrect"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 400;

    throw error;
  }

  if (
    currentPassword ===
    newPassword
  ) {
    const error = new Error(
      "New password must be different from current password"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 400;

    throw error;
  }

  const hashedPassword =
    await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};