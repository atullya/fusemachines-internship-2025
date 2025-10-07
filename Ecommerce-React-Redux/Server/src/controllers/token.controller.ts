import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { RefereshToken } from "../models/refereshToken";
import { accessAndRefreshToken } from "../utils/generateAccessAndRefereshToken";
import { logger } from "../config/logger";

/**
 * Issue new access / refresh tokens using a valid refresh token.
 */
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Missing refresh token" });
    }

    // verify refresh token's signature + expiry
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN!
    ) as { userId: string };

    // make sure refresh token still exists in DB
    const stored = await RefereshToken.findOne({ token: oldRefreshToken });
    if (!stored) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token invalid or revoked" });
    }

    // (optional) delete old token for rotation
    await RefereshToken.deleteOne({ token: oldRefreshToken });

    // create new tokens + set cookies again
    const { accessToken, refreshToken } = await accessAndRefreshToken(
      decoded.userId,
      res
    );

    logger.info("Issued new access token via refresh endpoint");

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    logger.error("Error refreshing token: " + err.message);
    return res
      .status(403)
      .json({ success: false, message: "Refresh token expired or invalid" });
  }
};
