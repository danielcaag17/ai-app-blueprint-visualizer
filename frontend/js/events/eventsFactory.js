import { EventsHome } from "./eventsHome.js";
import { EventsStandardBlueprint } from "./eventsStandardBlueprint.js";
import { EventsPremiumBlueprint } from "./eventsPremiumBlueprint.js";

// Registry Pattern
const eventsRegistry = {
  home: EventsHome,
  standardBlueprint: EventsStandardBlueprint,
  premiumBlueprint: EventsPremiumBlueprint,
};

// Fábrica dinámica basada en el registro
export function createEventsHandler(pageId) {
  const EventClass = eventsRegistry[pageId];
  return EventClass ? new EventClass() : null;
}
