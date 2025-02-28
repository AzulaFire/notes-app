import { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PostItImage from '@/assets/images/post-it.png';
import noteService from '@/services/noteService';
import { useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [noteCount, setNoteCount] = useState(0);
  const [fetchError, setFetchError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setFetchError(response.error);
    } else {
      setNotes(response.data);
      setNoteCount(response.data.length);
      setFetchError(null);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const router = useRouter();
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
          <Text style={styles.noteCount}>Total Notes: {noteCount}</Text>
          <TextInput
            style={styles.searchBar}
            placeholder='Search Notes...'
            placeholderTextColor='#666'
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredNotes}
            style={styles.noteList}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <FontAwesome
                  name='sticky-note-o'
                  color='#000'
                  size={24}
                  style={styles.noteIcon}
                />
                <Text style={styles.noteText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.imageContainer}>
            <Image source={PostItImage} style={styles.image} />
            <Text style={styles.title}>Welcome to Notes App</Text>
            <Text style={styles.subTitle}>
              Capture your thoughts, anytime, anywhere
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/notes')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noteCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  searchBar: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  noteList: {
    width: '100%',
  },
  noteItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  noteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2d545e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  noteIcon: {
    paddingRight: 8,
  },
});

export default HomeScreen;
