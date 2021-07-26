# Screeps com JavaScript

Este repositório serve de base simplificada para
codificar em **JavaScript** para o Screeps.

### Scripts NPM

- `npm run push`: Envia o código-fonte para o Screeps.

### Autenticação no Screeps

As informações de autenticação no Screeps deve ficar
armazenadas no arquivo `screeps.json`.

Você pode escrever este arquivo com base no arquivo
`example.screeps.json`, apenas modificando os valores
das propriedades.

### Publicação no Screeps

Somente os arquivos do diretório `./src` são enviados.
Nenhuma modificação no conteúdo dos arquivos é feita.
Embora os arquivos sejam enviados sem a extensão `.js`,
conforme esperado pelo Screeps.

Atenção! O Screeps não suporta subdiretórios. Por esse
motivo qualquer subdiretório contido em `./src` será
ignorado.

### Bibliotecas externas

Não é possível adicionar bibliotecas externas
através do comando `npm instal <biblioteca>`.
O motivo é que a biblioteca não estará embutida
no código JavaScript que será enviado ao Screeps.

### Organização dos arquivos

Atenção! O Screeps não suporta subdiretórios. Por esse
motivo qualquer subdiretório contido em `./src` será
ignorado.

---
Autor: [sergiocabral.com](https://sergiocabral.com)
