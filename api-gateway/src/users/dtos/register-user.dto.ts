import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class RegisterUserDto {
  /**
   * O email é um dado único e será utilizado posteriormente para o login
   * @example 'cadassemblies@email.com'
   */
  @IsEmail()
  email: string;

  /**
   * A função que o usuário exercerá no sistema
   * @example 'ADMIN'
   */
  @IsEnum(UserRole)
  role: UserRole;

  /**
   * A senha precisa ter letras, números e pelo menos uma letra maiúscula
   * @example 'Cadassemblies123'
   */
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;

  /**
   * Confirmar a senha
   * @example 'Cadassemblies123'
   */
  confirmPassword: string;
}
