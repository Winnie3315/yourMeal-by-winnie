// import { NextResponse } from "next/server";
// import type { NextRequest, NextFetchEvent } from "next/server";

// import { i18n } from "@/i18n.config";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// function getLocale(request: NextRequest): string | undefined {
// 	const negotiatorHeaders: Record<string, string> = {};
// 	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

// 	const locales: string[] = i18n.locales as unknown as string[];
// 	const languages = new Negotiator({
// 		headers: negotiatorHeaders,
// 	}).languages();

// 	const locale = matchLocale(languages, locales, i18n.defaultLocale);
// 	return locale;
// }

// export default async function mainMiddleware(request: NextRequest, event: NextFetchEvent) {
// 	const clerkResponse = await clerkMiddleware()(request, event);
// 	if (clerkResponse) return clerkResponse;

// 	const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

// 	clerkMiddleware(async (auth, req) => {
// 	  if (!(await auth()).userId && isProtectedRoute(req)){
// 		return NextResponse.redirect(new URL("/login", req.url))
// 	  }
// 	})

// 	const pathname = request.nextUrl.pathname;
// 	const pathnameIsMissingLocale = i18n.locales.every(
// 		(locale) =>
// 			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
// 	);

// 	if (
// 		pathnameIsMissingLocale &&
// 		pathname !== "/robots.txt" &&
// 		pathname !== "/sitemap.xml"
// 	) {
// 		const locale = getLocale(request);
// 		return NextResponse.redirect(
// 			new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
// 		);
// 	}
// }

// export const config = {
// 	matcher: [
// 		"/((?!api|_next/static|_next/image|icon.png|images|icons).*)",
// 		"/(api|trpc)(.*)",
// 	],
// };
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

import { i18n } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	const locales: string[] = i18n.locales as unknown as string[];
	const languages = new Negotiator({
		headers: negotiatorHeaders,
	}).languages();

	const locale = matchLocale(languages, locales, i18n.defaultLocale);
	return locale;
}

export default async function mainMiddleware(request: NextRequest, event: NextFetchEvent) {
	const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

	const clerkResponse = await clerkMiddleware(async (auth, req) => {
		// Проверка защищённого маршрута
		if (isProtectedRoute(req) && !(await auth()).userId) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	})(request, event);

	if (clerkResponse) return clerkResponse;

	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	// Логика для редиректа на URL с локалью
	if (
		pathnameIsMissingLocale &&
		pathname !== "/robots.txt" &&
		pathname !== "/sitemap.xml"
	) {
		const locale = getLocale(request);
		return NextResponse.redirect(
			new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
		);
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|icon.png|images|icons).*)",
		"/(api|trpc)(.*)",
	],
};
