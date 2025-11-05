// import { QuartzEmitterPlugin } from "../types"
// import { write } from "./helpers"
// import { FullSlug, joinSegments } from "../../util/path"

// export const FeatsIndex: QuartzEmitterPlugin = () => {
//   return {
//     name: "FeatsIndex",
//     async *emit(ctx, content) {
//       const feats = content
//         .filter(([_, file]) => file.data.slug?.startsWith("feats/all-feats/") && !file.data.slug?.startsWith("feats/all-feats/index")) // только заметки из папки feats/
//         .map(([_, file]) => {
//           return {
//             slug: file.data.slug as FullSlug,
//             title: file.data.frontmatter?.title ?? file.data.slug,
//             source: file.data.frontmatter?.source ?? "nodata",
//             rarity: file.data.frontmatter?.rarity ?? "nodata",
//             action: file.data.frontmatter?.action ?? "—",
//             level: file.data.frontmatter?.level ?? -100,
//             traits: file.data.frontmatter?.traits ?? [],
//             prerequisite: file.data.frontmatter?.prerequisite ?? "",
//             summary: file.data.frontmatter?.summary ?? "",
//             link: "/" + file.data.slug,
//           }
//         })

//       const fp = joinSegments("static", "feats") as FullSlug

//       yield write({
//         ctx,
//         content: JSON.stringify(feats, null, 2),
//         slug: fp,
//         ext: ".json",
//       })
//     },
//   }
// }
