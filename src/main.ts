import { Application } from './Infrastructure/Core/Application';
import { Definition } from './Infrastructure/Definition';
import { Laboratory } from './Game/Modes/Laboratory/Laboratory';

(Game as unknown as Record<string, Application>)[Definition.GameApplication] =
  Application.start(new Laboratory());
