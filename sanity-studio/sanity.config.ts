import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemaTypes from './schemas/schema'

export default defineConfig({
  projectId: '7r7n8x37',
  dataset: 'production',
  title: 'GES Studio',
  apiVersion: process.env.SANITY_API_VERSION || '2026-07-22',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
})
