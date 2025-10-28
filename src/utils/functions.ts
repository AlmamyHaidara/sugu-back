import * as jwt from 'jsonwebtoken';

export function genererMotDePasse(longueur: number = 10): string {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let motDePasse = '';

  for (let i = 0; i < longueur; i++) {
    const indexAleatoire = Math.floor(Math.random() * caracteres.length);
    motDePasse += caracteres.charAt(indexAleatoire);
  }

  return motDePasse;
}

export function genererCode(longueur: number = 6): string {
  const caracteres = '0123456789';
  let code = '';

  for (let i = 0; i < longueur; i++) {
    const indexAleatoire = Math.floor(Math.random() * caracteres.length);
    code += caracteres.charAt(indexAleatoire);
  }

  return code;
}

export function decodejwt(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
  }
  return 0;
}
