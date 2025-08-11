"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateToSendShopidentyMail = void 0;
const templateToSendShopidentyMail = (password, shopName, email) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vos identifiants Sugu</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color:#f7a01f;
    }
    .content {
      padding: 30px 20px;
    }
    .credentials {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 4px solid #f7a01f;
    }
    .credentials p {
      margin: 10px 0;
    }
    .credentials strong {
      display: inline-block;
      width: 120px;
    }
    .button {
      display: inline-block;
      background-color: #f7a01f;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      margin-top: 20px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eeeeee;
      font-size: 12px;
      color: #999999;
    }
    @media only screen and (max-width: 480px) {
      .container {
        width: 100%;
        padding: 10px;
      }
      .content {
        padding: 20px 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SUGU</div>
      <p>La plateforme dédiée aux boutiquiers</p>
    </div>
    
    <div class="content">
      <h2>Bienvenue sur Sugu !</h2>
      
      <p>Cher(e) boutiquier(ère),</p>
      
      <p>Votre compte a été créé avec succès. Voici les identifiants de connexion de votre boutique ${shopName} :</p>
      
      <div class="credentials">
        <p><strong>Nom d'utilisateur :</strong> <span id="username">${email}</span></p>
        <p><strong>Mot de passe :</strong> <span id="password">${password}</span></p>
      </div>
      
      <p>Pour des raisons de sécurité, nous vous recommandons vivement de modifier votre mot de passe dès votre première connexion.</p>
      
      <p>Vous pouvez modifier votre nom d'utilisateur et votre mot de passe à tout moment dans les paramètres de votre compte.</p>
      
      <center>
        <a href="https://app.sugu.com/login" class="button">Se connecter à Sugu</a>
      </center>
      
      <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à contacter notre équipe de support.</p>
      
      <p>Cordialement,<br>L'équipe Sugu</p>
    </div>
    
    <div class="footer">
      <p>© 2024 Sugu. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
    </div>
  </div>
</body>
</html>
`;
exports.templateToSendShopidentyMail = templateToSendShopidentyMail;
//# sourceMappingURL=data.js.map