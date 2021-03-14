// @ts-ignore
interface Console {
    color: (text: string, color: string, background?: string) => void
}

console.color = (text: string, color: string, background?: string) => {
    const styles = [
        'color:' + color,
        'background-color:' + background,
        'padding: 0px 8px;'
    ].join(';');
    console.log('%c' + text, styles);
};
