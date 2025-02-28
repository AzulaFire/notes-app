import { database } from './appwrite';

const databaseService = {
  // List Documnents
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error('Error listing documents:', error.message);
      return { error: error.message };
    }
  },
  // Create Document
  async createDocument(dbId, colId, id = null, data) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error('Error creating document:', error.message);
      return { error: error.message };
    }
  },
  // Delete Document
  async deleteDocument(dbId, colId, id) {
    try {
      return await database.deleteDocument(dbId, colId, id);
    } catch (error) {
      console.error('Error deleting document:', error.message);
      return { error: error.message };
    }
  },
  // Update Document
  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error('Error updating document:', error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
