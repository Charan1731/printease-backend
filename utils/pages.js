import { PDFDocument } from "pdf-lib";
import axios from "axios";

const countPages =  async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const pdfDoc = await PDFDocument.load(response.data);
        return pdfDoc.getPageCount();
    } catch (error) {
        console.log('Error in countPages: ', error);
        return 0;
    }
}

export default countPages;