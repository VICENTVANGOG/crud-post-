import { BodyRequestLogin, BodyResponseLogin, BodyRequestRegister, BodyResponseRegister } from "../models/auth.model";

export class AuthController {
  public domain: string;

  constructor(domain: string) {
    this.domain = domain;
  };

  async register(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseRegister> {
    const userData: BodyRequestRegister = {
      email: email.value,
      password: password.value
    };
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const reqOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    }
    const response = await fetch(`${this.domain}/users/register`, reqOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseBodyLogin: BodyResponseRegister = await response.json();
    return responseBodyLogin;
  };

  async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin> {
    const userData: BodyRequestLogin = {
      email: email.value,
      password: password.value
    };
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const reqOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    }
    const response = await fetch(`${this.domain}/auth/login`, reqOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseBodyLogin: BodyResponseLogin = await response.json();
    return responseBodyLogin;
  };

};




