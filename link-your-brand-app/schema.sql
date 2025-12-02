CREATE TYPE IF NOT EXISTS location_type AS ENUM ('in_person','remote','hybrid');

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organizer_cognito_id TEXT,
  rsvp_count INTEGER DEFAULT 0,
  location_type location_type,
  address TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  organizer_contact TEXT,
  tags JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) NOT NULL,
  attendee_cognito_id TEXT,
  attendee_email_hash TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (event_id, attendee_email_hash)
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS event_tags (
  event_id INTEGER REFERENCES events(id) NOT NULL,
  tag_id INTEGER REFERENCES tags(id) NOT NULL,
  PRIMARY KEY (event_id, tag_id)
);

CREATE TABLE IF NOT EXISTS display_settings (
  id TEXT PRIMARY KEY,
  layout TEXT,
  primary_color TEXT,
  font TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
