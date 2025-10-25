# Program Output Examples:-

## results:-

```js
results: [
    {
      _id: new ObjectId('68fc1cdbdb144aaa8f885e17'),
      text: 'Policy Number: IN-1013.\n' +
        '        Customer Name: Neha Kapoor, Age: 28.\n' +
        '        Insurance Type: Health.\n' +
        '        Plan: Gold Care Premium.\n' +
        '        Premium: ₹14000, Coverage: ₹600000.\n' +
        '        Policy Period: 2023-11-01 to 2026-11-01.\n' +
        '        Claims: Claim 1: \n' +
        '                ID: CL-9013, \n' +
        '                Date: 2024-05-05, \n' +
        '                Amount: ₹15000, \n' +
        '                Reason: Gallbladder treatment, \n' +
        '                Status: Settled.',
      score: 0.7588282823562622
    },
    {
      _id: new ObjectId('68fc1cdbdb144aaa8f885e0e'),
      text: 'Policy Number: IN-1004.\n' +
        '        Customer Name: Priya Nair, Age: 31.\n' +
        '        Insurance Type: Health.\n' +
        '        Plan: Gold Care Premium.\n' +
        '        Premium: ₹15200, Coverage: ₹800000.\n' +
        '        Policy Period: 2023-07-01 to 2026-07-01.\n' +
        '        Claims: No claim history.',
      score: 0.7272753715515137
    },
    {
      _id: new ObjectId('68fc1cdbdb144aaa8f885e1e'),
      text: 'Policy Number: IN-1020.\n' +
        '        Customer Name: Shweta Tiwari, Age: 29.\n' +
        '        Insurance Type: Health.\n' +
        '        Plan: Silver Care Plus.\n' +
        '        Premium: ₹9700, Coverage: ₹500000.\n' +
        '        Policy Period: 2024-05-01 to 2027-05-01.\n' +
        '        Claims: No claim history.',
      score: 0.7265779376029968
    }
  ]
```

## context:-

```js
{
  context: 'Policy Number: IN-1013.\n' +
    '        Customer Name: Neha Kapoor, Age: 28.\n' +
    '        Insurance Type: Health.\n' +
    '        Plan: Gold Care Premium.\n' +
    '        Premium: ₹14000, Coverage: ₹600000.\n' +
    '        Policy Period: 2023-11-01 to 2026-11-01.\n' +
    '        Claims: Claim 1: \n' +
    '                ID: CL-9013, \n' +
    '                Date: 2024-05-05, \n' +
    '                Amount: ₹15000, \n' +
    '                Reason: Gallbladder treatment, \n' +
    '                Status: Settled.\n' +
    '\n' +
    'Policy Number: IN-1004.\n' +
    '        Customer Name: Priya Nair, Age: 31.\n' +
    '        Insurance Type: Health.\n' +
    '        Plan: Gold Care Premium.\n' +
    '        Premium: ₹15200, Coverage: ₹800000.\n' +
    '        Policy Period: 2023-07-01 to 2026-07-01.\n' +
    '        Claims: No claim history.\n' +
    '\n' +
    'Policy Number: IN-1020.\n' +
    '        Customer Name: Shweta Tiwari, Age: 29.\n' +
    '        Insurance Type: Health.\n' +
    '        Plan: Silver Care Plus.\n' +
    '        Premium: ₹9700, Coverage: ₹500000.\n' +
    '        Policy Period: 2024-05-01 to 2027-05-01.\n' +
    '        Claims: No claim history.'
}
```
