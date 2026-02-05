import type { CollectionConfig } from 'payload'

import {
  adminPanelAdminOrHigher,
  canDeleteUser,
  canUpdateUser,
  onlyOwnerCanUpdateRole,
} from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Only Admin+ can see Users in admin sidebar
    admin: adminPanelAdminOrHigher,
    // Only Admin+ can create users
    create: ({ req }) => {
      const user = req.user as { role?: string } | undefined
      return user?.role === 'owner' || user?.role === 'admin'
    },
    // Only Admin+ can view user list
    read: ({ req }) => {
      const user = req.user as { role?: string } | undefined
      return user?.role === 'owner' || user?.role === 'admin'
    },
    // Custom: Owner can edit anyone, Admin can edit non-owners, users can edit self
    update: canUpdateUser,
    // Custom: Owner can delete non-owners, Admin can delete editors/viewers
    delete: canDeleteUser,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        const user = req.user as { role?: string } | undefined

        // Prevent changing owner's role (demotion protection)
        if (originalDoc?.role === 'owner' && data.role && data.role !== 'owner') {
          throw new Error('Cannot demote the Owner account')
        }

        // Prevent non-owners from elevating anyone to owner
        if (data.role === 'owner' && user?.role !== 'owner') {
          throw new Error('Only the Owner can assign the Owner role')
        }

        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        // Fetch the document to check its role before deletion
        const doc = await req.payload.findByID({
          collection: 'users',
          id,
          depth: 0,
        })

        // Prevent deletion of owner accounts
        if (doc?.role === 'owner') {
          throw new Error('Cannot delete the Owner account')
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: '👑 Owner', value: 'owner' },
        { label: '🔧 Admin', value: 'admin' },
        { label: '✏️ Editor', value: 'editor' },
        { label: '👁️ Viewer', value: 'viewer' },
      ],
      // Save to JWT for fast permission checks without DB queries
      saveToJWT: true,
      access: {
        // Only owners can modify roles
        update: onlyOwnerCanUpdateRole,
      },
      admin: {
        position: 'sidebar',
        description: 'User permission level',
      },
    },
  ],
  timestamps: true,
}
