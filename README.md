# Screeps com TypeScript

Este repositório serve de base simplificada para
codificar em **TypeScript** para o Screeps com a
possibilidade de importar bibliotecas **NPM**.

### Scripts NPM

- `npm run build+push`: Compila o TypeScript para o diretório de saída e envia o código-fonte para o Screeps.
- `npm run watch`: Mesmo que **build+push**, mas a cada atualização do arquivo o processo é refeito automaticamente.

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

---
Autor: [sergiocabral.com](https://sergiocabral.com)
