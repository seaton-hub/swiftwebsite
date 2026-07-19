/* Emits a JSON-LD block. Server-rendered into the static HTML, so crawlers see
   it without executing any JavaScript.

   The content is our own build-time constants — never user input — so
   dangerouslySetInnerHTML carries no injection risk here. `<` is escaped
   anyway, which is the one sequence that could close the script tag early. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
