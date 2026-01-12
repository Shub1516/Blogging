import NavbarWrapper from "../NavbarWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
