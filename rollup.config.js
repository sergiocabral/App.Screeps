import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import cleanupPlugin from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';
import * as fs from 'fs';

const configFile = process.env.auth ?? './screeps.json';

/**
 * Plugin para o rollup
 */
const applyVersionInfo = () => {
  /**
   * Aplica a estampa do build.
   * @param inputCode Código de entrada.
   * @return Código com substituições feitas.
   */
  function applyBuildStamp(inputCode) {
    const mark = '{BUILD_STAMP}';
    const value = Buffer.from(Math.random().toString())
      .toString('base64')
      .substr(10, 4)
      .toUpperCase();
    console.log('Build Stamp:', value);
    return inputCode.replace(new RegExp(mark, 'g'), value);
  }

  /**
   * Aplica o número do build.
   * @param inputCode Código de entrada.
   * @return Código com substituições feitas.
   */
  function applyBuildNumber(inputCode) {
    const fileName = 'BUILD_NUMBER';
    const mark = '{' + fileName + '}';
    let value;
    if (!fs.existsSync(fileName)) {
      value = 1;
    } else {
      value = Number.parseInt(fs.readFileSync(fileName).toString().trim()) + 1;
      if (isNaN(value)) {
        throw new Error(
          `The content of the file ${fileName} must be an integer.`
        );
      }
    }
    fs.writeFileSync(fileName, value.toFixed(0));

    console.log('Build Number:', value);
    return inputCode.replace(new RegExp(mark, 'g'), value);
  }

  /**
   * Aplica as substituições da versão no código.
   * @param inputCode Código de entrada.
   * @return Código com substituições feitas.
   */
  function applyBuild(inputCode) {
    return applyBuildStamp(applyBuildNumber(inputCode));
  }

  return {
    name: 'applyVersionInfo',
    generateBundle(config, bundle) {
      const mainFile = 'main.js';
      if (bundle[mainFile]?.code) {
        console.error('Applying version.');
        bundle[mainFile].code = applyBuild(bundle[mainFile].code);
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
