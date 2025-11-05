import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.Graph({isLargeGraph:true}),
      condition: (page) => page.fileData.slug === "graph",
    }),
    Component.Backlinks(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/FOCCms/sf2e-translation",
    },
  }),
}

function explorerSortFn(a: FileTrieNode, b: FileTrieNode): number {
 if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.slug.localeCompare(b.slug, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  if (!a.isFolder && b.isFolder) {
    return 1
  } else {
    return -1
  }
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.ArticleTitle(),
    // Component.ContentMeta(),
    // Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: explorerSortFn
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Graph()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(),
    // , Component.ArticleTitle(), Component.ContentMeta()
    // Component.ConditionalRender({
    //   component: Component.FeatsBrowser(),
    //   condition: (page) => page.fileData.slug === "feats/index",
    // })
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: explorerSortFn
    }),
  ],
  right: [],
}
