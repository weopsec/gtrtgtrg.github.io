/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"BSs49h5yDVhcjoAh","label":"reddit","bookmarks":[{"id":"IVsz8y3dYVj0Au2K","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"JJMGhR7uSD78JUuU","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"VhtGYOUCtMEPbemE","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"4p30PXXAp5qDhLL2","label":"design tools","bookmarks":[{"id":"DBPJzpwNR2seoKgc","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"gQ13a4jdLtkkyHOd","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"OtOfUn1PBrqha5ta","label":"haikei","url":"https://app.haikei.app/"},{"id":"noxgGArp5FMtYLxm","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"wKGaeRNsd9wLuQuN","label":"worth reading","bookmarks":[{"id":"FCdlYHSrzrAKaevo","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"hWP3NciXu53jYEIm","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"7g8RlSw3qIwBiA7K","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"FjXoTpd9E4d9Da6n","label":"sources","bookmarks":[{"id":"sktcmFQMeaHrZSe6","label":"icons","url":"https://feathericons.com/"},{"id":"Z7n5h7fTtz37E6Rp","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"IW1dO8GB0qUVuIrX","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"KQ9X6coGETkjkUpF","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
