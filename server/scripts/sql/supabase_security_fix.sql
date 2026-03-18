-- Supabase Security Fix: Enable RLS and add basic policies
-- Run these in the Supabase SQL Editor

-- Enable RLS for all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NGO" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Campaign" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Donation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ImpactUpdate" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FraudReport" ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Adjust as needed)

-- Allow public read access to campaigns
CREATE POLICY "Allow public read for campaigns" ON "Campaign"
FOR SELECT TO anon, authenticated
USING (status = 'APPROVED');

-- Allow NGOs to manage their own campaigns
CREATE POLICY "Allow NGOs to manage their own campaigns" ON "Campaign"
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM "NGO" 
  WHERE "NGO"."id" = "Campaign"."ngoId" 
  AND "NGO"."userId" = auth.uid()::text
));

-- Allow users to see their own profile
CREATE POLICY "Allow users to see their own profile" ON "User"
FOR SELECT TO authenticated
USING (id = auth.uid()::text);

-- Note: Since the backend connects via Prisma as the 'postgres' user, 
-- it will bypass these RLS policies. The warnings in Supabase are 
-- often triggered because RLS is missing, even if you use a custom backend.
-- Enabling them and adding 'deny all' or specific policies for 'anon' and 
-- 'authenticated' roles will clear the security warnings.
