import { EventsHome } from "./events_home.js";
import { EventsStandardBlueprint } from "./events_standard_blueprint.js";
import { EventsPremiumBlueprint } from "./events_premium_blueprint.js";

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
