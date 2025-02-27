import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import NotesModal from '@/components/NotesModal';

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content of Note 1' },
    { id: 2, title: 'Note 2', content: 'Content of Note 2' },
    { id: 3, title: 'Note 3', content: 'Content of Note 3' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      return;
    }
    const newId = notes.length + 1;
    const newNoteWithId = { ...newNote, id: newId };
    setNotes([...notes, newNoteWithId]);
    setModalVisible(false);
    setNewNote({ title: '', content: '' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <NotesModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  noteItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  noteText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 20,
  },
});

export default NoteScreen;
