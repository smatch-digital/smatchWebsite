import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { adminOrHigher, adminPanelAnyAuthenticated, editorOrHigher } from '../access/roles'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    admin: adminPanelAnyAuthenticated, // All roles can see Categories in admin
    create: editorOrHigher,            // Editor+ can create
    delete: adminOrHigher,             // Admin+ can delete
    read: anyone,                      // Public read for frontend
    update: editorOrHigher,            // Editor+ can update
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
