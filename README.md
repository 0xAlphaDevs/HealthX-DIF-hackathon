# HealthX Protocol : DIF Hackathon

HealthX : Own & Carry your Health History with Web5 - Seamlessly store and share medical records on decentralized web nodes (DWNs) using decentralized identifiers (DIDs). Allowing healthcare organizations to issue secure health records to a pateint using his/her DIDs and providing patients with easy access to their health data.

## Table of Contents

1. [All Links](#links)
2. [Instructions to setup and run locally ](#instructions-to-setup)
3. [Tech Stack](#tech-stack)
4. [Our Solution (Architecture)](#our-solution-architecture)
5. [Future Vision](#future-vision)
6. [Team](#team)

## Links

- [Deployed URL](https://healthx-ivory.vercel.app/)
- [Git Repo with README](https://github.com/0xAlphaDevs/HealthX-DIF-hackathon)
- [Presentation PDF](https://docs.google.com/presentation/d/1WulT4PpZY1_bNW4N4pKIIGrirs_soqmgBOZNiak4Idk)

## Instructions to Setup

Follow these instructions to set up and run the project:

**Using Github**

- Clone the Git repository: `https://github.com/0xAlphaDevs/HealthX-DIF-hackathon.git`
- Install project dependencies: `pnpm install`
- Start the development server: `pnpm run dev`
- Access the web app in your browser at [http://localhost:3000](http://localhost:3000)

## Tech Stack

### Frontend

- Next JS
- Javascript
- Tailwind CSS
- Radix UI
- Tanstack

### Other Technologies

- web5/api (DWNs & DIDs)
- Recoil
- crypto-browserify
- stream-browserify

### DIF Work Items

- DWNs
- DIDs

## Our Solution (Architecture)

### Organization Dashboard

**Log in as an Organization**

- Access the app and choose the "Organization" type during the login process.

**Issue DID - Secure Record Issuance**

- A "Issue DID" button is available which opens a form for the organization to issue a record for the patient.
- Inside the "Issue DID" form, fill in the necessary details:
  - **Patient's Did:** Enter the patient's did for identification.
  - **Patient's Name:** Enter the patient's name.
  - **Health Record Name:** Specify the name of the health record being issued.
  - **Category:** Choose the appropriate category for the health record.
  - **Image Upload:** Include relevant image related to the health record.

**Unique Classification with DID**

- The organization ensures the unique identification of the issued record through the use of a Decentralized Identifier (DID). This DID serves as a secure and decentralized reference for the health record.

**View Past Issued Records**

- There is a dedicated table displaying past records issued by the organization.
- Columns in the table include:
  - **Patients's Name & DID**
  - **Health Record Name**
  - **Category**
  - **Date Issued**
  - **Image of the record uploaded**

**Search and Filter Functionality**

- The organization can efficiently navigate through past records using implemented search and filter functionalities.
- Easily locate specific records based on parameters health record name or category.

### Individual Dashboard

**Log in as an Individual**

- Enter the app and select the "Individual" type during the login process.

**View Issued Documents**

- A table displays the health records issued to the individual.
- Columns in the table include:
  - **Health Record Name**
  - **Category**
  - **Date Issued**
  - **View Button**

**View Detailed Report Image**

- Clicking the view button on a specific record in the table allows the individual to view the detailed report image.
- This opens a separate route displaying the image associated with the health record.

**Search and Filter Functionality**

- Efficiently navigate through issued records with implemented search and filter functionalities.
- Easily locate specific records based on parameters such as health record name or category.

## Future Vision

As we envision the continuous improvement and expansion of HealthX, here are some exciting features we plan to integrate into the platform:

### 1. Adding more Health Record Formats

To further enhance organization experience and accessibility, we will be working towards expanding the upload record format options beyond images. Our goal is to provide organizations with the flexibility to upload and view health records in various formats, ensuring compatibility with diverse types of medical documentation.

### 2. Single click access request and sharing of medical records

To further enhance user experience and accessibility, we aim to introduce request based record sharing functionality on dashboard for every health record. This feature will empower users to share their health records with different healthcare organizations. By streamlining the sharing process, we intend to facilitate seamless collaboration between individuals and healthcare entities, contributing to a more interconnected and efficient healthcare ecosystem.

### 3. Better Identity management with wallet integration

We aim to work together with TBD to launch and integrate Web5 wallet to facilitate better identity management for users. This will allow users to easily manage their DIDs and health records, providing them with a more streamlined and efficient experience.

### 4. Integration with HealthX Mobile App (Later Stage)

We will be working towards the development of a mobile application for HealthX. This will allow users to access their health records on the go, providing them with a convenient and efficient way to manage their health history.

## Team

Team [AlphaDevs](https://alphadevs.dev) 👇

### Github

[Harsh Tyagi](https://github.com/mr-harshtyagi)
[Yashasvi Chaudhary](https://github.com/0xyshv)

### Twitter / X

[Harsh Tyagi](https://twitter.com/mr_harshtyagi)
[Yashasvi Chaudhary](https://twitter.com/0xyshv)

## Thanks

- Feel free to reach out to the [AlphaDevs team](https://alphadevs.dev) with any questions or issues.

- We appreciate your interest in our project and welcome contributions and feature suggestions.
