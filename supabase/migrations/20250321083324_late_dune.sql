/*
  # Add flagged column to projects table

  1. Changes
    - Add `flagged` boolean column to projects table with default value of false
  
  2. Security
    - No changes to RLS policies needed as this is just adding a column
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'flagged'
  ) THEN
    ALTER TABLE projects ADD COLUMN flagged boolean NOT NULL DEFAULT false;
  END IF;
END $$;