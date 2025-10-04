# GPT Backend (Render)

Petit serveur **Express** qui proxifie votre interface web (catalogue GPT) vers l'API **OpenAI**.
Il renvoie les réponses en **stream** (SSE). Clé OpenAI côté serveur uniquement ✅

## Lancer en local

```bash
npm install
OPENAI_API_KEY=ta_cle node server.js
# Test : http://localhost:8787  (doit afficher OK)
```

## Déployer sur Render

1. Poussez ce dossier sur GitHub (repo `gpt-backend`).
2. Sur https://dashboard.render.com → **New** → **Web Service** → **Connect GitHub** → choisissez le repo.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**: ajoutez `OPENAI_API_KEY` avec votre clé OpenAI.
6. Déployez → l'URL ressemblera à `https://gpt-backend-xxxxx.onrender.com`  
   - Endpoint à utiliser dans votre front : `https://gpt-backend-xxxxx.onrender.com/api/chat`

## Sécurité CORS

Le serveur est ouvert à toutes les origines pendant vos tests (`app.use(cors())`).  
Quand vous aurez un domaine front, remplacez par :

```js
import cors from "cors";
app.use(cors({ origin: ["https://votre-domaine.com"] }));
```

## Format attendu par l'API

Requête POST `/api/chat` :
```json
{
  "assistantId": "pep-guardiola",
  "sessionId": "session-pep-guardiola",
  "messages": [{ "role": "user", "content": "Bonjour" }],
  "model": "gpt-4.1",
  "system": "Prompt système de votre bot"
}
```
