// Desenha as linhas de conexão do diagrama medindo a posição real dos
// elementos no navegador (por isso precisa ser HTML aberto num browser,
// não uma imagem estática) e traçando <line>/<text> num <svg> sobreposto.

function setupDiagram() {
  const container = document.querySelector('.diagram-container')
  const svg = document.querySelector('.connections')

  function sizeSvg() {
    const rect = container.getBoundingClientRect()
    svg.setAttribute('width', container.scrollWidth)
    svg.setAttribute('height', container.scrollHeight)
    svg.setAttribute('viewBox', `0 0 ${container.scrollWidth} ${container.scrollHeight}`)
  }
  sizeSvg()
  window.addEventListener('resize', () => {
    svg.innerHTML = svg.querySelector('defs').outerHTML
    sizeSvg()
    window.__redrawDiagram && window.__redrawDiagram()
  })

  function point(el) {
    const rC = container.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    return {
      x: r.left + r.width / 2 - rC.left,
      y: r.top + r.height / 2 - rC.top,
      w: r.width,
      h: r.height,
    }
  }

  function clip(from, to) {
    const dx = to.x - from.x
    const dy = to.y - from.y
    if (dx === 0 && dy === 0) return { x: from.x, y: from.y }
    const scaleX = from.w / 2 / Math.abs(dx || 1e-6)
    const scaleY = from.h / 2 / Math.abs(dy || 1e-6)
    const scale = Math.min(scaleX, scaleY)
    return { x: from.x + dx * scale, y: from.y + dy * scale }
  }

  window.diagramConnect = function (fromSel, toSel, opts = {}) {
    const fromEl = document.querySelector(fromSel)
    const toEl = document.querySelector(toSel)
    if (!fromEl || !toEl) {
      console.warn('Conexão não encontrada:', fromSel, '->', toSel)
      return
    }
    const p1c = point(fromEl)
    const p2c = point(toEl)
    let p1 = clip(p1c, p2c)
    let p2 = clip(p2c, p1c)

    if (opts.offset) {
      const dx = p2c.x - p1c.x
      const dy = p2c.y - p1c.y
      const len = Math.hypot(dx, dy) || 1e-6
      const nx = (-dy / len) * opts.offset
      const ny = (dx / len) * opts.offset
      p1 = { x: p1.x + nx, y: p1.y + ny }
      p2 = { x: p2.x + nx, y: p2.y + ny }
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', p1.x)
    line.setAttribute('y1', p1.y)
    line.setAttribute('x2', p2.x)
    line.setAttribute('y2', p2.y)
    line.setAttribute('class', opts.className || '')
    if (opts.dashed) line.setAttribute('stroke-dasharray', '6,4')
    if (opts.arrow) line.setAttribute('marker-end', 'url(#arrow)')
    svg.appendChild(line)

    if (opts.label) {
      const mx = (p1.x + p2.x) / 2
      const my = (p1.y + p2.y) / 2
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', mx)
      text.setAttribute('y', my - 6)
      text.setAttribute('class', 'edge-label')
      text.textContent = opts.label
      svg.appendChild(text)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupDiagram()
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => window.__redrawDiagram && window.__redrawDiagram())
  }
})
