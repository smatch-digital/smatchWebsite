import type { CollectionConfig } from 'payload'

import { adminOrHigher, adminPanelAnyAuthenticated, editorOrHigher } from '../access/roles'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    admin: adminPanelAnyAuthenticated, // All roles can see Team in admin
    create: editorOrHigher,            // Editor+ can create
    delete: adminOrHigher,             // Admin+ can delete
    read: () => true,                  // Public read for frontend
    update: editorOrHigher,            // Editor+ can update
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
