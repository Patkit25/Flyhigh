import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Trip = Database['public']['Tables']['trips']['Row'];
type Destination = Database['public']['Tables']['destinations']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

export const api = {
  profiles: {
    get: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      if (error) throw error;
      return data;
    },
    update: async (profile: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', supabase.auth.getUser().then(({ data }) => data.user?.id))
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },
  
  trips: {
    list: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          destination:destinations(*),
          activities:trip_activities(*),
          accommodations:trip_accommodations(*)
        `)
        .order('start_date', { ascending: true });
      if (error) throw error;
      return data;
    },
    
    get: async (id: string) => {
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          destination:destinations(*),
          activities:trip_activities(*),
          accommodations:trip_accommodations(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    
    create: async (trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('trips')
        .insert(trip)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (id: string, trip: Partial<Trip>) => {
      const { data, error } = await supabase
        .from('trips')
        .update(trip)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    delete: async (id: string) => {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },
  
  destinations: {
    list: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*, reviews(*)');
      if (error) throw error;
      return data;
    },
    
    get: async (id: string) => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*, reviews(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  },
  
  reviews: {
    create: async (review: Omit<Review, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (id: string, review: Partial<Review>) => {
      const { data, error } = await supabase
        .from('reviews')
        .update(review)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    delete: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  }
};