# Recebimento de métricas da página

Este documento descreve como receber as métricas geradas pelo frontend do portfólio.

O app atualmente **cria eventos no navegador** e os publica em `window` por meio do evento customizado:

```ts
portfolio:analytics
```

O frontend ainda não envia esses eventos automaticamente para uma API. Para receber as métricas em um backend, adicione um coletor no frontend que escute esse evento e envie o payload para um endpoint HTTP.

---

## Contrato do evento

Todo evento segue o tipo `AnalyticsEvent`, definido em `src/features/analytics/analytics.ts`.

```ts
type AnalyticsEvent = {
  eventId: string;
  eventName: string;
  timestamp: string;
  sessionId: string;
  page: string;
  metadata: Record<string, unknown>;
};
```

Exemplo de payload:

```json
{
  "eventId": "7f6e8d2a-3e4b-4df5-8f75-0f6c44f94db1",
  "eventName": "pageVisited",
  "timestamp": "2026-06-23T22:40:00.000Z",
  "sessionId": "7a1e9c74-6f9a-4b3a-8a57-91ff0f7ed691",
  "page": "/projects",
  "metadata": {
    "visitStart": "2026-06-23T22:39:12.000Z",
    "userAgent": "Mozilla/5.0 ...",
    "language": "pt-BR",
    "timezone": "America/Fortaleza",
    "screenWidth": 1920,
    "screenHeight": 1080,
    "viewportWidth": 1440,
    "viewportHeight": 900,
    "pixelRatio": 1,
    "referrer": "",
    "previousPage": "/",
    "nextPage": "/projects"
  }
}
```

---

## Eventos gerados hoje

| Evento | Quando acontece | Metadados específicos |
| --- | --- | --- |
| `pageVisited` | Ao entrar ou trocar de rota | `previousPage`, `nextPage`, `entryPage` |
| `scrollDepth` | Durante o scroll | `scrollDepth`, `maxScrollDepth`, `timeUntilScroll` |
| `interactionClick` | Ao clicar em links, botões ou elementos com `data-analytics` | `tagName`, `label`, `href` |
| `completedForms` | Ao enviar o formulário de contato com sucesso | `form`, `hasEmail` |
| `visitEnd` | Ao desmontar o provider de analytics | `visitEnd`, `maxScrollDepth` |

Além disso, todos os eventos incluem metadados de dispositivo, tela, idioma, timezone e referrer.

---

## Coletor frontend recomendado

Crie um serviço para escutar `portfolio:analytics` e enviar os eventos para o backend.

Exemplo:

```ts
import type { AnalyticsEvent } from "./analytics";

const ANALYTICS_ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT;

export function startAnalyticsTransport() {
  function handleAnalyticsEvent(event: Event) {
    const analyticsEvent = (event as CustomEvent<AnalyticsEvent>).detail;

    navigator.sendBeacon?.(
      ANALYTICS_ENDPOINT,
      new Blob([JSON.stringify(analyticsEvent)], { type: "application/json" }),
    ) ||
      fetch(ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyticsEvent),
        keepalive: true,
      });
  }

  window.addEventListener("portfolio:analytics", handleAnalyticsEvent);

  return () => {
    window.removeEventListener("portfolio:analytics", handleAnalyticsEvent);
  };
}
```

Depois, chame esse serviço uma vez na inicialização da aplicação, por exemplo dentro do provider de analytics ou de um provider de aplicação.

Variável de ambiente esperada:

```env
VITE_ANALYTICS_ENDPOINT=https://api.seudominio.com/analytics/events
```

---

## Endpoint backend mínimo

O backend deve aceitar `POST /analytics/events` com `Content-Type: application/json`.

Exemplo com Node.js e Express:

```ts
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "https://seudominio.com" }));
app.use(express.json({ limit: "64kb" }));

app.post("/analytics/events", async (request, response) => {
  const event = request.body;

  if (!event.eventId || !event.eventName || !event.sessionId || !event.timestamp) {
    return response.status(400).json({ error: "Invalid analytics event" });
  }

  await saveAnalyticsEvent(event);

  return response.status(204).send();
});

async function saveAnalyticsEvent(event: unknown) {
  // Salvar em banco, fila, data lake ou serviço de mensageria.
}

app.listen(3333);
```

---

## Modelo de armazenamento

Uma tabela simples pode guardar o evento bruto para processamento posterior:

```sql
CREATE TABLE analytics_events (
  event_id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  occurred_at TIMESTAMP NOT NULL,
  metadata JSONB NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT now()
);
```

Mapeamento:

| Coluna | Origem |
| --- | --- |
| `event_id` | `event.eventId` |
| `event_name` | `event.eventName` |
| `session_id` | `event.sessionId` |
| `page` | `event.page` |
| `occurred_at` | `event.timestamp` |
| `metadata` | `event.metadata` |
| `received_at` | gerado pelo backend |

---

## Recebimento em lote

Para reduzir muitas requisições de `scrollDepth`, o coletor pode acumular eventos e enviar em lote:

```ts
const queue: AnalyticsEvent[] = [];

function flushAnalyticsQueue() {
  if (queue.length === 0) return;

  const events = queue.splice(0, queue.length);

  fetch("/analytics/events/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ events }),
    keepalive: true,
  });
}

window.addEventListener("portfolio:analytics", (event) => {
  queue.push((event as CustomEvent<AnalyticsEvent>).detail);

  if (queue.length >= 10) {
    flushAnalyticsQueue();
  }
});

setInterval(flushAnalyticsQueue, 5000);
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    flushAnalyticsQueue();
  }
});
```

Endpoint esperado:

```json
{
  "events": [
    {
      "eventId": "...",
      "eventName": "interactionClick",
      "timestamp": "...",
      "sessionId": "...",
      "page": "/",
      "metadata": {}
    }
  ]
}
```

---

## Boas práticas

- Validar o payload no backend antes de salvar.
- Usar HTTPS em produção.
- Configurar CORS somente para os domínios permitidos.
- Evitar salvar dados sensíveis de formulários.
- Deduplicar por `eventId`.
- Salvar o evento bruto e processar métricas agregadas depois.
- Aplicar rate limit por IP/sessão.
- Considerar amostragem ou debounce para eventos de scroll.

---

## Próximo passo recomendado

Implementar um `AnalyticsTransportProvider` ou integrar o transporte dentro de `AnalyticsProvider`, usando `VITE_ANALYTICS_ENDPOINT` para enviar os eventos para o backend escolhido.
