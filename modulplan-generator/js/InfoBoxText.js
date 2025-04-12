export class InfoBoxText {
    static getText(language, height, width, height_local, width_local, edgeText) {
        return language === "deutsch"
            ? this.germanText(height, width, height_local, width_local, edgeText)
            : this.englishText(height, width, height_local, width_local, edgeText);
    }

    static germanText(height, width, height_local, width_local, edgeText) {
        return `\nAußenmaße:\n- Höhe: ${height} cm\n- Breite: ${width} cm\n\n` +
            `Modulplatten:\n- Modulhöhe: ${height_local} cm\n- Modulbreite: ${width_local} cm\n\n` +
            `${edgeText}\n`;
    }

    static englishText(height, width, height_local, width_local, edgeText) {
        return `\nExternal dimensions:\n- Height: ${height} cm\n- Width: ${width} cm\n\n` +
            `Module dimensions:\n- Height: ${height_local} cm\n- Width: ${width_local} cm\n\n` +
            `${edgeText}\n`;
    }
    static numberOfPages(i, data){
        return i + 1 + "/"+ data.plans.length;
    }
}
