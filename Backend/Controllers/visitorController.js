import { saveVisitorData } from '../Models/visitorModel.js';

export const createVisitor = async (req, res) => {
    try {
        console.log('Received visitor data:', req.body);
        const visitorData = req.body;
        const result = await saveVisitorData(visitorData);
        console.log('Saved visitor data:', result);
        res.status(201).json({ message: 'Visitor data saved successfully' });
    } catch (error) {
        console.error('Error saving visitor data:', error);
        res.status(500).json({ error: error.message });
    }
};