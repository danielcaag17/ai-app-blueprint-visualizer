import { setupEventHandlers } from './events.js';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose'
});

setupEventHandlers();
