const tamanSl3a = 1000 // ryal
const monatnt = 2000 // ryal
const srf = [10, 20, 40, 100, 200, 400, 1000, 2000]
const maxsrf = srf.filter(e => e <= monatnt - tamanSl3a)
const srfReduc = maxsrf.reduceRight((p, c) => {
    const moduloSrf = p.monatntActuel % c;
    const nbrUnits = (p.monatntActuel - moduloSrf) / c;
    p[c] = nbrUnits;
    p.monatntActuel = moduloSrf
    return p
}, { monatntActuel: monatnt - tamanSl3a })
const { monatntActuel, ...result } = srfReduc
console.log(result)
