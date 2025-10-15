# [IMPORTANT] Read the instructions

## To test the application

Follow the below steps:

- Run the command `ng serve`
- Go to the browser and type `http://localhost:4200/`
- Paste a supported form schema JSON on the text aread (You can find some valid JSON below)
- Then click on the `Upload` button
- Then the dynamic form will be generated based on the JSON you have entered

## JSON Examples ⬇️

### Without conditional fields

```
{
  "title": "User Registration",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "message": "Invalid email address"
      }
    },
    {
      "label": "Date of Birth",
      "name": "dob",
      "type": "date"
    },
    {
      "label": "Gender",
      "name": "gender",
      "type": "dropdown",
      "options": ["Male", "Female", "Other"],
      "required": true
    },
    {
      "label": "Hobbies",
      "name": "hobbies",
      "type": "multiselect",
      "options": ["Reading", "Sports", "Music", "Travel"]
    },
    {
      "label": "Subscribe to newsletter",
      "name": "subscribe",
      "type": "checkbox"
    },
    {
      "label": "About Yourself",
      "name": "about",
      "type": "textarea"
    }
  ]
}

```

### With Conditional Fields
```
{
  "title": "User Registration",
  "fields": [
    {
      "label": "Full name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "message": "Invalid email address"
      }
    },
    {
      "label": "Date of Birth",
      "name": "dob",
      "type": "date"
    },
    {
      "label": "Gender",
      "name": "gender",
      "type": "dropdown",
      "options": ["Male", "Female", "Other"],
      "required": true
    },
    {
      "label": "Hobbies",
      "name": "hobbies",
      "type": "multiselect",
      "options": ["Reading", "Sports", "Music", "Travel"]
    },
    {
      "label": "Subscribe to newsletter",
      "name": "subscribe",
      "type": "checkbox"
    },
    {
      "label": "Newsletter address",
      "name": "newsletterAddress",
      "type": "textarea",
      "required": true,
      "conditional": {
        "parentFieldName": "subscribe",
        "parentFieldValue": true
      }
    }
  ]
}

```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
