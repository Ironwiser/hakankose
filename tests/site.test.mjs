import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile, access } from "node:fs/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { build } from "esbuild";
import { readLanguage, translate } from "../src/translations.js";

const result = await build({
  entryPoints: ["src/App.jsx"],
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  external: ["react", "react-dom", "react-dom/*"],
  loader: { ".css": "empty" },
  plugins: [
    {
      name: "require-complete-translations",
      setup(build) {
        build.onLoad({ filter: /App\.jsx$/ }, async ({ path }) => ({
          contents: (await readFile(path, "utf8")).replace(
            "const [activeService, setActiveService] = useState(0);",
            "const [activeService, setActiveService] = useState(globalThis.testServiceIndex ?? 0);",
          ),
          loader: "jsx",
        }));
        build.onLoad({ filter: /translations\.js$/ }, async ({ path }) => ({
          contents: (await readFile(path, "utf8")).replace(
            "export function translate(key, language) {",
            `export function translate(key, language) {
        if (language !== 'tr' && !translations[key]?.[language]) throw new Error('Missing translation: '+key);
      `,
          ),
          loader: "js",
        }));
      },
    },
  ],
});
const compiled = { exports: {} };
new Function("require", "module", "exports", result.outputFiles[0].text)(
  createRequire(import.meta.url),
  compiled,
  compiled.exports,
);

for (const language of ["tr", "de", "en"])
 for (const serviceIndex of [0, 1, 2, 3])
  test(`${language}: service ${serviceIndex + 1}, contact, footer and navigation`, async () => {
    globalThis.testServiceIndex = serviceIndex;
    globalThis.localStorage = { getItem: () => language };
    const html = renderToStaticMarkup(
      React.createElement(compiled.exports.default),
    );
    assert.ok(html.includes(translate("Hizmet kapsamı", language)));
    if (language !== "tr") assert.ok(!html.includes("Hizmet kapsamı"));
    const ids = [...html.matchAll(/<section[^>]+id="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(ids, [
      "hizmetler",
      "is-ortaklari",
      "neden-biz",
      "surec",
      "hakkimizda",
      "iletisim",
    ]);
    const footer = html.split("<footer")[1];
    const contact = html.split('id="iletisim"')[1].split('</section>')[0];
    for (const text of [
      "Bernburger Str. 32",
      "10963 Berlin",
      "tel:+493042802636",
      "mailto:info@koese-uvw.de",
      "mailto:lohn@koese-uvw.de",
    ])
      assert.ok(contact.includes(text), text);
    for (const text of ["14/391/00508", "DE321053398"])
      assert.ok(footer.includes(text), text);
    const expectedItem = ["Yıl sonu kapanışının hazırlanmasına destek", "Aylık ücret ve maaş bordroları", "İş planı ve finansal planlama", "İşletme analizleri"][serviceIndex];
    assert.ok(html.includes(translate(expectedItem, language)));
    assert.ok(html.includes(`aria-labelledby="service-tab-${serviceIndex}"`));
    for (const match of html.matchAll(/<img[^>]+src="(\/[^\"]+)"/g))
      await access(`public${match[1]}`);
    assert.ok(
      html.includes(
        translate(
          "Vergi hukuku danışmanlığı ve hukuki temsil ilgili avukat tarafından sağlanır.",
          language,
        ),
      ),
    );
    assert.ok(
      html.includes(
        translate(
          "Sigorta danışmanlığı ve aracılık hizmeti ilgili sigorta brokeri tarafından sağlanır.",
          language,
        ),
      ),
    );
  });
test("Unavailable and invalid language storage falls back to Turkish", () => {
  globalThis.localStorage = { getItem: () => "fr" };
  assert.equal(readLanguage(), "tr");
  globalThis.localStorage = {
    getItem: () => {
      throw Error("blocked");
    },
  };
  assert.equal(readLanguage(), "tr");
  delete globalThis.localStorage;
});
