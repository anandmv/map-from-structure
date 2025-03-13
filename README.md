# map-from-structure

Map JSON data from a given structure


## Install 
npm i map-from-structure

## Usage
```
import { mapJsonData } from "map-from-structure"

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

mapJsonData(inputData, structure)
console.log(mapJsonData)

```
