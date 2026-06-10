import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),

	// FIXED: Changed to a function to access the native v6 image optimizer
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),

		// FIXED: Uses image() instead of z.string() to safely resolve relative paths
		heroImage: image().optional(),

		category: z.enum(['Articles', 'Company News']).optional().default('Articles'),
	}),
});

export const collections = { blog };