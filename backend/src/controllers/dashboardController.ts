import type { Request, Response } from "express";

import {
getDashboardStats,
} from "../services/dashboardService.js";

export const getDashboard = async (
req: Request,
res: Response
): Promise<void> => {
try {
/*
* Make sure user is authenticated.
*/


if (!req.user) {
  res.status(401).json({
    success: false,
    message: "Authentication required",
  });

  return;
}

/*
 * Get dashboard data for the
 * currently authenticated user.
 *
 * Role is passed so the dashboard service
 * can apply ADMIN / USER access rules.
 */

const dashboard = await getDashboardStats(
  req.user.id,
  req.user.role
);

res.status(200).json({
  success: true,
  message: "Dashboard data fetched successfully",
  ...dashboard,
});


} catch (error) {
console.error(
"Get Dashboard Error:",
error
);


res.status(500).json({
  success: false,
  message: "Internal server error",
});


}
};
