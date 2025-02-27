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
};

export default databaseService;
