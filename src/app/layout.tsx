import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Learnify" />
        <title>Learnify</title>
        <link rel="icon" href="/assets/favicon.ico" />
        </head>
      <body>
        {children}
      </body>
    </html>
  );
}

