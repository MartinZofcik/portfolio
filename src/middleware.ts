// import createMiddleware from 'next-intl/middleware';
// import { localePrefix, locales } from '@/navigation';
//
// export default createMiddleware({
//   defaultLocale: 'en',
//   localePrefix,
//   locales,
// });
//
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(sk|en)/:path*'],
// };

import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { localePrefix, locales } from '@/navigation';

const publicPages = ['/'];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/api/auth/signin',
    },
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
