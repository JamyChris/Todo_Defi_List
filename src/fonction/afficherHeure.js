const afficherHeure = (heureEnSecondes) => {
    heureEnSecondes = Number(heureEnSecondes)

    const h = Math.floor(heureEnSecondes / 3600);
    const m = Math.floor(heureEnSecondes % 3600 / 60);
    const s = Math.floor(heureEnSecondes % 3600 % 60);

    // jute migerer l'affichage fotsin io 
    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;
    const sDisplay = s < 10 ? '0' + s : s;

    return(`${hDisplay}:${mDisplay}:${sDisplay}`);
}

export default afficherHeure;