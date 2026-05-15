import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasourceUrl: process.env.DATABASE_URL ?? "postgresql://postgres.slglzynrmwgllumarhzu:Soufiane2004@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
})
