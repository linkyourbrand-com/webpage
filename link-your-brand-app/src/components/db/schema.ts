import { pgTable,serial,text,integer,timestamp,pgEnum,primaryKey,unique,json,} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enum for location type
export const locationType = pgEnum('location_type', ['in_person', 'virtual', 'hybrid']);

export const accountTypes = pgEnum('account_type', ['organizer', 'attendee']);



export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    organizer_id: text('organizer_id'),
    rsvp_count: integer('rsvp_count').default(0),
    location_type: locationType('location_type').default('in_person'),
    address: text('address'),
    start_time: timestamp('start_time'),
    end_time: timestamp('end_time'),
    organizer_contact: text('organizer_contact'),
    tags: json('tags'),
    created_at: timestamp('created_at').defaultNow(),
});

export const registrations = pgTable(
    'registrations',
    {
        id: serial('id').primaryKey(),
        event_id: integer('event_id').references(() => events.id).notNull(),
        attendee_id: text('attendee_id'),
        attendee_email_hash: text('attendee_email_hash'),
        status: text('status'),
        created_at: timestamp('created_at').defaultNow(),
    },
    (table) => ({
        unique_registration: unique('unique_registration').on(table.event_id, table.attendee_email_hash),
    })
);


export const tags = pgTable('tags', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
});

export const eventTags = pgTable(
    'event_tags',
    {
        event_id: integer('event_id').references(() => events.id).notNull(),
        tag_id: integer('tag_id').references(() => tags.id).notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.event_id, t.tag_id] }),
    })
);

export const displaySettings = pgTable('display_settings', {
    id: text('id').primaryKey(),
    layout: text('layout'),
    primaryColor: text('primary_color'),
    font: text('font'),
    data: json('data'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// relations helpers
export const eventsRelations = relations(events, ({ many }) => ({
    registrations: many(registrations),
    eventTags: many(eventTags),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
    event: one(events, { fields: [registrations.event_id], references: [events.id] }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    eventTags: many(eventTags),
}));

export const userInfo = pgTable('user_info', {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    accountType: accountTypes('account_type'),
    location: text("location").notNull(),
});

//Select join user and registrations to get all users registered for an event
// db.select().from(users).innerJoin(registrations, users.id.eq(registrations.userId)).where(registrations.eventId.eq(1));

//Select join events and registrations to get all events a user is registered for
// db.select().from(events).innerJoin(registrations, events.id.eq(registrations.eventId)).where(registrations.userId.eq(1));



