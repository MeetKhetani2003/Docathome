/**
 * Server-rendered JSON-LD. Pass one or more schema objects; nothing is
 * hydrated on the client and no fake ratings or addresses are included.
 */
export function JsonLd({ schemas }: { schemas: Array<Record<string, unknown> | undefined> }) {
  const list = schemas.filter(Boolean) as Array<Record<string, unknown>>;
  return (
    <>
      {list.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
