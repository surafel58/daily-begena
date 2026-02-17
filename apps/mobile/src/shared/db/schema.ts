export const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS drills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    strings_used TEXT NOT NULL,
    pattern TEXT NOT NULL,
    duration INTEGER NOT NULL,
    tempo_ramp TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drill_id INTEGER NOT NULL,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    duration REAL,
    top_tempo INTEGER,
    timing_score REAL,
    strike_count_score REAL,
    string_score REAL,
    confidence_band TEXT CHECK(confidence_band IN ('high', 'medium', 'low')),
    notes TEXT,
    FOREIGN KEY (drill_id) REFERENCES drills(id)
  );

  CREATE TABLE IF NOT EXISTS string_signatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    preset_id INTEGER NOT NULL,
    string_number INTEGER NOT NULL,
    feature_blob BLOB NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    device_id TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS attempt_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id INTEGER NOT NULL,
    step_index INTEGER NOT NULL,
    expected_string INTEGER,
    detected_string INTEGER,
    timing_error_ms REAL,
    confidence REAL,
    FOREIGN KEY (attempt_id) REFERENCES attempts(id)
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_preset_id INTEGER DEFAULT 1,
    numbering_scheme TEXT DEFAULT 'standard'
  );
`;
