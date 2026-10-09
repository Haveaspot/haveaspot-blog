import { SITE_URL, PLATFORM_URL, SITE_NAME, CONTACT_EMAIL, SOCIAL_LINKS } from "../consts";

const ORG_ID = `${PLATFORM_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
	"@type": "Organization",
	"@id": ORG_ID,
	name: SITE_NAME,
	url: PLATFORM_URL,
	logo: `${SITE_URL}/logo.png`,
	description:
		"Haveaspot is an online booking platform for community venues such as village halls, schools, sports clubs and arts spaces in the UK. Venues list for free and take no commission; bookers pay a small booking fee.",
	email: CONTACT_EMAIL,
	areaServed: { "@type": "Country", name: "United Kingdom" },
	sameAs: SOCIAL_LINKS,
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "customer support",
		email: CONTACT_EMAIL,
		availableLanguage: "English",
	},
};

export const websiteSchema = {
	"@type": "Blog",
	"@id": SITE_ID,
	url: SITE_URL,
	name: `${SITE_NAME} Blog`,
	description:
		"Advice for village halls and community venues on increasing bookings, plus guides for people hiring a space.",
	publisher: { "@id": ORG_ID },
	inLanguage: "en-GB",
};

export function blogPostingSchema(opts: {
	path: string;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	image?: string;
	category?: string;
}) {
	const url = `${SITE_URL}${opts.path}`;
	return {
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
		url,
		headline: opts.title,
		description: opts.description,
		datePublished: opts.pubDate.toISOString(),
		dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
		...(opts.image ? { image: [new URL(opts.image, SITE_URL).toString()] } : {}),
		...(opts.category ? { articleSection: opts.category } : {}),
		author: { "@id": ORG_ID },
		publisher: { "@id": ORG_ID },
		isPartOf: { "@id": SITE_ID },
		inLanguage: "en-GB",
	};
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: [{ name: "Blog", path: "/" }, ...crumbs].map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.name,
			item: `${SITE_URL}${c.path}`,
		})),
	};
}
