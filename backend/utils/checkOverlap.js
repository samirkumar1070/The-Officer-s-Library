const overlappingSlots = {
    s1: ['s4', 's5', 's10'],
    s2: ['s4', 's5', 's8', 's10'],
    s3: ['s5', 's6', 's10'],
    s4: ['s1', 's2', 's5', 's10'],
    s5: ['s1', 's2', 's3', 's4', 's10'],
    s6: ['s3', 's10'],
    s7: ['s10'],
    s8: ['s2', 's10'],
    s9: ['s10'],
    s10: ['s1', 's2', 's3', 's4', 's5', 's6', 's7' ,'s8', 's9']
};

const checkOverlap = (time1, time2) => {
    return time1 === time2 || overlappingSlots[time1].includes(time2);
};

export {checkOverlap};
