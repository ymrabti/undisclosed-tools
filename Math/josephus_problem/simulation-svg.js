// SVG-based Josephus spiral visualization

(function() {
  // Utility to create SVG elements
  function svgEl(tag, attrs = {}, children = []) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    children.forEach((c) => el.appendChild(c));
    return el;
  }

  function generate(n, desc = false) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    return desc ? arr.reverse() : arr;
  }

  const svg = document.getElementById('svg');
  const W = 800, H = 800; // viewBox size
  const CX = W / 2, CY = H / 2;

  let simulation = null;
  let animationTimer = null;
  let isPaused = false;

  class JosephusSimulationSVG {
    constructor(n, N, start, desc) {
      this.n = n;
      this.N = N;
      this.start = start;
      this.desc = desc;
      this.alive = new Set(generate(n, desc));
      this.order = generate(n, desc); // fixed order for positioning
      this.lastAlive = start;
      this.step = 0;
      this.eliminated = 0;
      this.log = [];
      this.eliminated_history = [];
      this.killMap = {};

      // Build scene containers
      this.gSpiral = svgEl('g', { class: 'g-spiral' });
      this.gLinks = svgEl('g', { class: 'g-links' });
      this.gNodes = svgEl('g', { class: 'g-nodes' });
      this.gMarks = svgEl('g', { class: 'g-marks' });
      this.gLabels = svgEl('g', { class: 'g-labels' });

      // Clear SVG and append layers
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.appendChild(this.gSpiral);
      svg.appendChild(this.gLinks);
      svg.appendChild(this.gNodes);
      svg.appendChild(this.gMarks);
      svg.appendChild(this.gLabels);

      // Center labels
      this.centerLine1 = svgEl('text', { x: CX, y: CY - 8, class: 'label-center' });
      this.centerLine2 = svgEl('text', { x: CX, y: CY + 20, class: 'label-center' });
      this.gLabels.appendChild(this.centerLine1);
      this.gLabels.appendChild(this.centerLine2);

      // Precompute spiral positions
      this.nodeRadius = 10;
      this.positions = this.computeSpiralPositions(n);

      // Draw spiral path
      this.drawSpiralPath();

      // Create nodes
      this.nodeMap = new Map();
      this.order.forEach((num) => {
        const { x, y } = this.positions[num];
        const c = svgEl('circle', {
          cx: x,
          cy: y,
          r: this.nodeRadius,
          class: 'node alive',
          'data-num': num,
        });
        const label = svgEl('text', {
          x: x,
          y: y + 4,
          'font-size': 10,
          'text-anchor': 'middle',
          fill: '#fff',
          'pointer-events': 'none'
        });
        label.textContent = String(num);

        this.gNodes.appendChild(c);
        this.gNodes.appendChild(label);
        this.nodeMap.set(num, { circle: c, label });
      });

      this.updateCenterLabel();
      this.draw();
      this.updateUI();
    }

    computeSpiralPositions(n) {
      // Archimedean spiral r = a + b*theta; choose a small a and b to fill to outerRadius
      const outerRadius = Math.min(W, H) * 0.42;
      const innerRadius = 24; // start at small radius
      const dTheta = 0.42; // angular step ensuring nice spacing
      const thetaMax = dTheta * (n - 1);
      const b = (outerRadius - innerRadius) / thetaMax;
      const a = innerRadius;

      const pos = {};
      for (let i = 0; i < n; i++) {
        const t = i * dTheta;
        const r = a + b * t;
        const x = CX + r * Math.cos(t - Math.PI / 2);
        const y = CY + r * Math.sin(t - Math.PI / 2);
        const num = this.desc ? n - i : i + 1;
        pos[num] = { x, y };
      }
      return pos;
    }

    drawSpiralPath() {
      // Approximate spiral path with polyline
      const pts = [];
      const steps = Math.max(400, this.n * 4);
      const outerRadius = Math.min(W, H) * 0.42;
      const innerRadius = 24;
      const thetaMax = 0.42 * (this.n - 1);
      const b = (outerRadius - innerRadius) / thetaMax;
      const a = innerRadius;
      for (let i = 0; i < steps; i++) {
        const u = i / (steps - 1);
        const t = u * thetaMax;
        const r = a + b * t;
        const x = CX + r * Math.cos(t - Math.PI / 2);
        const y = CY + r * Math.sin(t - Math.PI / 2);
        pts.push(`${x},${y}`);
      }
      const poly = svgEl('polyline', { points: pts.join(' '), class: 'spiral-path' });
      this.gSpiral.appendChild(poly);
    }

    get listComn() { return Array.from(this.alive.values()); }

    getNextKills() {
      if (this.alive.size <= 1) return [];
      const arr = this.listComn;
      const len = arr.length;
      const i = arr.indexOf(this.lastAlive);
      const canEliminate = Math.min(this.N, len - 1);
      const kills = [];
      for (let j = 0; j < canEliminate; j++) kills.push(arr[(i + j + 1) % len]);
      return kills;
    }

    stepForward() {
      const len = this.alive.size;
      if (len === 1) {
        this.log.push(`🎉 Winner: Position ${this.lastAlive}!`);
        showCeremony(this.lastAlive);
        return false;
      }
      const arr = this.listComn;
      const i = arr.indexOf(this.lastAlive);
      const canEliminate = Math.min(this.N, len - 1);
      const kills = [];
      for (let j = 0; j < canEliminate; j++) kills.push(arr[(i + j + 1) % len]);

      this.log.push(`Position ${this.lastAlive} eliminates: ${kills.join(', ')}`);

      if (!this.killMap[this.lastAlive]) this.killMap[this.lastAlive] = [];

      kills.forEach((victim) => {
        if (this.alive.has(victim)) {
          this.alive.delete(victim);
          this.eliminated++;
          this.eliminated_history.push(victim);
          this.killMap[this.lastAlive].push(victim);
        }
      });

      // next alive
      const nextAlive = arr[(i + 1 + canEliminate) % arr.length];
      this.lastAlive = nextAlive;
      this.step++;

      if (this.alive.size === 1) {
        this.log.push(`🎉 Winner: Position ${this.lastAlive}!`);
        setTimeout(() => showCeremony(this.lastAlive), 400);
        return false;
      }
      return true;
    }

    draw(highlightKills = []) {
      // Update nodes classes and labels
      this.order.forEach((num) => {
        const ref = this.nodeMap.get(num);
        if (!ref) return;
        const alive = this.alive.has(num);
        const isCurrent = alive && num === this.lastAlive;
        const isSurvivor = alive && this.alive.size === 1 && num === this.lastAlive;

        ref.circle.setAttribute('class', `node ${isSurvivor ? 'survivor' : isCurrent ? 'current' : alive ? 'alive' : 'dead'}`);
        ref.label.setAttribute('fill', isSurvivor || isCurrent || alive ? '#fff' : '#78909c');
      });

      // Clear links and marks, then (optionally) draw preview links and new x-marks
      while (this.gLinks.firstChild) this.gLinks.removeChild(this.gLinks.firstChild);

      // Draw preview arrows to upcoming kills
      if (highlightKills.length && this.alive.has(this.lastAlive)) {
        const from = this.positions[this.lastAlive];
        highlightKills.forEach((k) => {
          const to = this.positions[k];
          const line = svgEl('line', {
            x1: from.x, y1: from.y, x2: to.x, y2: to.y,
            stroke: '#FF6B00', 'stroke-width': 2, 'stroke-dasharray': '5 5'
          });
          this.gLinks.appendChild(line);
        });
      }

      // Draw X marks for eliminated history
      while (this.gMarks.firstChild) this.gMarks.removeChild(this.gMarks.firstChild);
      this.eliminated_history.forEach((num) => this.drawX(num));

      this.updateCenterLabel();
      this.updateUI();
    }

    drawX(num) {
      const p = this.positions[num];
      const s = this.nodeRadius * 1.8;
      const g = svgEl('g', { class: 'xmark' });
      const l1 = svgEl('line', { x1: p.x - s/2, y1: p.y - s/2, x2: p.x + s/2, y2: p.y + s/2 });
      const l2 = svgEl('line', { x1: p.x - s/2, y1: p.y + s/2, x2: p.x + s/2, y2: p.y - s/2 });
      g.appendChild(l1); g.appendChild(l2);
      this.gMarks.appendChild(g);
    }

    updateCenterLabel() {
      this.centerLine1.textContent = `n = ${this.n}`;
      this.centerLine2.textContent = `k = ${this.N}`;
    }

    updateUI() {
      document.getElementById('remaining').textContent = this.alive.size;
      document.getElementById('eliminated').textContent = this.eliminated;
      document.getElementById('round').textContent = this.step;
      document.getElementById('survivor').textContent = this.alive.size === 1 ? this.lastAlive : '-';

      const logContainer = document.getElementById('logContainer');
      const lastLogs = this.log.slice(-10).reverse();
      logContainer.innerHTML = lastLogs.map((t) => `<div class="log-entry">${t}</div>`).join('');
    }
  }

  function startSimulation() {
    resetSimulation();
    const n = parseInt(document.getElementById('nombre').value);
    const N = parseInt(document.getElementById('skip').value);
    const start = parseInt(document.getElementById('start').value);
    const desc = document.getElementById('desc').checked;

    if (!Number.isFinite(n) || !Number.isFinite(N) || !Number.isFinite(start) || n < 1 || N < 1 || start < 1 || start > n) {
      alert('Please provide valid parameters (1 ≤ start ≤ n, n ≥ 1, N ≥ 1).');
      return;
    }

    simulation = new JosephusSimulationSVG(n, N, start, desc);
    isPaused = false;
    animate();
  }

  function shuffleParameters() {
    const nombre = Math.floor(Math.random() * 150) + 10;
    const skip = Math.floor(Math.random() * 15) + 1;
    const start = Math.floor(Math.random() * nombre) + 1;
    const desc = Math.random() > 0.5;
    document.getElementById('nombre').value = nombre;
    document.getElementById('skip').value = skip;
    document.getElementById('start').value = start;
    document.getElementById('start').max = nombre;
    document.getElementById('desc').checked = desc;
  }

  function showCeremony(winnerNumber) {
    const overlay = document.getElementById('ceremonyOverlay');
    const winnerEl = document.getElementById('winnerNumber');
    winnerEl.textContent = `Position ${winnerNumber}`;
    overlay.style.display = 'flex';
  }

  function closeCeremony() {
    const overlay = document.getElementById('ceremonyOverlay');
    overlay.style.display = 'none';
  }

  function animate() {
    if (isPaused || !simulation) return;
    const speed = 2100 - parseInt(document.getElementById('speed').value);
    const nextKills = simulation.getNextKills();
    simulation.draw(nextKills);
    setTimeout(() => {
      const hasNext = simulation.stepForward();
      simulation.draw();
      if (hasNext && !isPaused) {
        animationTimer = setTimeout(animate, speed);
      } else if (!hasNext) {
        document.getElementById('survivor').style.animation = 'pulse 1s infinite';
      }
    }, speed / 2);
  }

  function stepSimulation() {
    if (!simulation) {
      startSimulation();
      isPaused = true;
      return;
    }
    isPaused = true;
    const nextKills = simulation.getNextKills();
    simulation.draw(nextKills);
    setTimeout(() => {
      simulation.stepForward();
      simulation.draw();
    }, 250);
  }

  function pauseSimulation() {
    isPaused = true;
    if (animationTimer) clearTimeout(animationTimer);
  }

  function resetSimulation() {
    isPaused = true;
    if (animationTimer) clearTimeout(animationTimer);
    simulation = null;

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    // Initial hint text
    const hint = svgEl('text', { x: CX, y: CY, class: 'hint-text' });
    hint.textContent = 'Set parameters and click START to begin simulation';
    svg.appendChild(hint);

    document.getElementById('remaining').textContent = '-';
    document.getElementById('eliminated').textContent = '-';
    document.getElementById('round').textContent = '-';
    document.getElementById('survivor').textContent = '-';
    document.getElementById('logContainer').innerHTML = '';
  }

  // Hook controls to globals
  window.startSimulation = startSimulation;
  window.stepSimulation = stepSimulation;
  window.pauseSimulation = pauseSimulation;
  window.resetSimulation = resetSimulation;
  window.shuffleParameters = shuffleParameters;
  window.showCeremony = showCeremony;
  window.closeCeremony = closeCeremony;

  // Speed slider display
  document.getElementById('speed').addEventListener('input', (e) => {
    document.getElementById('speedValue').textContent = e.target.value + 'ms';
  });
  document.getElementById('nombre').addEventListener('input', (e) => {
    document.getElementById('start').max = e.target.value;
  });

  // Initial reset to draw hint
  resetSimulation();
})();
