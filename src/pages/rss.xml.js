import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const siteUrl = context.site?.toString().replace(/\/$/, '') ?? 'https://blog.haveaspot.com';

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sorted.map((post) => {
			const imageSrc = post.data.heroImage?.src ?? null;
			const imageUrl = imageSrc ? `${siteUrl}${imageSrc.startsWith('/') ? '' : '/'}${imageSrc}` : null;

			const customParts = [];
			if (post.data.category) customParts.push(`<hasCategory>${post.data.category}</hasCategory>`);
			if (imageUrl) customParts.push(`<hasHeroImage>${imageUrl}</hasHeroImage>`);

			return {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}/`,
				customData: customParts.join(''),
			};
		}),
	});
}
