import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug, joinSegments } from "../../util/path"

export const TraitsIndex: QuartzEmitterPlugin = () => {
  return {
    name: "TraitsIndex",
    async *emit(ctx, content) {
      const traits = content
        .filter(([_, file]) => file.data.slug?.startsWith("rules/traits/") && !file.data.slug?.endsWith("index"))
        .map(([_, file]) => {
          const slug = file.data.slug?.split("/").pop() ?? "unknown"
          return {
            slug, // имя файла без пути
            title: file.data.frontmatter?.title ?? slug, // перевод
          }
        })

      const fp = joinSegments("static", "traits") as FullSlug

      yield write({
        ctx,
        content: JSON.stringify(Object.fromEntries(traits.map(t => [t.slug, t.title])), null, 2),
        slug: fp,
        ext: ".json",
      })
    },
  }
}
