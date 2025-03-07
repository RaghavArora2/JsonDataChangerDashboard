/*
  # Fix products table schema

  1. Changes
     - Recreate products table with correct schema
     - Ensure productID column exists
     - Set up proper RLS policies
*/

-- Drop the table if it exists to ensure a clean slate
DROP TABLE IF EXISTS products;

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

-- Allow anyone to read all products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow anonymous users to insert, update, and delete products (for demo purposes)
CREATE POLICY "Anonymous users can insert products"
  ON products
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can update products"
  ON products
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can delete products"
  ON products
  FOR DELETE
  TO anon
  USING (true);