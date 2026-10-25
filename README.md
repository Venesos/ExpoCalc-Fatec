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