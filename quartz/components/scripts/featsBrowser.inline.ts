document.addEventListener("nav", async () => {
  const res = await fetch("/static/feats.json")
  const feats = await res.json()

  const searchInput = document.getElementById("filter-search") as HTMLInputElement | null
  const levelMinInput = document.getElementById("filter-level-min") as HTMLInputElement | null
  const levelMaxInput = document.getElementById("filter-level-max") as HTMLInputElement | null
  const sourcesDiv = document.getElementById("filter-sources") as HTMLDivElement | null
  const traitsDiv = document.getElementById("filter-traits") as HTMLDivElement | null
  const actionsDiv = document.getElementById("filter-actions") as HTMLDivElement | null
  const list = document.getElementById("feats-list") as HTMLDivElement | null
  const count = document.getElementById("feats-count") as HTMLParagraphElement | null

  if (!searchInput || !levelMinInput || !levelMaxInput || !sourcesDiv || !traitsDiv || !actionsDiv || !list) return

  const traitsRes = await fetch("/static/traits.json")
  const traitTranslations: Record<string, string> = await traitsRes.json()


  // кнопка загрузки
  const loadMoreBtn = document.createElement("button")
  loadMoreBtn.textContent = "Загрузить ещё"
  loadMoreBtn.style.display = "none"
  loadMoreBtn.className = "load-more"
  list.after(loadMoreBtn)

  // состояния кнопок
  const sourceStates: Record<string, "neutral" | "include" | "exclude"> = {}
  const traitStates: Record<string, "neutral" | "include" | "exclude"> = {}
  const actionStates: Record<string, "neutral" | "include" | "exclude"> = {}

  function createToggleButton(name: string, states: Record<string, string>) {
    const btn = document.createElement("button")
    btn.dataset.state = "neutral"
    btn.textContent = `⚪ ${traitTranslations[name] ?? name}`

    btn.addEventListener("click", () => {
      if (btn.dataset.state === "neutral") {
        btn.dataset.state = "include"
        btn.textContent = `🟢 ${traitTranslations[name] ?? name}`
      } else if (btn.dataset.state === "include") {
        btn.dataset.state = "exclude"
        btn.textContent = `🔴 ${traitTranslations[name] ?? name}`
      } else {
        btn.dataset.state = "neutral"
        btn.textContent = `⚪ ${traitTranslations[name] ?? name}`
      }
      states[name] = btn.dataset.state as any
      render()
    })

    return btn
  }

  // уникальные значения
  const sources = [...new Set(feats.map(f => f.source))].sort()
  const traits = [...new Set(feats.flatMap(f => f.traits))].sort()
  const actions = [...new Set(feats.map(f => f.action))].sort()

  sources.forEach(s => {
    sourceStates[s] = "neutral"
    sourcesDiv.appendChild(createToggleButton(s, sourceStates))
  })
  traits.forEach(t => {
    traitStates[t] = "neutral"
    traitsDiv.appendChild(createToggleButton(t, traitStates))
  })
  actions.forEach(a => {
    actionStates[a] = "neutral"
    actionsDiv.appendChild(createToggleButton(a, actionStates))
  })

  let visibleCount = 50  // сколько строк показывать

  function render() {
    const query = searchInput.value.toLowerCase()
    const levelMin = levelMinInput.value ? Number(levelMinInput.value) : null
    const levelMax = levelMaxInput.value ? Number(levelMaxInput.value) : null

    const includesSources = Object.keys(sourceStates).filter(k => sourceStates[k] === "include")
    const excludesSources = Object.keys(sourceStates).filter(k => sourceStates[k] === "exclude")
    const includesTraits = Object.keys(traitStates).filter(k => traitStates[k] === "include")
    const excludesTraits = Object.keys(traitStates).filter(k => traitStates[k] === "exclude")
    const includesActions = Object.keys(actionStates).filter(k => actionStates[k] === "include")
    const excludesActions = Object.keys(actionStates).filter(k => actionStates[k] === "exclude")

    // фильтрация по всем
    const filtered = feats.filter(f =>
      (!query || f.title.toLowerCase().includes(query)) &&
      (!levelMin || f.level >= levelMin) &&
      (!levelMax || f.level <= levelMax) &&
      (includesSources.length === 0 || includesSources.includes(f.source)) &&
      !excludesSources.includes(f.source) &&
      (includesTraits.length === 0 || includesTraits.some(t => f.traits.includes(t))) &&
      excludesTraits.every(t => !f.traits.includes(t)) &&
      (includesActions.length === 0 || includesActions.includes(f.action)) &&
      !excludesActions.includes(f.action)
    )

    // очистка таблицы
    list.innerHTML = ""

    // таблица
    const table = document.createElement("table")
    table.className = "feats-table"
    table.innerHTML = `
      <thead>
        <tr>
          <th>Название</th>
          <th>Источник</th>
          <th>Редкость</th>
          <th>Признак</th>
          <th>Уровень</th>
          <th>Требования</th>
          <th>Краткое описание</th>
        </tr>
      </thead>
      <tbody></tbody>
    `
    const tbody = table.querySelector("tbody")!

    const rarityTranslations: Record<string, string> = {
      common: "Обычный",
      uncommon: "Необычный",
      rare: "Редкий",
      unique: "Уникальный"
    }


    const slice = filtered.slice(0, visibleCount)
    slice.forEach(f => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td><a class="internal" href="..${f.link}">${f.title}</a></td>
        <td>${f.source ?? ""}</td>
        <td>${rarityTranslations[f.rarity.toLowerCase()] ?? "nodata"}</td>
        <td>${(f.traits ?? [])
          .map(t => {
            const slug = t.toLowerCase()
            const display = traitTranslations[slug] ?? t // если нет перевода, оставить как есть
            return `<a class="internal" href="/rules/traits/${slug}">${display}</a>`
          }) 
          .join(", ")}
        </td>
        <td>${f.level ?? ""}</td>
        <td>${f.prerequisite ?? ""}</td>
        <td>${f.summary ?? ""}</td>
      `
      tbody.appendChild(tr)
    })

    list.appendChild(table)
    if (count) count.textContent = `Найдено: ${filtered.length}`

    // показывать или скрывать кнопку
    loadMoreBtn.style.display = visibleCount < filtered.length ? "block" : "none"
  }

  // обработчик для кнопки
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 50
    render()
  })

  searchInput.addEventListener("input", () => {
    visibleCount = 50 // при новом поиске сбрасываем
    render()
  })
  levelMinInput.addEventListener("input", () => {
    visibleCount = 50
    render()
  })
  levelMaxInput.addEventListener("input", () => {
    visibleCount = 50
    render()
  })

  render()

  const header = document.querySelector("article")
  const featsBrowser = document.getElementById("feats-browser")
  if (header && featsBrowser) {
    header.insertAdjacentElement("afterend", featsBrowser)
  }
})
