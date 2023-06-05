import { Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert
} from "react-native";

import { styles } from "./styles";
import {Participant} from '../../components/Participant'
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [name, setName] = useState<string>('')


  function handleParticipantAdd() {
    if(participants.includes(name)) {
      Alert.alert("Participante já adicionado!")
      return;
    }

    if(name === '') {
      Alert.alert("Insira um nome para o participante!")
      return;
    }

    setParticipants(state => [...state, name])
    setName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover' ,`Deseja remover ${name}?`, [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => {
          setParticipants(state => state.filter(participant => participant !== name))
        }
      }
    ])

    console.log("Você clicou no botão de Remover!", name);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setName}
          value={name}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <Participant name={item} onRemove={handleParticipantRemove}/>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            Nenhum participante adicionado
          </Text>
        )}
      />


    </View>
  )
}