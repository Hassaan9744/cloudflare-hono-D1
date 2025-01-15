import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

import { customers } from './db/schema';

export type Env = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Env }>();
api
  .get('/customers', async (c) => {
    console.log('get customers')
    const db = drizzle(c.env.DB);
    const result = await db.select().from(customers).all();
    return c.json(result);
  })
  .get('/customers/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const id = Number(c.req.param('id'));
    const result = await db.select().from(customers).where(eq(customers.Customerid, id));
    return c.json(result);
  })
  .post('/customers', async (c) => {
    const db = drizzle(c.env.DB);
    const {CompanyName, ContactName } = await c.req.json();
    const result = await db
      .insert(customers)
      .values({ CompanyName, ContactName })
      .returning();
    return c.json(result);
  })
  .delete('/customers/:id', async (c) => {
    const db = drizzle(c.env.DB);    
    const id = Number(c.req.param('id'));
    const result = await db.delete(customers).where(eq(customers.Customerid, id));
    return c.json(result);
  }).put('/customers/:id', async (c) => {
    const db = drizzle(c.env.DB);    
    const id = Number(c.req.param('id'));
    const {CompanyName, ContactName} = await c.req.json();
    const result = await db
      .update(customers)
      .set({ CompanyName, ContactName })
      .where(eq(customers.Customerid, id))
      .returning();
    return c.json(result);    
  });

const app = new Hono();
app.route('/', api);

export default app;