import { Wp2Storyblok } from './index.js'
import dotenv from 'dotenv'
dotenv.config()

const storyblokDefaultFields = {
  date: 'first_published_at',
  title: 'name',
  slug: 'slug',
};

const wp2storyblok = new Wp2Storyblok('https://wp2.storyblok.com/wp-json', {
  token: process.env.STORYBLOK_API_MANAGEMENT, // My Account > Personal access tokens
  space_id: 113181, // Settings
  blocks_mapping: [
    {
      name: 'core/heading',
      new_block_name: 'heading',
      schema_mapping: {
        'attrs.level': 'level',
        'attrs.content': 'content'
      }
    },
    {
      name: 'core/paragraph',
      new_block_name: 'paragraph',
      schema_mapping: {
        'attrs.content': 'content'
      }
    },
    {
      name: 'core/quote',
      new_block_name: 'quote',
      schema_mapping: {
        'attrs.content': 'content'
      }
    },
    {
      name: 'core/image',
      new_block_name: 'image',
      schema_mapping: {
        'attrs.url': 'image'
      }
    }
  ],
  content_types: [
    {
      name: 'pages', // Name of the post type in WP
      new_content_type: 'page', // Name of the Content Type in Storyblok
      folder: '',
      schema_mapping: {
        ...storyblokDefaultFields,
        '_links.wp:featuredmedia.0': 'content.featured_image',
        blocks: 'content.body', // Blocks for using the blocks defined at the top
        // content: 'content.content' The past rich-text
      }
    },
    {
      name: 'categories', // Name of the post type in WP
      new_content_type: 'category', // Name of the Content Type in Storyblok
      schema_mapping: {
        name: 'name',
        slug: 'slug',
        description: 'content.description',
      }
    },
    {
      name: 'posts', // Name of the post type in WP
      new_content_type: 'post', // Name of the Content Type in Storyblok
      folder: 'articles', // Name of the destination folder in Storyblok
      taxonomies: [
        {
          name: 'categories',
          field: 'categories',
          type: ''
        }
      ],
      schema_mapping: {
          ...storyblokDefaultFields,
          '_links.wp:featuredmedia.0': 'content.featured_image',
          excerpt: 'content.excerpt',
          categories: 'content.categories',
          content: 'content.content',
      }
    }
  ],
})

wp2storyblok.migrate()