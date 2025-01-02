export class RegisterFormData {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public repeatPassword?: string
  ) {}
}

export class SignInFormData {
  constructor(public email: string, public password: string) {}
}
