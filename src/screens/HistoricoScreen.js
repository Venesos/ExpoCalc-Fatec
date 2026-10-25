import { useState } from 'react';
import { FlatList, Text, View, Button, TouchableOpacity,StyleSheet } from 'react-native';
import { salvar, limpar } from '../storage/historico';

console.log('HISTORICO COM IMPORT OK'); // Para ter certeza de que o histórico está funcional.
export default function HistoricoScreen({ route, navigation }) {
  const [lista, setLista] = useState(route.params.historico);

  async function limparTudo() {
    await limpar();
    setLista([]);
  }

  async function excluir(id) {
    const nova = lista.filter((item) => item.id !== id);
    setLista(nova);
    await salvar(nova);
  }

  function reutilizar(item) {
    navigation.popTo('Home', {
      valor: item.resultado,
      toque: Date.now(),
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.botaoLimpar}>
        <Button title="Limpar histórico" onPress={limparTudo} />
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.conta} onPress={() => reutilizar(item)}>
              <Text style={styles.linha}>
                {item.conta} = {item.resultado}
              </Text>
            </TouchableOpacity>
            <Button title="Excluir" color="#c0392b" onPress={() => excluir(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.linha}>Nenhuma conta ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a0303' },
  botaoLimpar: { margin: 12, backgroundColor: '#f0f0f0', borderRadius: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  conta: { flex: 1 },
  linha: { fontSize: 24, padding: 12, color: 'white' },
});