import type { CollectionConfig } from 'payload'
import { createRAGAfterChangeHook, createRAGAfterDeleteHook } from '@/hooks/ragSync'

import { adminOrHigher, adminPanelAnyAuthenticated, editorOrHigher } from '../../access/roles'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { About } from '../../blocks/About/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { Ecosystem } from '../../blocks/Ecosystem/config'
import { FormBlock } from '../../blocks/Form/config'
import { Domains } from '@/blocks/Domains/config'
import { MissionVision } from '../../blocks/MissionVision/config'
import { HistoryTimeline } from '../../blocks/HistoryTimeline/config'
import { Team } from '../../blocks/Team/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { SmartGrid } from '@/blocks/SmartGrid/config'
import { TrustedBy } from '@/blocks/TrustedBy/config'
import { ActivityTimeline } from '@/blocks/ActivityTimeline/config'
import { Intro } from '@/blocks/Intro/config'
import { Journal } from '@/blocks/Journal/config'
import { ContactBlock } from '@/blocks/Contact/config'
import { ExpertiseDomains } from '@/blocks/ExpertiseDomains/config'
import { SolutionsArchive } from '@/blocks/SolutionsArchive/config'
import { AnnouncementSubscription } from '@/blocks/AnnouncementSubscription/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    admin: adminPanelAnyAuthenticated, // All roles can see Pages in admin
    create: editorOrHigher,       // Editor+ can create
    delete: adminOrHigher,        // Admin+ can delete
    read: authenticatedOrPublished,
    update: editorOrHigher,       // Editor+ can update
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>`
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                About,
                Ecosystem,
                Domains,
                MissionVision,
                HistoryTimeline,
                Team,
                SmartGrid,
                TrustedBy,
                ActivityTimeline,
                Intro,
                Journal,
                ContactBlock,
                ExpertiseDomains,
                SolutionsArchive,
                AnnouncementSubscription,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage, createRAGAfterChangeHook('pages')],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete, createRAGAfterDeleteHook('pages')],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
