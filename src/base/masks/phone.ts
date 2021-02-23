export const phoneMask = (value: string) => {
    return value
        .replace(/\D/gi, '')
        .replace(/(\d{2})/, '($1) ')
        .replace(/([(]\d{2}[)])(\s\d{4})/, '$1$2')
        .replace(/([(]\d{2}[)]\s\d{4})(\d{4})/, '$1-$2')
        .replace(/([(]\d{2}[)])(\s\d)(\d)(\d{2})-(\d)(\d{4})/, '$1$2 $3$4$5-$6');
}
