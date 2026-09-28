import type { Request, Response } from "express";

import {
  getAllUsers,
  getUserById,
  getUserDetails,
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  updateUser,
  deleteUser,
} from "../services/userService.js";

// ==========================================
// GET ALL USERS
// ==========================================

export const getAll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    throw error;
  }
};

// ==========================================
// GET SINGLE USER
// ==========================================

export const getOne = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.id);

  if (
    !Number.isInteger(userId) ||
    userId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });

    return;
  }

  const user = await getUserById(userId);

  res.status(200).json({
    success: true,
    user,
  });
};

// ==========================================
// GET USER DETAILS
// ==========================================

export const getDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.id);

  if (
    !Number.isInteger(userId) ||
    userId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });

    return;
  }

  const details = await getUserDetails(userId);

  res.status(200).json({
    success: true,
    details,
  });
};

// ==========================================
// GET MY PROFILE
// ==========================================

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  const user = await getMyProfile(
    req.user.id
  );

  res.status(200).json({
    success: true,
    user,
  });
};

// ==========================================
// UPDATE MY PROFILE
// ==========================================

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  const user = await updateMyProfile(
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

// ==========================================
// CHANGE MY PASSWORD
// ==========================================

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  const result = await changeMyPassword(
    req.user.id,
    {
      currentPassword:
        req.body.currentPassword,

      newPassword:
        req.body.newPassword,
    }
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
};

// ==========================================
// ADMIN UPDATE USER
// ==========================================

export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.id);

  if (
    !Number.isInteger(userId) ||
    userId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });

    return;
  }

  const user = await updateUser(
    userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

// ==========================================
// DELETE USER
// ==========================================

export const remove = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  const userId = Number(req.params.id);

  if (
    !Number.isInteger(userId) ||
    userId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });

    return;
  }

  const result = await deleteUser(
    userId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
};