/*
  # Fix subcategory column case issue

  1. Table Modifications
    - Rename subCategory column to subcategory (lowercase)
  
  2. Security
    - Preserve existing policies
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'subCategory'
  ) THEN
    ALTER TABLE products RENAME COLUMN "subCategory" TO subcategory;
  END IF;
END $$;