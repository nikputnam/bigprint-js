const INCH_TO_MM = 25.4;

export function tiler (imageWidth, imageHeight, dpi, paper, overlap, margin = 0) {
    const widthInches = imageWidth / dpi;
    const heightInches = imageHeight / dpi;

    const widthMM = widthInches * INCH_TO_MM;
    const heightMM = heightInches * INCH_TO_MM;

    const printableWidth = paper.width - 2 * margin;
    const printableHeight = paper.height - 2 * margin;

    const paperWidthWithOverlap = printableWidth - overlap;
    const paperHeightWithOverlap = printableHeight - overlap;

    const hSheets = Math.ceil((widthMM - overlap) / paperWidthWithOverlap);
    const vSheets = Math.ceil((heightMM - overlap) / paperHeightWithOverlap);

    const totalWidthMM = hSheets * paperWidthWithOverlap + overlap;
    const totalHeightMM = vSheets * paperHeightWithOverlap + overlap;

    return {
        widthInches,
        heightInches,
        widthMM,
        heightMM,
        printableWidth,
        printableHeight,
        paperWidthWithOverlap,
        paperHeightWithOverlap,
        hSheets,
        vSheets,
        totalWidthMM,
        totalHeightMM,
    };
}