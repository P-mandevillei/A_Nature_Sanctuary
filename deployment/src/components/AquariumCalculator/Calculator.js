export default function calculate(s, x, m, y, mode) {
    
    const knownS = typeof s === 'number' && s>=0;
    const knownX = typeof x === 'number' && x>0;
    const knownM = typeof m === 'number' && m>=0;
    const knownY = typeof y === 'number' && y>=0;

    const totalKnown = knownS + knownX + knownM + knownY;
    if (totalKnown === 4) {
        return {'unknown': 'none'};
    }
    if (totalKnown <= 2) {
        return {'unknown': 'incomplete input'};
    }

    if (!knownY) {
        const denominator1 = 30*m-30*s+7*x;
        if (denominator1 === 0) {
            return {'unknown': 'y', 'value': 'infinite'};
        }
        const absChange = 7*x/denominator1;
        if (mode === 'removeThenAdd') {
            return {'unknown': 'y', 'value': absChange * 100};
        }
        else if (mode === 'removeWhileAdd') {
            const addWhileDumpActualChange = absChange/(1-1/Math.pow(Math.E, x));
            return {'unknown': 'y', 'value': addWhileDumpActualChange * 100};
        }
        else if (mode === 'addThenRemove') {
            const addThenDumpActualChange = absChange/(x/(1+x));
            return {'unknown': 'y', 'value': addThenDumpActualChange * 100};
        }
        else {
            return {'unknown': 'y', 'value': 'invalid mode'}
        }
    }
    // todo
    else {
        return {'unknown': 'none'};
    }

    
}