import { Application } from './Infrastructure/Core/Application';
import { UpgradeController } from './Game/Modes/UpgradeController/UpgradeController';
import { Definition } from './Infrastructure/Definition';

(Game as unknown as Record<string, Application>)[Definition.GameApplication] =
  Application.start(new UpgradeController());
