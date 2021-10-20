import { Wp2Storyblok } from './index.js'
import dotenv from 'dotenv'
dotenv.config()

const wp2storyblok = new Wp2Storyblok('https://wp2.storyblok.com/wp-json', {
  token: process.env.STORYBLOK_API_MANAGEMENT, // My Account > Personal access tokens
  space_id: 113181, // Settings
  content_types: [
    {
      name: 'pages', // Name of the post type in WP
      new_content_type: 'page', // Name of the Content Type in Storyblok
      schema_mapping: {
        "date": "first_published_at",
        "title": "name",
        "slug": "slug",
        "_links.wp:featuredmedia.0": "content.featured_image",
        "content": "content.content",
      }
    },
    {
        name: 'categories', // Name of the post type in WP
        new_content_type: 'category', // Name of the Content Type in Storyblok
				schema_mapping: {
            "name": "name",
            "slug": "slug",
            "description": "content.description",
            "parent": "content.parent",
        }
    },
    {
        name: 'posts', // Name of the post type in WP
        new_content_type: 'post', // Name of the Content Type in Storyblok
				folder: 'articles', // Name of the destination folder in Storyblok
        schema_mapping: {
            "date": "first_published_at",
            "title": "name",
            "slug": "slug",
            "_links.wp:featuredmedia.0": "content.featured_image",
            "excerpt": "content.excerpt",
            "content": "content.content",
        }
    }
  ]
})

wp2storyblok.migrate()