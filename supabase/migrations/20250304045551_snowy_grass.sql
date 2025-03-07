/*
  # Create products table

  1. New Tables
    - `products`
      - `_id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text, not null)
      - `price` (numeric, not null)
      - `image` (text array, not null)
      - `category` (text, not null)
      - `subCategory` (text, not null)
      - `sizes` (text array, not null)
      - `bestseller` (boolean, not null)
      - `date` (bigint, not null)
      - `productID` (text, not null)
  2. Security
    - Enable RLS on `products` table
    - Add policy for authenticated users to read all products
    - Add policy for authenticated users to insert their own products
    - Add policy for authenticated users to update their own products
    - Add policy for authenticated users to delete their own products
*/

CREATE TABLE IF NOT EXISTS products (
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