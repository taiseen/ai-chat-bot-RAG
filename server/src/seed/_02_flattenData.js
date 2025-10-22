export const flattenData = (record) => {

    const {
        insuranceType,
        policyNumber,
        claims = [],
        startDate,
        coverage,
        premium,
        endDate,
        name,
        plan,
        age,
    } = record;

    const claimText = claims.length > 0
        ? claims.map((c, i) =>
            `Claim ${i + 1}: 
                ID: ${c.claimId}, 
                Date: ${c.date}, 
                Amount: ₹${c.amount}, 
                Reason: ${c.reason}, 
                Status: ${c.status}`
        ).join("; ")
        : "No claim history";

    // convert [js data] into a flat [string data] for embedding generation...
    return `
        Policy Number: ${policyNumber}.
        Customer Name: ${name}, Age: ${age}.
        Insurance Type: ${insuranceType}.
        Plan: ${plan}.
        Premium: ₹${premium}, Coverage: ₹${coverage}.
        Policy Period: ${startDate} to ${endDate}.
        Claims: ${claimText}.`.trim();
}