import {Controller, Post, Get, Body} from '@nestjs/common';
import { LoginDto } from './loginDTo.dot';
import {AuthService} from './authService.service';

// Pont token en mémoire : clé = timestamp, valeur = token (TTL 120s)
const tokenBridge = new Map<string, { token: string; expires: number }>();

// Nettoyage automatique des entrées expirées
setInterval(() => {
  const now = Date.now();
  tokenBridge.forEach((v, k) => { if (now > v.expires) tokenBridge.delete(k); });
}, 30_000);

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() logindot: LoginDto) {
    return this.authService.login(logindot);
  }

  /**
   * Pont Tauri → Extension Chrome.
   * Appelé juste après un login Tauri pour déposer le token 120s.
   * L'extension récupère ce token via GET extension-bridge.
   */
  @Post('extension-bridge')
  pushTokenBridge(@Body() body: { token: string }) {
    if (!body?.token) return { success: false };
    const key = Date.now().toString();
    tokenBridge.set(key, { token: body.token, expires: Date.now() + 120_000 });
    return { success: true };
  }

  /**
   * L'extension Chrome récupère le token et le supprime immédiatement.
   * Retourne null si rien n'est disponible.
   */
  @Get('extension-bridge')
  pullTokenBridge() {
    const now = Date.now();
    for (const [key, entry] of tokenBridge.entries()) {
      if (now <= entry.expires) {
        tokenBridge.delete(key);
        return { token: entry.token };
      }
    }
    return { token: null };
  }
}
