export type AnalyticsEvent = {
  eventId: string;
  eventName: string;
  timestamp: string;
  sessionId: string;
  page: string;
  metadata: Record<string, unknown>;
};

const sessionId = crypto.randomUUID();
const visitStart = new Date().toISOString();

function getDeviceMetadata() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
    referrer: document.referrer,
  };
}

export function createAnalyticsEvent(eventName: string, metadata: Record<string, unknown> = {}): AnalyticsEvent {
  return {
    eventId: crypto.randomUUID(),
    eventName,
    timestamp: new Date().toISOString(),
    sessionId,
    page: window.location.pathname,
    metadata: {
      visitStart,
      ...getDeviceMetadata(),
      ...metadata,
    },
  };
}

export function dispatchAnalyticsEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  const event = createAnalyticsEvent(eventName, metadata);
  window.dispatchEvent(new CustomEvent("portfolio:analytics", { detail: event }));
}
