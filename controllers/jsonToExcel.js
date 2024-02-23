const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

function readJsonData(date) {
    const filePath = path.join(__dirname, '..', '..', 'data', `data_${date}.json`);

    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading JSON data from ${filePath}:`, error);
        return null;
    }
}

function jsonToExcel(jsonData) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    return workbook;
}

function saveExcelFile(workbook, date) {
    const filePath = path.join(__dirname, '..', '..', 'data', `data_${date}.xlsx`);

    try {
        XLSX.writeFile(workbook, filePath);
        console.log(`Excel file saved successfully: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`Error saving Excel file ${filePath}:`, error);
        return null;
    }
}

function generateExcel(req, res) {
    const { date } = req.query.dataDate;

    const jsonData = readJsonData(date);
    if (!jsonData) {
        return res.status(404).json({ error: `Data for date ${date} not found.` });
    }

    const workbook = jsonToExcel(jsonData);
    const filePath = saveExcelFile(workbook, date);
    if (!filePath) {
        return res.status(500).json({ error: `Failed to generate Excel file for date ${date}.` });
    }

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).json({ error: 'Failed to send Excel file.' });
        } else {
            console.log('Excel file sent successfully.');
            fs.unlinkSync(filePath);
        }
    });
}

module.exports = {
    generateExcel
};
