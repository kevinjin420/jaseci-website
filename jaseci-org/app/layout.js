import config from "@config/config.json";
import theme from "@config/theme.json";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import Analytics from "./Analytics";
import "../styles/style.scss";

export default function RootLayout({ children }) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const GA_ID = "G-V1KRXTNCWJ";
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { send_page_view: false });
                `,
              }}
            />
          </>
        )}
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />

        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Analytics />
        <Header />
        <main className="">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
