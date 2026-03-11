export function generateBackground(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor((value / 255) * 105 + 150);
        color += value.toString(16).padStart(2, "0");
    }

    return color;
}