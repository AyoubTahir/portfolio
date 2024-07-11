import { ZodError } from "zod";

export function formatZodError(error: any) {
    if (error instanceof ZodError) {
      return error.issues.reduce((acc: any, error) => {
            const field = error.path[0];
            acc[field] = error.message;
            return acc;
      }, {})
    }
    return error
}

export function excludeFields(obj: any, fields: string | string[]) {
  if (!Array.isArray(fields)) {
      fields = [fields];
  }

  const newObj = { ...obj };
  for (const field of fields) {
      delete newObj[field];
  }

  return newObj;
}