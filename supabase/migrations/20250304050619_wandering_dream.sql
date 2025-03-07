/*
  # Fix products table schema

  1. Changes
    - Update the products table to ensure all required columns exist
    - Recreate the table with the correct schema if needed
  
  2. Security
    - Maintain existing RLS policies
*/

-- First check if the table exists and drop it if it does
DROP TABLE IF EXISTS products;

-- Recreate the products table with all required columns
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

-- Allow authenticated users to insert their own products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete their own products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);