import { Application } from './Infrastructure/Core/Application';
import { UpgradeController } from './Game/Modes/UpgradeController/UpgradeController';

Application.start(new UpgradeController());
