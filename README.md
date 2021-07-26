# Screeps com TypeScript

Este repositório serve de base simplificada para
codificar em **TypeScript** para o Screeps.

### Scripts NPM

- `npm run build`: Compila o TypeScript para o diretório de saída.
- `npm run push`: Envia o código-fonte para o Screeps.
- `npm run build+push`: Compila e envia o código para o Screeps.

### Autenticação no Screeps

As informações de autenticação no Screeps deve ficar
armazenadas no arquivo `screeps.json`.

Você pode escrever este arquivo com base no arquivo
`example.screeps.json`, apenas modificando os valores
das propriedades.

### Publicação no Screeps

O código-fonte no diretório `./src` é compilado
para o diretório `./output`.

Foi definido no arquivo `tsconfig.json` como resultado
da compilação o _ES2015_. Ele é compatível com
o Screeps e faz com que o código JavaScript gerado
no diretório `output` fique semelhante ao código-fonte
original em TypeScript. Embora o estilo de ligação
entre módulos seja o `commonjs` porque o Screeps não
aceita `import`. 

### Bibliotecas externas

Não é possível adicionar bibliotecas externas
através do comando `npm instal <biblioteca>`.
O motivo é que a biblioteca não será embutida
no código JavaScript gerado após a compilação,
logo não estará acessível no Screeps.

### Organização dos arquivos

Atenção! O Screeps não suporta subdiretórios. Por esse
motivo qualquer subdiretório contido em `./src` será
ignorado.

---
Autor: [sergiocabral.com](https://sergiocabral.com)
