import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NotesModal from '@/components/NotesModal';
import noteService from '@/services/noteService';
import Icon from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedDetails, setEditedDetails] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setFetchError(response.error);
    } else {
      setNotes(response.data);
      setFetchError(null);
    }
    setLoading(false);
  };

  const addNote = async () => {
    if (!newNote.title || !newNote.content) {
      setError(true);
      return;
    }
    setError(false);
    const response = await noteService.addNote(newNote.title, newNote.content);
    if (!response.error) {
      setNotes([...notes, response.data]);
    }
    setModalVisible(false);
    setNewNote({ title: '', content: '' });
  };

  const deleteNote = async (id) => {
    const response = await noteService.deleteNote(id);
    if (!response.error) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== id));
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note.$id);
    setEditedText(note.text);
    setEditedDetails(note.details);
  };

  const saveEdit = async (id) => {
    const response = await noteService.updateNote(
      id,
      editedText,
      editedDetails
    );
    if (!response.error) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id
            ? { ...note, text: editedText, details: editedDetails }
            : note
        )
      );
      setEditingNoteId(null);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
          <FlatList
            data={notes}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <View style={styles.noteTextContainer}>
                  {editingNoteId === item.$id ? (
                    <>
                      <TextInput
                        style={styles.editInput}
                        value={editedText}
                        onChangeText={setEditedText}
                        placeholder='Edit title...'
                      />
                      <TextInput
                        style={[styles.editInput, styles.editDetails]}
                        value={editedDetails}
                        onChangeText={setEditedDetails}
                        placeholder='Edit details...'
                        multiline
                      />
                    </>
                  ) : (
                    <>
                      <Text style={styles.noteText}>{item.text}</Text>
                      <Text style={styles.noteDetails}>{item.details}</Text>
                    </>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => deleteNote(item.$id)}
                >
                  <Icon name='x-circle-fill' color='#ff0000' size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() =>
                    editingNoteId === item.$id
                      ? saveEdit(item.$id)
                      : startEditing(item)
                  }
                >
                  <FontAwesome
                    name={editingNoteId === item.$id ? 'save' : 'edit'}
                    color='#000'
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Note</Text>
          </TouchableOpacity>
          <NotesModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
            error={error}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  noteTextContainer: {
    flex: 1,
  },
  noteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDetails: {
    fontSize: 14,
    color: '#666',
  },
  editInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  editDetails: {
    height: 60,
  },
  addButton: {
    backgroundColor: '#2d545e',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  iconButton: {
    padding: 5,
  },
});

export default NoteScreen;
