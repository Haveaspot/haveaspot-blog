import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL } from "../consts";

export const GET: APIRoute = async () => {
	const posts = (await getCollection("blog")).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const parts = posts.map(
		(p) =>
			`# ${p.data.title}\nURL: ${SITE_URL}/blog/${p.id}/\nPublished: ${p.data.pubDate.toISOString().slice(0, 10)}${p.data.category ? `\nCategory: ${p.data.category}` : ""}\n\n${(p.body ?? "").replace(/^import .*$/gm, "").trim()}`,
	);
	return new Response(`# Haveaspot Blog: full article text\n\n${parts.join("\n\n---\n\n")}\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
