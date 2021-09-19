import { Application } from './Infrastructure/Core/Application';
import { Definition } from './Infrastructure/Definition';
import { UpgradeControllerV2 } from './Game/Modes/UpgradeController/UpgradeControllerV2';

(Game as unknown as Record<string, Application>)[Definition.GameApplication] =
  Application.start(new UpgradeControllerV2());
