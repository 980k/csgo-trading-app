import React from 'react';

const wearDictionary = {
    'Factory New' : 'FN',
    'Minimal Wear' : 'MW',
    'Field-Tested' : 'FT',
    'Well-Worn' : 'WW',
    'Battle-Scarred' : 'BS'
}

export function convertWear(wear) {
    return(wearDictionary[wear]);
}