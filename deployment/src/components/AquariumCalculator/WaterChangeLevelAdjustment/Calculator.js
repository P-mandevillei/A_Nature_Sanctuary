export default function calculate(s, x, m, y, mode) {
    
    const knownS = typeof s === 'number' && s>=0;
    const knownX = typeof x === 'number' && x>=0;
    const knownM = typeof m === 'number' && m>=0;
    const knownY = typeof y === 'number' && y>=0;
    
    const totalKnown = knownS + knownX + knownM + knownY;
    
    if (totalKnown === 4) {
        return {'error': true, 'msg': 'noUnknown'};
    }
    if (totalKnown <= 2) {
        return {'error': true, 'msg': 'incomplete'};
    }

    if (!knownY) {
        const denominator1 = s-x;
        if (denominator1 == 0) {
            return {'error': true, 'msg': 'impossible'};
        }
        const absChange = (m-x)/denominator1;
        if (absChange<0 || absChange>=1) {
            return {'error': true, 'msg': 'impossible'}
        }
        if (mode === 'removeThenAdd') {
            return {'error': false, 'unknown': 'y', 'value': (absChange * 100).toFixed(2)};
        }
        else if (mode === 'removeWhileAdd') {
            const addWhileDumpActualChange = Math.log(1/(1-absChange));
            return {'error': false, 'unknown': 'y', 'value': (addWhileDumpActualChange * 100).toFixed(2)};
        }
        else if (mode === 'addThenRemove') {
            const addThenDumpActualChange = absChange/(1-absChange);
            return {'error': false, 'unknown': 'y', 'value': (addThenDumpActualChange * 100).toFixed(2)};
        }
        else {
            return {'error': true, 'msg': 'invalid'}
        }
    }
    else if (!knownS) {
        
        if (y===0) {
            return {'error': true, 'msg': "reminder"}
        }
        let actualY = y/100;
        if (mode === 'removeThenAdd') {}
        else if (mode === 'removeWhileAdd') {
            actualY = 1 - 1/Math.pow(Math.E, actualY);
        }
        else if (mode === 'addThenRemove') {
            actualY = actualY / (1+actualY);
        }
        else {
            return {'error': true, 'msg': 'invalid'}
        }
        const actualS = (m-x)/actualY + x;
        if (actualS>=0) {
            return {'error': false, 'unknown': 's', 'value': actualS.toFixed(2)};
        }
        return {'error': true, 'msg': 'impossible'};
    }
    else if (!knownX) {
        let actualY = y/100;
        if (mode === 'removeThenAdd') {}
        else if (mode === 'removeWhileAdd') {
            actualY = 1 - 1/Math.pow(Math.E, actualY);
        }
        else if (mode === 'addThenRemove') {
            actualY = actualY / (1+actualY);
        }
        else {
            return {'error': true, 'msg': 'invalid'}
        }
        if (actualY===1) {
            return {'error': false, 'unknown': 'x', 'value': s};
        }
        const actualX = (m-s*actualY)/(1-actualY);
        return {'error': false, 'unknown': 'x', 'value': actualX.toFixed(2)};
    }
    else if (!knownM) {
        if (y===0) {
            return {'error': true, 'msg': "reminder"}
        }
        let actualY = y/100;
        if (mode === 'removeThenAdd') {}
        else if (mode === 'removeWhileAdd') {
            actualY = 1 - 1/Math.pow(Math.E, actualY);
        }
        else if (mode === 'addThenRemove') {
            actualY = actualY / (1+actualY);
        }
        else {
            return {'error': true, 'msg': 'invalid'}
        }
        const actualM = x*(1-actualY) + s*actualY;
        if (actualM>=0) {
            return {'error': false, 'unknown': 'm', 'value': actualM.toFixed(2)};
        }
        return {'error': true, 'msg': 'reminder'};
    }
    else {
        return {'error': true, 'msg': 'invalid'};
    }
}