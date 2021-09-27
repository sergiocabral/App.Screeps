import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import cleanupPlugin from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';
import md5 from 'md5';
import * as fs from 'fs';

const configFile = process.env.auth ?? './screeps.json';

function showEnvironmentDetails(configFile) {
  console.info(`Auth file: ${configFile}`);
  try {
    const json = JSON.parse(fs.readFileSync(configFile));
    console.info(` - hostname: ${json.protocol}://${json.hostname}:${json.port}/`);
    console.info(` - path:     /${json.branch}${json.path}`);
  } catch (error) {
    console.error('Content is not valid JSON: ' + error);
  }
}
showEnvironmentDetails(configFile);

/**
 * Plugin para o rollup
 */
const applyVersionInfo = () => {
  /**
   * Marcador no código-fonte para receber o número do build.
   * @type {string}
   */
  const sourceMarkBuildNumber = '{BUILD_NUMBER}';

  /**
   * Marcador no código-fonte para receber o hash do build.
   * @type {string}
   */
  const sourceMarkBuildHash = '{BUILD_HASH}';

  /**
   * Marcador no código-fonte para receber o identificador único do build.
   * @type {string}
   */
  const sourceMarkBuildNonce = '{BUILD_NONCE}';

  /**
   * Nome do arquivo usado para armazenar a versão.
   * @type {string}
   */
  const versionFile = 'VERSION';

  /**
   * Retorna do arquivo as informações da versão.
   */
  function getVersion() {
    let buildNumber;
    let buildHash;
    if (!fs.existsSync(versionFile)) {
      buildNumber = 1;
      buildHash = md5('');
    } else {
      const lines = fs
        .readFileSync(versionFile)
        .toString()
        .trim()
        .split('\n')
        .map(line => line.trim());
      buildNumber = Number.parseInt(lines[0]);
      buildHash = lines[1] ?? md5('');

      if (isNaN(buildNumber)) {
        throw new Error(
          `The content of the file ${versionFile} must be an integer.`
        );
      }
    }

    return [buildNumber, buildHash];
  }

  /**
   * Define no arquivo as informações da versão.
   * @param buildNumber
   * @param buildHash
   */
  function setVersion(buildNumber, buildHash) {
    buildNumber = isFinite(buildNumber) ? parseInt(buildNumber) : 0;
    buildHash = buildHash ? String(buildHash).trim() : md5('');
    const fileContent = [buildNumber, buildHash].join('\n');
    fs.writeFileSync(versionFile, fileContent);
  }

  /**
   * Aplica as substituições da versão no código.
   * @param inputCode Código de entrada.
   * @return Código com substituições feitas.
   */
  function applyVersion(inputCode) {
    const buildNonce = Buffer.from(Math.random().toString())
      .toString('base64')
      .substr(10, 4)
      .toUpperCase();
    let [buildNumber, buildHash] = getVersion();

    const hash = md5(inputCode);

    if (hash !== buildHash) {
      console.info('Previous Build Number:', buildNumber);
      console.info('Previous Build Hash:', buildHash);
      console.info('Updating version data.');

      setVersion(++buildNumber, buildHash = hash);
    }

    console.info('Build Number:', buildNumber);
    console.info('Build Hash:', buildHash);
    console.info('Build Nonce:', buildNonce);
    console.info('Applying into source-code.');

    return inputCode
      .replace(new RegExp(sourceMarkBuildNumber, 'g'), buildNumber)
      .replace(new RegExp(sourceMarkBuildHash, 'g'), buildHash)
      .replace(new RegExp(sourceMarkBuildNonce, 'g'), buildNonce);
  }

  return {
    name: 'applyVersionInfo',
    generateBundle(config, bundle) {
      const mainFile = 'main.js';
      if (bundle[mainFile]?.code) {
        console.error('Applying version.');
        bundle[mainFile].code = applyVersion(bundle[mainFile].code);
      } else {
        console.error('File not found:', mainFile);
      }
    }
  };
};

export default {
  input: 'src/main.ts',                        // Arquivo principal a partir de onde a compilação será feita.
  output: { file: 'output/main.js', },         // Arquivo único de saída que será enviado para o Screeps.
  plugins: [                                   // Veja uma lista dos plugins para Rollup aqui: https://github.com/rollup/plugins
    clear({targets: ['output']}),              // Limpa o diretório de saída.
    commonjs(),                                // Converte os módulos de CommonJS para ES6.
    nodeResolve(),                             // Importa as bibliotecas do npm.
    cleanupPlugin(),                           // Remove os comentários do código-fonte.
    typescript({tsconfig: './tsconfig.json'}), // Compilação TypeScript.
    applyVersionInfo(),                        // Aplica no código-fonte as informações da versão.
    screeps({configFile})                      // Envia o código para o Screeps.
  ]
}
