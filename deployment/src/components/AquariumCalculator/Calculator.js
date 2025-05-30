import { useCallback } from "react";

export default function calculate(s, x, m, y, mode) {
    
    const knownS = typeof s === 'number' && s>=0;
    const knownX = typeof x === 'number' && x>0;
    const knownM = typeof m === 'number' && m>=0;
    const knownY = typeof y === 'number' && y>=0;
    
    const totalKnown = knownS + knownX + knownM + knownY;
    
    if (totalKnown === 4) {
        return {'error': true, 'msg': 'No unknown'};
    }
    if (totalKnown <= 2) {
        return {'error': true, 'msg': 'Incomplete input'};
    }

    if (!knownY) {
        const denominator1 = 30*m-30*s+7*x;
        if (denominator1 <= 0) {
            return {'error': true, 'msg': '% Change: infinite'};
        }
        const absChange = 7*x/denominator1;
        if (absChange>=1) {
            return {'error': true, 'msg': 'Impossible goal!'}
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
            return {'error': true, 'msg': 'Invalid mode'}
        }
    }
    else if (!knownS) {
        
        if (y===0) {
            return {'error': true, 'msg': "Steady State unreachable. You should remember to change your water!"}
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
            return {'error': true, 'msg': 'Invalid mode'}
        }
        const actualS = m + 7*x/30 - 7*x/30/actualY;
        if (actualS>=0) {
            return {'error': false, 'unknown': 's', 'value': actualS.toFixed(2)};
        }
        return {'error': true, 'msg': 'Impossible goal!'};
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
            return {'error': true, 'msg': 'Invalid mode'}
        }
        if (actualY===100) {
            return {'error': false, 'unknown': 'x', 'value': 0};
        }
        const actualX = 30*(m-s)/7 * actualY/(1-actualY);
        if (actualX>=0) {
            return {'error': false, 'unknown': 's', 'value': actualX.toFixed(2)};
        }
        return {'error': true, 'msg': 'Impossible! You might not have arrived at steady state.'};
    }
    else if (!knownM) {
        if (y===0) {
            return {'error': true, 'msg': "Steady State unreachable. You should remember to change your water!"}
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
            return {'error': true, 'msg': 'Invalid mode'}
        }
        const actualM = 7*x/30/actualY - 7*x/30 + s;
        if (actualM>=0) {
            return {'error': false, 'unknown': 'm', 'value': actualM.toFixed(2)};
        }
        return {'error': true, 'msg': 'Steady state unreachable!'};
    }
    else {
        return {'error': true, 'msg': 'None matched!'};
    }
}