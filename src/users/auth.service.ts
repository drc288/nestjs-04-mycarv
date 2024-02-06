import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  // 👈 Add
  async signup(email: string, password: string) {
    // Valida si el email esta en uso
    const emailInUse = await this.usersService.find(email);
    if (emailInUse.length) {
      throw new BadRequestException("Email in use");
    }

    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + "." + hash.toString("hex");

    const user = await this.usersService.create(email, result);

    // Retornar el usuario
    return user;
  }
}