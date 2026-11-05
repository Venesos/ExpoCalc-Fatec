# ExpoCalc

Calculadora em React Native (Expo SDK 54) usada na aula de Desenvolvimento de dispositivos móveis (Fatec ADS).
Esta versão é o resultado final da aula: componentes, histórico com FlatList, persistência com AsyncStorage e navegação entre duas telas.

## Como rodar

```bash
npm install
npx expo start
```

Abra no Expo Go (SDK 54) ou aperte `a` para o emulador Android.

## Estrutura

```text
App.js                      navegação (Home e Historico)
src/
  components/
    Botao.js                botão reutilizável (props: label, onPress, tipo)
    Display.js              painel com expressão, resultado e indicador de memória
    Teclado.js              teclas geradas a partir de um array com .map()
  screens/
    HomeScreen.js           calculadora, estado e histórico
    HistoricoScreen.js      lista de contas com FlatList
  storage/
    historico.js            salvar e carregar com AsyncStorage
  utils/
    calcular.js             cálculo da expressão (sem eval)
```

## Pacotes da aula

Instalados com as versões do SDK 54:
`@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`,
`react-native-safe-area-context` e `@react-native-async-storage/async-storage`.

## Evoluções feitas (Atividade 24/10)

- **Evolução 1:** botão "Limpar histórico" na tela de histórico (apaga da tela e do AsyncStorage). A Home recarrega o histórico a cada vez que ganha foco.
- **Evolução 2:** botão "Excluir" em cada conta do histórico, usando `filter` e salvando a nova lista.
- **Evolução 3:** tocar numa conta do histórico volta para a calculadora com o resultado no display (`navigation.popTo` + `useEffect`).

- ## Perguntas da entrega

**Evolução 1: por que a Home precisa recarregar o histórico, e não só a tela de histórico?**
A Home guarda uma cópia do histórico no próprio estado. Quando a tela de histórico limpa o AsyncStorage, a Home continua com a lista antiga na memória. Se fizéssemos uma conta nova, ela salvaria a lista antiga com a conta nova e as contas apagadas voltariam. Recarregando quando a tela ganha foco (`navigation.addListener('focus', ...)`), a Home sempre lê o que está de fato salvo.

**Evolução 2: por que usar `filter` em vez de remover o item da lista que está no estado?**
O React só redesenha a tela quando o estado recebe uma referência nova. Se mexêssemos no mesmo array (com `splice`, por exemplo), a referência seria a mesma e a tela não atualizaria. O `filter` devolve um array novo, sem o item excluído, e deixa o original intacto.

**Evolução 3 (desafio extra): tocar na mesma conta duas vezes, o valor volta?**
Se o `useEffect` observasse só `route.params?.valor`, o segundo toque não faria nada, porque o valor seria igual ao anterior e o React não enxerga mudança. Por isso enviamos também `toque: Date.now()`, que muda a cada toque, e o `useEffect` observa esse campo.
