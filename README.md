# Wireless Microphone Vault - ITMD543 Final

## Project Description

A React web application designed to help Audio technicians and RF coordinators manage thier wireless microphone inventory. This app helps to replace the annoying spreadsheets with a more modern design that is able to track microphone bands, frequencies, and their last serviced dates. 

### Overview:
Managing wireless frequencies is critical for live events. Two microphones tuned too close together could result in interference, which can cause static or signal dropouts. This Microphone Vault Web App tries to solve this problem by implementing:
- A **Interactive Inventory** that contains the list of all the microphones in inventory along with frequency information.
- **Visualizing the Spectrum** which is a "Frequency Ladder" that visually stacks microphones from low to high frequency.

## Setup Instructions

Clone the repository using:
```bash
git clone https://github.com/DominikFX/ITMD543-final.git
```

To run, navgate inside the `mic-vault` folder
```bash
cd mic-vault
```

The install the dependecies:
```bash
npm install
```

You can either run locally in developer mode (follow the URL given in the terminal):
```bash
npm run dev
```

Or build the project:
```bash
npm run build
```

## Framework Used
The following were used in creation of the project:
- **Framework**: React (with the React Router)
- **Styling**: Use of Tailwind CSS
- **Icons**: Radix UI Icons
- **Data**: Static JSON

Site is hosted on **Azure Web Static Apps**:
- Live Link: https://orange-stone-01fa9621e.3.azurestaticapps.net/

## Lessons Learned
One of the main lessons learned from this project was the importance of prioritizing user experience over sophisticated functionality. I initially thought to build a heatmap-style UI for the frequency, but after a while I realized that a frequency "ladder" would work better and provide the user with what they would actually want to see and that would make sense to them. Throughout the project I also ended up using Tailwind CSS, which proved to be much more convenient and standardized. Additionally, the biggest lesson I learned was working with some sort of state for the add modals.

## Future Scope
In the future, a goal for this static web app would be to integrate it with a more persistent backend service that would allow users to save and retrieve their inventory permanently and not rely on just the static JSON. UI-wise, maybe it would be worth adding a dark mode to the app since a lot of the A/V technicians could use it during a live show, as during the events the techs usually need to be discrete. 