import { PaddockService } from '../services/PaddockService.js';

const main = async () => {
    try {
        const paddockService = new PaddockService('http://telemetry.b4mad.racing:30050/graphql');
        const sessionDataArray = await paddockService.getSessionData('1730913437');

        console.log('Session Data:');
        sessionDataArray.forEach((sessionData, index) => {
            console.log(`\nSession ${index + 1}:`);
            console.log('Session Info:', sessionData.session);
            console.log('Laps:', sessionData.laps);
        });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        process.exit(1);
    }
};

main();
