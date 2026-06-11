import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_.]*{md,mdx}', base: "./src/content/blog" }),

	// AMENDED: Changed schema to a function so we can extract the native `image` helper
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),

		// AMENDED: Swapped z.string() out for image() to automatically resolve local filepaths
		heroImage: image().optional(),

		readTime: z.string().optional(),
		category: z.enum(['Articles', 'Company News', 'Guides for Bookers', 'Guides for Venues']).optional(),
	}),
});

export const collections = { blog };