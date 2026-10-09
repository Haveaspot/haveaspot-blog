import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, CONTACT_EMAIL } from "../consts";

export const GET: APIRoute = async () => {
	const posts = (await getCollection("blog")).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const byCategory = new Map<string, typeof posts>();
	for (const p of posts) {
		const c = p.data.category ?? "Articles";
		byCategory.set(c, [...(byCategory.get(c) ?? []), p]);
	}
	const sections = [...byCategory.entries()]
		.map(([c, items]) => `## ${c}\n` + items.map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}/): ${p.data.description}`).join("\n"))
		.join("\n\n");
	const body = `# Haveaspot Blog

> Advice for village halls and community venues on increasing bookings, plus guides for people hiring a space, from Haveaspot, a UK online booking platform for community venues (free for venues, no commission, bookers pay a small booking fee). Strapline: "Book a spot, support a spot."

Contact: ${CONTACT_EMAIL}. Main platform: https://haveaspot.com. About: https://about.haveaspot.com. Support: https://support.haveaspot.com.

${sections}

## Optional
- [Full article text for LLMs](${SITE_URL}/llms-full.txt)
- [RSS feed](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap-index.xml)
`;
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
