import { t } from "elysia";

export const loginAdminDTO = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
};
