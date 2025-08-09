-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Unknown User',
    username TEXT NOT NULL DEFAULT 'unknown',
    email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some sample user profiles
INSERT INTO public.profiles (id, name, username, email) 
VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'johndoe', 'john@example.com'),
    ('123e4567-e89b-12d3-a456-426614174001', 'Jane Smith', 'janesmith', 'jane@example.com'),
    ('123e4567-e89b-12d3-a456-426614174002', 'Mike Wilson', 'mikewilson', 'mike@example.com')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading profiles
CREATE POLICY IF NOT EXISTS "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

-- Create policy to allow users to update their own profile
CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
