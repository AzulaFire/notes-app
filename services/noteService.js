import databaseService from './databaseService';
import { ID } from 'react-native-appwrite';

// Appwrite database and collection id

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    console.log(response);
    return { data: response };
  },
  // Add Note
  async addNote(title, content) {
    if (!title || !content) {
      return { error: 'Title and content are required' };
    }
    const data = {
      text: title,
      details: content,
      createdAt: new Date().toISOString(),
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      ID.unique(),
      data
    );
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  // Delete Note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  // Update Note
  async updateNote(id, title, content) {
    const data = {
      text: title,
      details: content,
    };
    const response = await databaseService.updateDocument(
      dbId,
      colId,
      id,
      data
    );
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
};

export default noteService;
