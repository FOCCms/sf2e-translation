import { QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/featsBrowser.inline"
// @ts-ignore
import styles from "./styles/featsBrowser.scss"

function FeatsBrowser() {
  return (
    <div id="feats-browser" class="feats-browser">
      <h2>Фильтр способностей</h2>

      {/* Поиск */}
      <div class="feats-search">
        <input
          autocomplete="off"
          id="filter-search"
          type="text"
          placeholder="🔍 Найти по названию..."
        />
      </div>

      <button id="toggle-filters" class="toggle-filters">Фильтры ↓</button>

      <div id="filters-panel" class="filters collapsed">

        {/* Источник */}
        <div class="filter-block">
          <strong>Источник:</strong>
          <div id="filter-sources" class="button-group"></div>
        </div>

        {/* Уровень */}
        <div class="filter-block">
          <strong>Уровень:</strong>
          <span>
            от <input type="number" id="filter-level-min" /> до{" "}
            <input type="number" id="filter-level-max" />
          </span>
          
        </div>

        {/* Признаки */}
        <div class="filter-block">
          <strong>Признаки:</strong>
          <div id="filter-traits" class="button-group"></div>
        </div>

        {/* Действия */}
        <div class="filter-block">
          <strong>Действия:</strong>
          <div id="filter-actions" class="button-group"></div>
        </div>
      </div>

      <p id="feats-count"></p>
      <div id="feats-list"></div>
    </div>
  )
}

FeatsBrowser.afterDOMLoaded = script + `

  // Accordion logic
  document.addEventListener("nav", () => {
    const btn = document.getElementById("toggle-filters")
    const panel = document.getElementById("filters-panel")

    if (btn && panel) {
      btn.addEventListener("click", () => {
        panel.classList.toggle("collapsed")
        btn.textContent = panel.classList.contains("collapsed")
          ? "Фильтры ↓"
          : "Фильтры ↑"
      })
    }
  })
`

FeatsBrowser.css = styles
export default (() => FeatsBrowser) satisfies QuartzComponentConstructor
