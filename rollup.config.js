import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import cleanupPlugin from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';

const configFile = process.argv[4] ?? './screeps.json';

export default {
  input: 'src/main.ts',                        // Arquivo principal a partir de onde a compilação será feita.
  output: { file: 'output/main.js', },         // Arquivo único de saída que será enviado para o Screeps.
  plugins: [                                   // Veja uma lista dos plugins para Rollup aqui: https://github.com/rollup/plugins
    clear({targets: ['output']}),              // Limpa o diretório de saída.
    commonjs(),                                // Converte os módulos de CommonJS para ES6.
    nodeResolve(),                             // Importa as bibliotecas do npm.
    cleanupPlugin(),                           // Remove os comentários do código-fonte.
    typescript({tsconfig: './tsconfig.json'}), // Compilação TypeScript.
    screeps({configFile})    // Envia o código para o Screeps.
  ]
}
