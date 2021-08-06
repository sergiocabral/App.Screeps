import { Application } from './Infrastructure/Core/Application';
import { BasicGame } from './Game/Modes/BasicGame/BasicGame';

Application.start(new BasicGame());
