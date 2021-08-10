# Planejamento  

O que segue são anotações pra me ajudar a definir
um passo-a-passo que permita evoluir a lógica do bot.

---

## Implementar via código-fonte

- [ ] Criar creeps
  - Criar creep sempre que for possível
  - Fazer deles havaster para criar mais creeps
  - Criar uma multidão

## Rascunhos

Montar lista de BodyPartConstant

```typescript
  const parts: Record<number, BodyPartConstant> = {
    10: MOVE,
    5: CARRY
  }
  function transformToBodyPartList(data: Record<number, BodyPartConstant>): BodyPartConstant[] {
    return Object.keys(data)
      .map(name => Number(name))
      .map(count => Array<BodyPartConstant>(count).fill(data[count]))
      .reduce((result: BodyPartConstant[], list: BodyPartConstant[]) => {
        result.push(...list)
        return result
      }, Array<BodyPartConstant>())
  }
  const partsAsList = transformToBodyPartList(parts)
```
