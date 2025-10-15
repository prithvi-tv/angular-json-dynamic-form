# [IMPORTANT] Read the instructions

## To test the application

Follow the below steps:

- Run the command `npm install` to install all the project dependancies
- Run the command `npm run start`
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
  "title": "Job Application Form",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email Address",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "message": "Invalid email address"
      }
    },
    {
      "label": "Phone Number",
      "name": "phone",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[0-9]{10}$",
        "message": "Please enter a 10-digit phone number"
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
      "options": ["Male", "Female", "Non-binary", "Prefer not to say"]
    },
    {
      "label": "Are you an experienced developer?",
      "name": "isExperienced",
      "type": "checkbox"
    },
    {
      "label": "LinkedIn Profile",
      "name": "linkedin",
      "type": "text",
      "required": true,
      "conditional": {
        "parentFieldName": "isExperienced",
        "parentFieldValue": true
      }
    },
    {
      "label": "Preferred Programming Languages",
      "name": "preferredLanguages",
      "type": "multiselect",
      "options": ["JavaScript", "TypeScript", "Python", "Java", "Go", "Rust"]
    },
    {
      "label": "Position Applied For",
      "name": "position",
      "type": "dropdown",
      "options": ["Frontend Developer", "Backend Developer", "UI/UX Designer", "Project Manager"],
      "required": true
    },
    {
      "label": "Why Should We Hire You?",
      "name": "about",
      "type": "textarea"
    }
  ]
}

```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```
