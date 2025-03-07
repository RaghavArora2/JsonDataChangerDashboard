/*
  # Fix products table and policies

  1. Table Modifications
    - Ensure products table exists with all required columns
  
  2. Security
    - Check for existing policies before creating them
    - Add policies for both authenticated and anonymous users to perform CRUD operations
*/

-- First check if the table exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
    -- Create the products table with all required columns
    CREATE TABLE products (
      _id uuid PRIMARY KEY,
      name text NOT NULL,
      description text NOT NULL,
      price numeric NOT NULL,
      image text[] NOT NULL,
      category text NOT NULL,
      subCategory text NOT NULL,
      sizes text[] NOT NULL,
      bestseller boolean NOT NULL DEFAULT false,
      date bigint NOT NULL,
      productID text NOT NULL
    );
    
    -- Enable row level security
    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Check if policies exist before creating them
DO $$ 
BEGIN
  -- Select policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Anyone can read products'
  ) THEN
    CREATE POLICY "Anyone can read products"
      ON products
      FOR SELECT
      USING (true);
  END IF;

  -- Anonymous insert policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Anonymous users can insert products'
  ) THEN
    CREATE POLICY "Anonymous users can insert products"
      ON products
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;

  -- Anonymous update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Anonymous users can update products'
  ) THEN
    CREATE POLICY "Anonymous users can update products"
      ON products
      FOR UPDATE
      TO anon
      USING (true);
  END IF;

  -- Anonymous delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Anonymous users can delete products'
  ) THEN
    CREATE POLICY "Anonymous users can delete products"
      ON products
      FOR DELETE
      TO anon
      USING (true);
  END IF;

  -- Authenticated insert policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Authenticated users can insert products'
  ) THEN
    CREATE POLICY "Authenticated users can insert products"
      ON products
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  -- Authenticated update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Authenticated users can update products'
  ) THEN
    CREATE POLICY "Authenticated users can update products"
      ON products
      FOR UPDATE
      TO authenticated
      USING (true);
  END IF;

  -- Authenticated delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Authenticated users can delete products'
  ) THEN
    CREATE POLICY "Authenticated users can delete products"
      ON products
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;