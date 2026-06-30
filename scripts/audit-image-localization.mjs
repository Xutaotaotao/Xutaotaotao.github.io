import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

const root = process.cwd()
const contentRoots = ['summary', 'question', 'feMap', 'notes']

function walk(relativeDir) {
  const absoluteDir = resolve(root, relativeDir)
  const entries = readdirSync(absoluteDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = join(relativeDir, entry.name)

    if (entry.isDirectory()) {
      files.push(...walk(relativePath))
      continue
    }

    if (entry.isFile() && relativePath.endsWith('.md')) {
      files.push(relativePath)
    }
  }

  return files
}

function extractImageRefs(relativePath) {
  const content = readFileSync(resolve(root, relativePath), 'utf8')
  const refs = []
  const pattern = /!\[([^\]]*)\]\(([^)]+)\)/g
  let match

  while ((match = pattern.exec(content))) {
    refs.push({
      alt: match[1],
      src: match[2],
    })
  }

  return refs
}

const sharedAssets = []
const missingMirrors = []

for (const contentRoot of contentRoots) {
  for (const zhFile of walk(contentRoot)) {
    const enFile = `en/${zhFile}`

    try {
      const zhRefs = extractImageRefs(zhFile)
      const enRefs = extractImageRefs(enFile)

      if (!enRefs.length) continue

      if (JSON.stringify(zhRefs.map((item) => item.src)) === JSON.stringify(enRefs.map((item) => item.src))) {
        sharedAssets.push({
          file: zhFile,
          imageCount: enRefs.length,
          sources: enRefs.map((item) => item.src),
        })
      }
    } catch {
      missingMirrors.push(enFile)
    }
  }
}

console.log(JSON.stringify({
  sharedAssetFileCount: sharedAssets.length,
  sharedAssets,
  missingMirrors,
}, null, 2))
