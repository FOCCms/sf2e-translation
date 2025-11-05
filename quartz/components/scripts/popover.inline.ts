import { computePosition, flip, inline, shift } from "@floating-ui/dom"
import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

const p = new DOMParser()
let activeAnchor: HTMLAnchorElement | null = null

async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const link = (activeAnchor = this)
  if (link.dataset.noPopover === "true") {
    return
  }

  async function setPosition(popoverElement: HTMLElement) {
    const { x, y } = await computePosition(link, popoverElement, {
      strategy: "fixed",
      middleware: [inline({ x: clientX, y: clientY }), shift(), flip()],
    })
    Object.assign(popoverElement.style, {
      transform: `translate(${x.toFixed()}px, ${y.toFixed()}px)`,
    })
  }

  // function showPopover(popoverElement: HTMLElement) {
  //   clearActivePopover()
  //   popoverElement.classList.add("active-popover")
  //   setPosition(popoverElement as HTMLElement)

  //   if (hash !== "") {
  //     const targetAnchor = `#popover-internal-${hash.slice(1)}`
  //     const heading = popoverInner.querySelector(targetAnchor) as HTMLElement | null
  //     if (heading) {
  //       // leave ~12px of buffer when scrolling to a heading
  //       popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
  //     }
  //   }
  // }

  function showPopover(popoverElement: HTMLElement) {
    // убираем активный класс у старых поповеров
    clearActivePopover()

    // 🧹 удалить все старые поповеры, кроме текущего
    document.querySelectorAll(".popover").forEach((p) => {
      if (p !== popoverElement) p.remove()
    })

    // делаем новый поповер активным
    popoverElement.classList.add("active-popover")

    // позиционируем относительно курсора
    setPosition(popoverElement as HTMLElement)

    // если есть hash — прокручиваем превью до нужного якоря
    if (hash !== "") {
      const targetAnchor = `#popover-internal-${hash.slice(1)}`
      const heading = popoverInner.querySelector(targetAnchor) as HTMLElement | null
      if (heading) {
        // небольшой отступ сверху, чтобы заголовок не прилипал
        popoverInner.scroll({
          top: heading.offsetTop - 12,
          behavior: "instant",
        })
      }
    }
  }


  // const targetUrl = new URL(link.href)
  // const hash = decodeURIComponent(targetUrl.hash)
  // targetUrl.hash = ""
  // targetUrl.search = ""
  // const popoverId = `popover-${link.pathname}`
  // const prevPopoverElement = document.getElementById(popoverId)

const targetUrl = new URL(link.href)
const hash = decodeURIComponent(targetUrl.hash)
targetUrl.search = ""

// включаем hash в ID, если он есть
const anchorPart = hash ? `#${hash.slice(1)}` : ""
const popoverId = `popover-${link.pathname}${anchorPart}`
  .replace(/[^\w-]/g, "_") // безопасно для id
const prevPopoverElement = document.getElementById(popoverId)


  // dont refetch if there's already a popover
  if (!!document.getElementById(popoverId)) {
    showPopover(prevPopoverElement as HTMLElement)
    return
  }

  const response = await fetchCanonical(targetUrl).catch((err) => {
    console.error(err)
  })

  if (!response) return
  const [contentType] = response.headers.get("Content-Type")!.split(";")
  const [contentTypeCategory, typeInfo] = contentType.split("/")

  const popoverElement = document.createElement("div")
  popoverElement.id = popoverId
  popoverElement.classList.add("popover")
  const popoverInner = document.createElement("div")
  popoverInner.classList.add("popover-inner")
  popoverInner.dataset.contentType = contentType ?? undefined
  popoverElement.appendChild(popoverInner)

  switch (contentTypeCategory) {
    case "image":
      const img = document.createElement("img")
      img.src = targetUrl.toString()
      img.alt = targetUrl.pathname

      popoverInner.appendChild(img)
      break
    case "application":
      switch (typeInfo) {
        case "pdf":
          const pdf = document.createElement("iframe")
          pdf.src = targetUrl.toString()
          popoverInner.appendChild(pdf)
          break
        default:
          break
      }
      break
    default:
      const contents = await response.text()
      const html = p.parseFromString(contents, "text/html")
      normalizeRelativeURLs(html, targetUrl)
      // prepend all IDs inside popovers to prevent duplicates
      html.querySelectorAll("[id]").forEach((el) => {
        const targetID = `popover-internal-${el.id}`
        el.id = targetID
      })
      const elts = [...html.getElementsByClassName("popover-hint")]
      if (elts.length === 0) return

      elts.forEach((elt) => popoverInner.appendChild(elt))
  }

  if (!!document.getElementById(popoverId)) {
    return
  }

  document.body.appendChild(popoverElement)
  if (activeAnchor !== this) {
    return
  }

  showPopover(popoverElement)
}

function clearActivePopover() {
  activeAnchor = null
  const allPopoverElements = document.querySelectorAll(".popover")
  allPopoverElements.forEach((popoverElement) => popoverElement.classList.remove("active-popover"))
}

document.addEventListener("nav", () => {
  const links = [...document.querySelectorAll("a.internal")] as HTMLAnchorElement[]
  for (const link of links) {
    link.addEventListener("mouseenter", mouseEnterHandler)
    link.addEventListener("mouseleave", clearActivePopover)
    window.addCleanup(() => {
      link.removeEventListener("mouseenter", mouseEnterHandler)
      link.removeEventListener("mouseleave", clearActivePopover)
    })
  }
})
