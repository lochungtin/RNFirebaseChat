export const cidKeyGen = (partyA: string, partyB: string): string => {
    let subA = partyA.substring(0, 10);
    let subB = partyB.substring(0, 10);

    if (subA > subB)
        return subA + subB;

    return subB + subA;
}
