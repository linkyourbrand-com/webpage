import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('user_id').primaryKey(),
    name: text('name').notNull(),
    email: text ('email').unique().notNull(),
});

export const events = pgTable('events', {
    id: serial('event_id').primaryKey(),
    title: text('title'),
    description: text('description'),
    location: text('location'),
    zipCode: integer('zip_code'),
    date: integer('date'),
    time: timestamp('time'),
    organizer: text('organizer'),
});

export const registrations = pgTable('registrations', {
    eventId: integer('event_id').references(() => events.id),
    userId: integer('user_id').references(() => users.id),
});

//Select join user and registrations to get all users registered for an event
// db.select().from(users).innerJoin(registrations, users.id.eq(registrations.userId)).where(registrations.eventId.eq(1));

//Select join events and registrations to get all events a user is registered for
// db.select().from(events).innerJoin(registrations, events.id.eq(registrations.eventId)).where(registrations.userId.eq(1));



