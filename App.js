// App.js
import React, { useState } from 'react';
import { View, Text, FlatList, Modal, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import RecipeCard from './components/RecipeCard';

export default function App() {
  const [recipes] = useState([
    { 
      id: '1',
      title: 'Bolo de Chocolate',
      description: 'Bolo macio e fofo de chocolate',
      ingredients: ['2 xícaras de farinha', '1 xícara de chocolate em pó', '3 ovos', '1/2 xícara de leite'],
      preparation: 'Bata tudo junto e asse por 40 minutos a 180°C',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '2',
      title: 'Lasanha de Frango',
      description: 'Com molho branco e peito de frango desfiado',
      ingredients: ['500g de peito de frango', 'massa de lasanha', '500 ml de molho branco', 'queijo mussarela'],
      preparation: 'Monte em camadas e asse até o queijo derreter',
      image: 'https://fricassedefrango.com.br/wp-content/uploads/2024/12/como-fazer-a-lasanha-de-frango.jpg'
    },
    { 
      id: '3',
      title: 'Brigadeiro',
      description: 'Doce tradicional de chocolate',
      ingredients: ['1 lata de leite condensado', '2 colheres de sopa de chocolate em pó', '1 colher de sopa de margarina'],
      preparation: 'Leve ao fogo médio, mexendo até desgrudar da panela',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQobYfjrJ-qrkxdxGRLvxsE3CLol1Pf0Puedw&s'
    }
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingText, setRatingText] = useState('');

  const handleOpen = (item) => {
    setSelectedRecipe(item);
    setModalVisible(true);
    setRatingText(''); // limpa avaliação ao abrir receita
  };

  const handleClose = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
    setRatingText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Receitas</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => handleOpen(item)} />
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modal}>
          {selectedRecipe && (
            <>
              {selectedRecipe.image && (
                <Image source={{ uri: selectedRecipe.image }} style={styles.modalImage} />
              )}
              <Text style={styles.title}>{selectedRecipe.title}</Text>
              <Text style={styles.description}>{selectedRecipe.description}</Text>

              <Text style={styles.subtitle}>🍕 Ingredientes:</Text>
              {selectedRecipe.ingredients?.map((ing, idx) => (
                <Text key={idx} style={styles.text}>- {ing}</Text>
              ))}

              <Text style={styles.subtitle}>🥣 Modo de preparo:</Text>
              <Text style={styles.text}>{selectedRecipe.preparation}</Text>

              {/* Avaliação */}
              <Text style={styles.subtitle}>📝 Avaliação</Text>
              <TextInput
                style={styles.input}
                placeholder="Escreva sua avaliação aqui..."
                multiline
                value={ratingText}
                onChangeText={setRatingText}
              />

              <TouchableOpacity 
                style={styles.button}
                onPress={() => setRatingText('')}
              >
                <Text style={styles.buttonText}>Enviar Avaliação</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#6B4226',
  },
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#6B4226',
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 15,
    color: '#5A4A3E',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: '#6B4226',
  },
  text: {
    fontSize: 16,
    color: '#5A4A3E',
  },
  input: {
    borderColor: '#E07A5F',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    color: '#5A4A3E',
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#E07A5F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  }
});
