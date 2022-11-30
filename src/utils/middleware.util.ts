import { Request, Response, NextFunction } from "express";

import { database } from "../utils/constants.util";
import { TablesModels } from "./../types/tables";
import UseMiddleware from "../types/middleware";

import AppLog from "../events/AppLog";
import AppError from "../config/error";

import validateSchema from "./../middlewares/schema.middleware";
import processHeader from "./../middlewares/header.middleware";
import requireToken from "./../middlewares/token.middleware";

export default function useMiddleware(
  middlewares: UseMiddleware,
  endpoint: string,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog.server(`Routing ...${endpoint}`);

    if (middlewares.schema) {
      validateSchema(middlewares.schema, req.body);
      res.locals.body = req.body;
    }

    if (middlewares.header) {
      processHeader(req.header(middlewares.header));
      res.locals.header = req.header(middlewares.header);
    }

    if (middlewares.token) {
      const token = req.header("Authorization");
      if (!token) {
        throw new AppError(
          "Missing token",
          401,
          "Missing token",
          "Ensure to provide the required token",
        );
      }

      processHeader(token);
      res.locals.subject = await requireToken(token ?? "");
    }

    return next();
  };
}

export function validateParameters(id: number) {
  if (!id || isNaN(id) || id > database.INT4_MAX) {
    throw new AppError(
      "Invalid parameters",
      400,
      "Invalid parameters",
      "Ensure to provide the required parameters",
    );
  }

  AppLog.middleware("Valid ID.");
}

export function entityExists(entity: TablesModels | null, table_name: string) {
  if (!entity) {
    throw new AppError(
      `${table_name} not found`,
      404,
      `${table_name} not found`,
      "Ensure to provide a valid ID",
    );
  }

  AppLog.middleware(`${table_name} found.`);
}

export function belongsToUser(
  entity: any,
  owner_id: number,
  table_name: string,
) {
  if (entity.user_id !== owner_id) {
    throw new AppError(
      `${table_name} owner id mismatch`,
      409,
      `${table_name} owner id mismatch`,
      `The provided ${table_name} does not belong to the user`,
    );
  }

  AppLog.middleware(`${table_name} belongs to user.`);
}
