# Screeps com TypeScript

Este repositório serve de base simplificada para
codificar em **TypeScript** para o Screeps com a
possibilidade de importar bibliotecas **NPM**.

### Scripts NPM

- `npm run build+push`: Compila o TypeScript para o diretório de saída e envia o código-fonte para o Screeps.
- `npm run watch`: Mesmo que **build+push**, mas a cada atualização do arquivo o processo é refeito automaticamente.
- `npm run test`: Executa os testes automatizados.
- `npm run format`: Ajusta a formatação dos arquivos de código-fonte.
- `npm run lint`: Valida a sintaxe dos arquivos de código-fonte.
- `npm run format+lint`: Ajusta a formatação e valida a sintaxe.

### Autenticação no Screeps

As informações de autenticação no Screeps deve ficar
armazenadas no arquivo `screeps.json`.

Você pode escrever este arquivo com base no arquivo
`example.screeps.json`, apenas modificando os valores
das propriedades.

### Publicação no Screeps

O código-fonte no diretório `./src` é compilado
para o diretório `./output`.

### Bibliotecas externas

É possível adicionar bibliotecas externas
através do comando `npm instal <biblioteca>`.

### Compilação

A compilação unifica todos os arquivos TypeScript
de entrada num único arquivo JavaScript de saída.
Estará incluído neste arquivo de saída as bibliotecas
NPM utilizadas. 

### Organização dos arquivos

Embora o Screeps não suporte subdiretórios, é
possível organizar o código-fonte TypeScript em
subdiretório visto que ele será unificado num
único arquivo JavaScript de saída.

### Testes automatizados

A biblioteca para testes automatizados instalada
é o _Jest_. 

Foi reservado para a escrita de testes o diretório
`./test`. Como sugestão de organização pode-se criar
a mesma estrutura de arquivos e diretórios presentes
em `./src`, mas finalizando cada arquivo de teste com
`*.test.ts`.

### Formatação e linter

As bibliotecas utilizadas para formatar e avaliar o
código-fonte são, respectivamente, o _Prettier_ e o
_ESLint_.

Quando executada, a formatação do código é aplicada
no arquivo `./index.js` e no conteúdo dos diretórios
`./src`, `./test` e `./output`.

O linter é aplicado apenas no conteúdo do diretório
`./src`.

---
Autor: [sergiocabral.com](https://sergiocabral.com)
