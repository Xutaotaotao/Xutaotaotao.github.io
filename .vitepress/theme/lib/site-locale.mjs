const localePrefix = '/en/'

export function getLocaleFromPath(pathname) {
  return pathname === '/en' || pathname.startsWith(localePrefix) ? 'en' : 'zh'
}

export function getSystemLocale() {
  if (typeof navigator === 'undefined') {
    return 'zh'
  }

  const languages = [navigator.language, ...(navigator.languages ?? [])]

  for (const language of languages) {
    const code = (language || '').toLowerCase()

    if (code.startsWith('zh')) {
      return 'zh'
    }

    if (code.startsWith('en')) {
      return 'en'
    }
  }

  return 'zh'
}

export function getSavedLocale() {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const saved = localStorage.getItem('taotao-lang')

  return saved === 'en' || saved === 'zh' ? saved : null
}

export function getPreferredLocale() {
  return getSavedLocale() ?? getSystemLocale()
}

export function getLocaleRedirectTarget(pathname, preferredLocale) {
  const pathLocale = getLocaleFromPath(pathname)

  if (pathLocale === preferredLocale) {
    return null
  }

  return withLocale(stripLocalePrefix(pathname), preferredLocale)
}

export function redirectToPreferredLocale(pathname = typeof location !== 'undefined' ? location.pathname : '/') {
  if (typeof window === 'undefined') {
    return false
  }

  const preferred = getPreferredLocale()
  const target = getLocaleRedirectTarget(pathname, preferred)

  if (!target) {
    document.documentElement.dataset.lang = preferred
    return false
  }

  const normalizedCurrent = pathname.replace(/index\.html$/, '').replace(/\.html$/, '/') || '/'
  const normalizedTarget = target.replace(/index\.html$/, '').replace(/\.html$/, '/') || '/'

  if (normalizedCurrent === normalizedTarget) {
    document.documentElement.dataset.lang = preferred
    return false
  }

  window.location.replace(`${target}${window.location.search}${window.location.hash}`)
  return true
}

export function stripLocalePrefix(pathname) {
  const stripped = pathname.startsWith(localePrefix) ? pathname.slice('/en'.length) || '/' : pathname

  if (stripped === '/') {
    return stripped
  }

  return stripped.replace(/index\.html$/, '').replace(/\.html$/, '/')
}

export function withLocale(pathname, locale) {
  const normalized = stripLocalePrefix(pathname).replace(/\.html$/, '/')

  if (locale === 'en') {
    if (normalized === '/') return '/en/'
    return `/en${normalized}`
  }

  return normalized
}

export function localizeProjectHref(href, locale, external = false) {
  if (external || !href.startsWith('/')) {
    return href
  }

  return withLocale(href, locale)
}
