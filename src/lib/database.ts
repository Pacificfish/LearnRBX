import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

// Railway PostgreSQL connection (fallback)
const getDatabaseUrl = () => {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
};

// Supabase configuration (primary)
const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  return { url, anonKey, serviceKey };
};

// Create Supabase client (if configured)
export const createSupabaseClient = () => {
  const { url, anonKey } = getSupabaseConfig();
  
  if (url && anonKey) {
    return createClient(url, anonKey);
  }
  
  return null;
};

// Create server-side Supabase client with service role
export const createServerSupabaseClient = () => {
  const { url, serviceKey } = getSupabaseConfig();
  
  if (url && serviceKey) {
    return createClient(url, serviceKey);
  }
  
  return null;
};

// Create direct PostgreSQL connection (for Railway)
export const createPostgresPool = () => {
  const databaseUrl = getDatabaseUrl();
  
  if (databaseUrl) {
    return new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }
  
  return null;
};

// Unified database interface
export class DatabaseClient {
  private supabase: any = null;
  private pool: Pool | null = null;
  
  constructor() {
    this.supabase = createSupabaseClient();
    this.pool = createPostgresPool();
  }
  
  // Use Supabase if available, otherwise fall back to direct PostgreSQL
  async query(text: string, params?: any[]) {
    if (this.supabase) {
      // For Supabase, we'll need to adapt the query format
      // This is a simplified version - you might need to adjust based on your needs
      const { data, error } = await this.supabase.rpc('execute_sql', { 
        query: text, 
        params: params || [] 
      });
      
      if (error) throw error;
      return { rows: data };
    }
    
    if (this.pool) {
      return await this.pool.query(text, params);
    }
    
    throw new Error('No database connection available');
  }
  
  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

// Export the default client
export const db = new DatabaseClient();
