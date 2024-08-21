import { Login } from "@/admin/aplication/login";

type Request = {
  body: {
    email: string;
    password: string;
  };
};
type Response = {
  token?: string;
  message: string;
  status: string;
};

export class LoginController {
  constructor(private readonly login: Login) {}

  async handle({
    body,
    set,
  }: {
    body: Request["body"];
    set: any;
  }): Promise<Response> {
    const { email, password } = body;
    try {
      const res = await this.login.execute(email, password);
      if (res.error) {
        set.status = 401;
        return {
          status: "error",
          message: res.error,
        };
      } else {
        set.status = 200;
        return {
          status: "success",
          token: res.token,
          message: "Login successful",
        };
      }
    } catch (e) {
      const error = e as Error;
      set.status = 500;
      return {
        status: "error",
        message: error.message,
      };
    }
  }
}
