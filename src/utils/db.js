import Dexie from 'dexie';

class DevStudioDB extends Dexie {
  constructor() {
    super('DevStudioDB');
    
    this.version(1).stores({
      files: '++id, name, path, type, projectId, createdAt, updatedAt',
      projects: '++id, name, type, createdAt, updatedAt',
      snippets: '++id, title, language, tags, createdAt',
      apiHistory: '++id, url, method, timestamp',
      settings: 'key, value',
    });
    
    this.files = this.table('files');
    this.projects = this.table('projects');
    this.snippets = this.table('snippets');
    this.apiHistory = this.table('apiHistory');
    this.settings = this.table('settings');
  }
}

export const db = new DevStudioDB();

// File Operations
export const fileOperations = {
  async createFile(file) {
    const id = await db.files.add({
      ...file,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return db.files.get(id);
  },
  
  async getFile(id) {
    return db.files.get(id);
  },
  
  async getAllFiles(projectId = null) {
    if (projectId) {
      return db.files.where('projectId').equals(projectId).toArray();
    }
    return db.files.toArray();
  },
  
  async updateFile(id, updates) {
    await db.files.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
    return db.files.get(id);
  },
  
  async deleteFile(id) {
    return db.files.delete(id);
  },
  
  async searchFiles(query) {
    const files = await db.files.toArray();
    return files.filter(f => 
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.content?.toLowerCase().includes(query.toLowerCase())
    );
  },
};

// Project Operations
export const projectOperations = {
  async createProject(project) {
    const id = await db.projects.add({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return db.projects.get(id);
  },
  
  async getProject(id) {
    return db.projects.get(id);
  },
  
  async getAllProjects() {
    return db.projects.toArray();
  },
  
  async updateProject(id, updates) {
    await db.projects.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
    return db.projects.get(id);
  },
  
  async deleteProject(id) {
    // Also delete all files in this project
    await db.files.where('projectId').equals(id).delete();
    return db.projects.delete(id);
  },
};

// Snippet Operations
export const snippetOperations = {
  async createSnippet(snippet) {
    const id = await db.snippets.add({
      ...snippet,
      createdAt: new Date(),
    });
    return db.snippets.get(id);
  },
  
  async getAllSnippets() {
    return db.snippets.toArray();
  },
  
  async getSnippetsByLanguage(language) {
    const snippets = await db.snippets.toArray();
    return snippets.filter(s => s.language === language);
  },
  
  async searchSnippets(query) {
    const snippets = await db.snippets.toArray();
    return snippets.filter(s =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      s.code.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  async deleteSnippet(id) {
    return db.snippets.delete(id);
  },
};

// API History Operations
export const apiHistoryOperations = {
  async addRequest(request) {
    const id = await db.apiHistory.add({
      ...request,
      timestamp: new Date(),
    });
    return db.apiHistory.get(id);
  },
  
  async getHistory(limit = 50) {
    return db.apiHistory
      .orderBy('timestamp')
      .reverse()
      .limit(limit)
      .toArray();
  },
  
  async clearHistory() {
    return db.apiHistory.clear();
  },
};

// Settings Operations
export const settingsOperations = {
  async getSetting(key) {
    const setting = await db.settings.get(key);
    return setting?.value;
  },
  
  async setSetting(key, value) {
    return db.settings.put({ key, value });
  },
  
  async getAllSettings() {
    const settings = await db.settings.toArray();
    return settings.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  },
};

// Export/Import Functionality
export const dataOperations = {
  async exportAllData() {
    const [files, projects, snippets, apiHistory, settings] = await Promise.all([
      db.files.toArray(),
      db.projects.toArray(),
      db.snippets.toArray(),
      db.apiHistory.toArray(),
      db.settings.toArray(),
    ]);
    
    return {
      version: 1,
      exportDate: new Date().toISOString(),
      data: { files, projects, snippets, apiHistory, settings },
    };
  },
  
  async importData(exportedData) {
    const { data } = exportedData;
    
    await db.transaction('rw', [db.files, db.projects, db.snippets, db.apiHistory, db.settings], async () => {
      if (data.files) await db.files.bulkAdd(data.files);
      if (data.projects) await db.projects.bulkAdd(data.projects);
      if (data.snippets) await db.snippets.bulkAdd(data.snippets);
      if (data.apiHistory) await db.apiHistory.bulkAdd(data.apiHistory);
      if (data.settings) await db.settings.bulkPut(data.settings);
    });
  },
  
  async clearAllData() {
    await Promise.all([
      db.files.clear(),
      db.projects.clear(),
      db.snippets.clear(),
      db.apiHistory.clear(),
      db.settings.clear(),
    ]);
  },
};

export default db;
