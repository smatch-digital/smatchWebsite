import type { CollectionConfig } from 'payload'
import { createRAGAfterChangeHook, createRAGAfterDeleteHook } from '@/hooks/ragSync'
import { adminOrHigher, adminPanelAnyAuthenticated, editorOrHigher } from '@/access/roles'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projet / Événement',
    plural: 'Projets & Événements',
  },
  access: {
    admin: adminPanelAnyAuthenticated, // All roles can see Projects in admin
    create: editorOrHigher,       // Editor+ can create
    delete: adminOrHigher,        // Admin+ can delete
    read: () => true,             // Public read access for frontend
    update: editorOrHigher,       // Editor+ can update
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'date'],
  },
  hooks: {
    afterChange: [createRAGAfterChangeHook('projects')],
    afterDelete: [createRAGAfterDeleteHook('projects')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (e.g., "tech-summit-2024")',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      defaultValue: 'project',
      options: [
        { label: 'Projet', value: 'project' },
        { label: 'Événement', value: 'event' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      required: true,
      defaultValue: 'completed',
      options: [
        { label: '🔴 Bientôt (Coming Soon)', value: 'upcoming' },
        { label: '✅ Terminé', value: 'completed' },
        { label: '📦 Archivé', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu Principal',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              localized: true,
              admin: {
                description: 'Description courte affichée sur la carte',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                description: 'Image principale de la carte',
              },
            },
          ],
        },
        {
          label: 'Métadonnées',
          fields: [
            {
              name: 'location',
              type: 'text',
              label: 'Lieu',
              localized: true,
              admin: {
                description: 'Ex: "Paris, France"',
              },
            },
            {
              name: 'code',
              type: 'text',
              label: 'Code',
              admin: {
                description: 'Identifiant unique. Ex: "SUMMIT_34", "AGRI_TECH"',
              },
            },
            {
              name: 'metadata',
              type: 'array',
              label: 'Informations Additionnelles',
              admin: {
                description: 'Ajoutez des informations comme "ACCESS: PUBLIC", "PARTICIPANTS: 1200+", "RELEASE: STABLE"',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      type: 'text',
                      label: 'Icône (optionnel)',
                      admin: {
                        width: '20%',
                        description: 'Phosphor icon name',
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                      required: true,
                      admin: {
                        width: '40%',
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Valeur',
                      required: true,
                      admin: {
                        width: '40%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Lien / CTA',
          fields: [
            {
              name: 'linkLabel',
              type: 'text',
              label: 'Texte du Bouton',
              localized: true,
              defaultValue: 'Voir les détails',
              admin: {
                description: 'Ex: "S\'INSCRIRE", "VOIR LE RÉCAP", "Voir le changelog"',
              },
            },
            {
              name: 'externalLink',
              type: 'checkbox',
              label: 'Lien externe?',
              defaultValue: false,
              admin: {
                description: 'Cochez si le bouton doit rediriger vers une URL externe',
              },
            },
            {
              name: 'linkUrl',
              type: 'text',
              label: 'URL Externe',
              admin: {
                condition: (_, siblingData) => siblingData.externalLink,
                description: 'URL complète (ex: https://example.com)',
              },
            },
          ],
        },
        {
          label: 'Contenu Détaillé',
          fields: [
            {
              name: 'fullDescription',
              type: 'richText',
              label: 'Description Complète',
              localized: true,
              admin: {
                description: 'Contenu affiché sur la page de détail',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galerie',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Légende',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
