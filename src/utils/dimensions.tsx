export const mainContainerWidth = '800px';

export const spacing0 = '4px';
export const spacing1 = '8px';
export const spacing2 = '16px';
export const spacing3 = '24px';
export const spacing4 = '32px';

export const cvSpacing0 = '0.5mm';
export const cvSpacing1 = '1mm';
export const cvSpacing2 = '2mm';
export const cvSpacing3 = '4mm';
export const cvSpacing4 = '8mm';

export const ifSuperSmall = '@media (max-width: 400px)';
export const ifSmall = '@media (max-width: 768px)';
export const ifLarge = '@media (min-width: 768px)';

export const mainContainerSizeSettings = `
    box-sizing: border-box;
    width: 90%;
    ${ifLarge} {
        width: 60%;
    }
    max-width: ${mainContainerWidth};
    margin: 0 auto;
`;
