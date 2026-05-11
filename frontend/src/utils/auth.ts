// Utilitaires d'authentification

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    // Décoder le JWT pour vérifier l'expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Vérifier si le token n'est pas expiré
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Erreur lors de la validation du token:', error);
    return false;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getValidToken = (): string | null => {
  const token = localStorage.getItem('token');
  
  if (isTokenValid(token)) {
    return token;
  } else {
    clearAuthData();
    return null;
  }
};