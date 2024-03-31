import { numeric, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core/columns/uuid';
import { sql } from 'drizzle-orm/sql/sql';

export const sizeEnum = pgEnum('size', [
  'very-small',
  'small',
  'medium',
  'large',
  'very-large',
]);

export const plant = pgTable('plant', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  latin_name: text('latin_name').notNull(),
  slovak_name: text('slovak_name'),
  size: sizeEnum('size').notNull(),
  description: text('description'),
  age_months: numeric('age_months'),
});

export type Plant = typeof plant.$inferSelect;
