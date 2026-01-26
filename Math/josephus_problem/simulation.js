// Helper functions
function generate(nombre, desc = false) {
    const list = [];
    for (let i = 1; i <= nombre; i++) {
        list.push(i);
    }
    return desc ? list.reverse() : list;
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let simulation = null;
let animationTimer = null;
let isPaused = false;

class JosephusSimulation {
    constructor(nombre, N, start, desc) {
        this.nombre = nombre;
        this.N = N;
        this.start = start;
        this.desc = desc;
        this.listComn = generate(nombre, desc);
        this.lastAlive = start;
        this.step = 0;
        this.eliminated = 0;
        this.round = 1;
        this.log = [];
        this.eliminated_history = [];
        this.initialCount = nombre;
        this.killMap = {}; // Track who killed whom
        this.positions = this.calculatePositions();
    }

    calculatePositions() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const positions = {};

        const currentCount = this.listComn.length;
        const progress = 1 - (currentCount / this.initialCount);
        
        // Circle shrinks as people are eliminated
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
        const minRadius = maxRadius * 0.3;
        const currentRadius = maxRadius - (maxRadius - minRadius) * progress;
        
        const angleStep = (2 * Math.PI) / this.nombre;

        for (let i = 0; i < this.nombre; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const num = this.desc ? this.nombre - i : i + 1;

            positions[num] = {
                x: centerX + currentRadius * Math.cos(angle),
                y: centerY + currentRadius * Math.sin(angle),
                radius: 15
            };
        }

        return positions;
    }

    stepForward() {
        const len = this.listComn.length;
        
        // If only 1 person left, they are the winner
        if (len === 1) {
            this.log.push(`🎉 Winner: Position ${this.lastAlive}!`);
            showCeremony(this.lastAlive);
            return false; // Simulation complete
        }

        const i = this.listComn.indexOf(this.lastAlive);
        
        // Calculate how many people we can actually eliminate
        const canEliminate = Math.min(this.N, len - 1); // Never eliminate everyone
        const nextAlive = this.listComn[(i + 1 + canEliminate) % len];

        const kills = [];
        for (let j = 0; j < canEliminate; j++) {
            kills.push(this.listComn[(i + j + 1) % len]);
        }

        this.log.push(`Position ${this.lastAlive} eliminates: ${kills.join(', ')}`);

        // Track kills for pyramid visualization
        if (!this.killMap[this.lastAlive]) {
            this.killMap[this.lastAlive] = [];
        }
        
        kills.forEach((item) => {
            const itemIndex = this.listComn.indexOf(item);
            if (itemIndex > -1) {
                this.eliminated_history.push(item);
                this.listComn.splice(itemIndex, 1);
                this.eliminated++;
                this.killMap[this.lastAlive].push(item);
            }
        });

        this.lastAlive = nextAlive;
        this.step++;

        // Recalculate positions for shrinking circle
        this.positions = this.calculatePositions();

        // Check if we found the winner
        if (this.listComn.length === 1) {
            this.log.push(`🎉 Winner: Position ${this.lastAlive}!`);
            setTimeout(() => showCeremony(this.lastAlive), 1000);
            return false; // Simulation complete
        }

        return true;
    }

    draw(highlightKills = []) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections for circle
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const sortedNums = Object.keys(this.positions)
            .map((n) => parseInt(n))
            .sort((a, b) => a - b);

        for (let i = 0; i < sortedNums.length - 1; i++) {
            const num1 = sortedNums[i];
            const num2 = sortedNums[i + 1];
            const pos1 = this.positions[num1];
            const pos2 = this.positions[num2];

            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
        }
        ctx.stroke();

        // Draw pyramid connections from killer to kills (behind the person)
        for (const killer in this.killMap) {
            const killerNum = parseInt(killer);
            const killerPos = this.positions[killerNum];
            const kills = this.killMap[killer];
            
            if (kills && kills.length > 0 && this.listComn.includes(killerNum)) {
                kills.forEach((victim, index) => {
                    const victimPos = this.positions[victim];
                    
                    // Draw line from killer's back to victim
                    ctx.strokeStyle = `rgba(255, 107, 107, ${0.3 + 0.05 * index})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    
                    // Calculate direction from center to killer (behind the person)
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const angle = Math.atan2(killerPos.y - centerY, killerPos.x - centerX);
                    const backOffset = 15;
                    const backX = killerPos.x - Math.cos(angle) * backOffset;
                    const backY = killerPos.y - Math.sin(angle) * backOffset;
                    
                    ctx.moveTo(backX, backY);
                    ctx.lineTo(victimPos.x, victimPos.y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                });
            }
        }

        // Draw circles
        for (const num in this.positions) {
            const pos = this.positions[num];
            const numInt = parseInt(num);
            const isAlive = this.listComn.includes(numInt);
            const isCurrent = numInt === this.lastAlive && isAlive;
            const isKilled = highlightKills.includes(numInt);
            const isSurvivor = this.listComn.length === 1 && numInt === this.lastAlive;

            // Draw circle
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI);

            if (isSurvivor) {
                ctx.fillStyle = '#2196F3';
                ctx.strokeStyle = '#0D47A1';
                ctx.lineWidth = 4;
            } else if (isCurrent) {
                ctx.fillStyle = '#FFD700';
                ctx.strokeStyle = '#FF6B00';
                ctx.lineWidth = 3;
            } else if (isKilled) {
                ctx.fillStyle = '#ff6b6b';
                ctx.strokeStyle = '#c92a2a';
                ctx.lineWidth = 2;
            } else if (isAlive) {
                ctx.fillStyle = '#4CAF50';
                ctx.strokeStyle = '#2E7D32';
                ctx.lineWidth = 2;
            } else {
                ctx.fillStyle = '#f44336';
                ctx.strokeStyle = '#c62828';
                ctx.lineWidth = 1;
            }

            ctx.fill();
            ctx.stroke();

            // Draw number
            ctx.fillStyle = isAlive || isCurrent || isSurvivor ? 'white' : '#999';
            ctx.font = `bold ${Math.floor(pos.radius * 1.2)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(num, pos.x, pos.y);
            
            // Draw kill count badge for alive people with kills
            if (isAlive && this.killMap[numInt] && this.killMap[numInt].length > 0) {
                const killCount = this.killMap[numInt].length;
                const badgeRadius = 8;
                const badgeX = pos.x + pos.radius - 5;
                const badgeY = pos.y - pos.radius + 5;
                
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, badgeRadius, 0, 2 * Math.PI);
                ctx.fillStyle = '#e74c3c';
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 10px Arial';
                ctx.fillText(killCount, badgeX, badgeY);
            }
        }

        // Draw arrow from current to next kills
        if (highlightKills.length > 0 && this.listComn.includes(this.lastAlive)) {
            ctx.strokeStyle = '#FF6B00';
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);

            highlightKills.forEach((kill) => {
                const fromPos = this.positions[this.lastAlive];
                const toPos = this.positions[kill];

                ctx.beginPath();
                ctx.moveTo(fromPos.x, fromPos.y);
                ctx.lineTo(toPos.x, toPos.y);
                ctx.stroke();

                // Draw arrow head
                const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
                const headLength = 15;
                ctx.beginPath();
                ctx.moveTo(toPos.x, toPos.y);
                ctx.lineTo(
                    toPos.x - headLength * Math.cos(angle - Math.PI / 6),
                    toPos.y - headLength * Math.sin(angle - Math.PI / 6),
                );
                ctx.moveTo(toPos.x, toPos.y);
                ctx.lineTo(
                    toPos.x - headLength * Math.cos(angle + Math.PI / 6),
                    toPos.y - headLength * Math.sin(angle + Math.PI / 6),
                );
                ctx.stroke();
            });

            ctx.setLineDash([]);
        }
    }

    updateUI() {
        document.getElementById('remaining').textContent = this.listComn.length;
        document.getElementById('eliminated').textContent = this.eliminated;
        document.getElementById('round').textContent = this.step;
        document.getElementById('survivor').textContent =
            this.listComn.length === 1 ? this.lastAlive : '-';

        // Update log
        const logContainer = document.getElementById('logContainer');
        const lastLogs = this.log.slice(-10).reverse();
        logContainer.innerHTML = lastLogs
            .map((log) => `<div class="log-entry">${log}</div>`)
            .join('');
    }

    getNextKills() {
        if (this.listComn.length <= 1) {
            return [];
        }

        const len = this.listComn.length;
        const i = this.listComn.indexOf(this.lastAlive);
        const kills = [];
        
        // Calculate how many people we can actually eliminate
        const canEliminate = Math.min(this.N, len - 1);

        for (let j = 0; j < canEliminate; j++) {
            kills.push(this.listComn[(i + j + 1) % len]);
        }

        return kills;
    }
}

function startSimulation() {
    resetSimulation();

    const nombre = parseInt(document.getElementById('nombre').value);
    const N = parseInt(document.getElementById('skip').value);
    const start = parseInt(document.getElementById('start').value);
    const desc = document.getElementById('desc').checked;

    if (start > nombre) {
        alert('Starting position cannot be greater than the number of people!');
        return;
    }

    simulation = new JosephusSimulation(nombre, N, start, desc);
    simulation.draw();
    simulation.updateUI();

    isPaused = false;
    animate();
}

function shuffleParameters() {
    const nombre = Math.floor(Math.random() * 150) + 10; // 10-159
    const skip = Math.floor(Math.random() * 15) + 1; // 1-15
    const start = Math.floor(Math.random() * nombre) + 1; // 1-nombre
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
        simulation.updateUI();

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
        simulation.updateUI();
    }, 300);
}

function pauseSimulation() {
    isPaused = true;
    if (animationTimer) {
        clearTimeout(animationTimer);
    }
}

function resetSimulation() {
    isPaused = true;
    if (animationTimer) {
        clearTimeout(animationTimer);
    }

    simulation = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('remaining').textContent = '-';
    document.getElementById('eliminated').textContent = '-';
    document.getElementById('round').textContent = '-';
    document.getElementById('survivor').textContent = '-';
    document.getElementById('logContainer').innerHTML = '';
}

// Speed slider update
document.getElementById('speed').addEventListener('input', (e) => {
    document.getElementById('speedValue').textContent = e.target.value + 'ms';
});

// Auto-update start max value
document.getElementById('nombre').addEventListener('input', (e) => {
    document.getElementById('start').max = e.target.value;
});

// Initial canvas text
ctx.font = '24px Arial';
ctx.fillStyle = '#667eea';
ctx.textAlign = 'center';
ctx.fillText(
    'Set parameters and click START to begin simulation',
    canvas.width / 2,
    canvas.height / 2,
);
