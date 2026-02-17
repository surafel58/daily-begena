import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES_SQL } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync('daily-begena.db');
  await db.execAsync(CREATE_TABLES_SQL);

  // Ensure default settings row exists
  const settings = await db.getFirstAsync('SELECT id FROM settings LIMIT 1');
  if (!settings) {
    await db.runAsync(
      'INSERT INTO settings (selected_preset_id, numbering_scheme) VALUES (?, ?)',
      1,
      'standard'
    );
  }

  return db;
}
