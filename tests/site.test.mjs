import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
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
  test(`${language}: complete page, service details, footer and navigation`, () => {
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
    for (const text of [
      "Bernburger Str. 32",
      "10963 Berlin",
      "tel:+493042802636",
      "mailto:info@koese-uvw.de",
      "mailto:lohn@koese-uvw.de",
      "14/391/00508",
      "DE321053398",
    ])
      assert.ok(footer.includes(text), text);
    assert.ok(html.includes(translate("İşletme planlaması", language)));
    assert.ok(html.includes(translate("Likidite planlaması", language)));
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
