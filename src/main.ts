import { Application } from './Infrastructure/Core/Application';
import { Definition } from './Infrastructure/Definition';
import { UpgradeController } from './Game/Executor/UpgradeController/UpgradeController';

(Game as unknown as Record<string, Application>)[Definition.GameApplication] =
  Application.start(new UpgradeController());
