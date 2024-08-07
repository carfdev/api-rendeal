import { t } from "elysia";

export const createClientDTO = {
  body: t.Object({
    email: t.String({ required: true, format: "email" }),
    password: t.String({ required: true, minLength: 6 }),
    name: t.String({ required: true }),
    surname: t.String({ required: true }),
    dni: t.String({ required: true }),
    address: t.String({ required: true }),
    city: t.String({ required: true }),
    postalCode: t.String({ required: true }),
  }),
};

export const loginClientDTO = {
  body: t.Object({
    email: t.String({ required: true, format: "email" }),
    password: t.String({ required: true, minLength: 6 }),
  }),
};
