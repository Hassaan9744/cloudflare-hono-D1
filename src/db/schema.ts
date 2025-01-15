import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const customers = sqliteTable('Customers', {
  Customerid: integer('CustomerId', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  CompanyName: text('CompanyName', { length: 256 }).notNull(), 
  ContactName: text('ContactName', { length: 256 }).notNull()
});