import { Matches } from 'class-validator';

export class ConfirmPasswordDto {
  /**
   * Email da conta a ser recuperada
   * @example 'cadassemblies@email.com'
   */
  email: string;
  /**
   * Código enviado para o email
   * @example '152467'
   */
  recoveryCode: string;
  /**
   * Nova senha do usuário
   * @example 'User123'
   */
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Invalid password',
  })
  newPassword: string;
}
