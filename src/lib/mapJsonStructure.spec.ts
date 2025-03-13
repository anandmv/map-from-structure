import test from 'ava';
import { mapJsonData } from './mapJsonStructure'; // Assuming your file is named mapJsonStructure.ts

// Define types for input and output data structures
type Address = {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly postal_code: string;
};

type InputData = {
  readonly user_id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly addresses: readonly Address[];
  readonly phone_numbers: readonly string[];
};

// Example input JSON data
const inputData: InputData = {
  "user_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "addresses": [
    {
      "street": "123 Main St",
      "city": "Somewhere",
      "state": "CA",
      "postal_code": "90001"
    },
    {
      "street": "456 Elm St",
      "city": "Anywhere",
      "state": "NY",
      "postal_code": "10001"
    }
  ],
  "phone_numbers": ["123-456-7890", "987-654-3210"]
};

// Desired structure for mapping
const locationMapper = (data: InputData) => {
  return data?.addresses.map((address) => {
    return {
      street: address.street,
      city: address.city,
      state: address.state
    };
  });
};

const structure = {
  "id": "user_id",
  "fullName": (data: InputData) => `${data.first_name} ${data.last_name}`,
  "contact": {
    "email": "email",
    "phones": "phone_numbers"
  },
  "location": locationMapper
};

test('mapJsonData', (t) => {
  const outputData = mapJsonData(inputData, structure);
  t.not(outputData, null);
  t.deepEqual(outputData, {
    contact: {
      email: 'john.doe@example.com',
      phones: [
        '123-456-7890',
        '987-654-3210',
      ],
    },
    fullName: 'John Doe',
    id: 123,
    location: [
      {
        city: 'Somewhere',
        street: '123 Main St',
        state: 'CA',
      },
      {
        city: 'Anywhere',
        state: 'NY',
        street: '456 Elm St',
      },
    ],
  });
});
