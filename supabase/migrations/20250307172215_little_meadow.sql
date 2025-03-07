/*
  # Fix productid column case issue

  1. Table Modifications
    - Rename productID column to productid (lowercase)
  
  2. Security
    - Preserve existing policies
*/

-- First check if the table exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
    -- Create the products table with correct column name
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
      productid text NOT NULL -- Using lowercase productid
    );
    
    -- Enable row level security
    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  ELSE
    -- If the table exists but has the wrong column name, rename it
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'products' 
      AND column_name = 'productID'
    ) THEN
      ALTER TABLE products RENAME COLUMN "productID" TO productid;
    END IF;
  END IF;
END $$;