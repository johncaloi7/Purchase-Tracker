import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import Error, { links as errorStyles } from "./components/util/Error";

function Document({ children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />

        {!disableJS && <Scripts />}
        {/* <Scripts /> */}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <main>
          <Error title={error.statusText}>
            <p>{error.data?.message || "Something went wrong."}</p>
            <p>
              Back to <Link to="/">home</Link>.
            </p>
          </Error>
        </main>
      </Document>
    );
  }

  let errorMessage = "Something went wrong! Please try again later.";
  return (
    <Document>
      <main>
        <Error title={"Oh no.... It's on us."}>
          <p>{errorMessage}</p>
          <p>
            Go back to <Link to="/">home</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...errorStyles(),
];
