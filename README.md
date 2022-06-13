# Norp Chat App
[![GitHub Pull Requests](https://img.shields.io/badge/GitHub-Pull%20Requests-blue)]()
[![Netlify Status](https://api.netlify.com/api/v1/badges/9dcf0857-4360-49bf-ad18-c2d3d224ad88/deploy-status)](https://app.netlify.com/sites/norp-chart/deploys)

## Project Description

> This project is a small Real Time Chat Application built using React as a Frontend to a server Backend found at this [Github repository](https://github.com/RNtaate/Norp-Chat-App-Server)

> It is a `Mobile Only View` application built to demonstrate my knowledge and understanding of Web Sockets and the use of the `Socket.io` and `Socket.io Client` Libraries.

> It allows any user to freely enter a chat name, select a chat group and start chatting freely with other users in the same chat group. The user can also view other users online and privately chat with them. The user also gets notified if they receive a message from a group or user they are not currently chatting with.

> #### Future Additional Features:
> - Ability to create custom groups and add other users to it.
> - Ability to search for users or groups available.
> - An authentication system.
> - Validation and display of error messages.

### Screenshots
![](/public/screenshot.gif)

##  🔧 Built with

- ReactJS
- Node Package Manager(NPM)
- [Socket.io Client](https://socket.io/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Norp Chat App Server](https://github.com/RNtaate/Norp-Chat-App-Server)

## 🔴 Live Demo

- [Norp Chat App](https://norp-chart.netlify.app)

## Get started on local machine
### Prerequisites
1. NPM(Node Package Manager) or Yarn

1. Node

1. [Norp-Chat-App-Server (The backend Project)](https://github.com/RNtaate/Norp-Chat-App-Server)

### Steps to follow

1. Clone the repository to your local machine by running `git clone git@github.com:RNtaate/norp-chat-app.git` in your terminal

1. On your local machine, navigate to the project folder using `cd norp-chat-app` in your terminal

1. Run `npm install` or `yarn` to install all the necessary dependencies.

1. Open the project in your favorite code editor such as **Visual Studio Code**

1. Locate the `HelperMethods.js` file in the `src` folder and change the value of `SOCKETLINK` to `"http://localhost:3001"` (__Make sure the port number is the same as the one on which the backend is running on on your local machine__)

1. Run `npm run build` or `yarn run build`

1. Run `npm run start` or `yarn start` to start the application on a local server

## 🤝 Contributions
  There are two ways of contributing to this project:

1. If you see something wrong or not working, please check [the issue tracker section](https://github.com/RNtaate/norp-chat-app/issues), if that problem you met is not in already opened issues then open the issue by clicking on `new issue` button.

2. If you have a solution to that, and you are willing to work on it, follow the below steps to contribute:
    1.  Fork this repository

    1.  Clone it on your local computer by running `git clone git@github.com:RNtaate/norp-chat-app.git` __Replace *RNtaate* with the username you use on github__
    1.  Open the cloned repository which appears as a folder on your local computer with your favorite code editor
    1.  Create a separate branch off the *master branch* or *main branch*,
    1.  Write your codes which fix the issue you found
    1.  Commit and push the branch you created
    1.  Raise a pull request, comparing your new created branch with our default branch [here](https://github.com/RNtaate/norp-chat-app)

## ✒️  Authors

👤 **Roy Ntaate**

- Github: [@RNtaate](https://github.com/RNtaate)
- Twitter: [@RNtaate](https://twitter.com/RNtaate)
- Linkedin: [roy-ntaate](https://linkedin.com/in/roy-ntaate)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgements

- [Socket.io](https://socket.io/)
- [GeeksForGeeks - Node Projects](https://www.geeksforgeeks.org/top-7-nodejs-project-ideas-for-beginners/)
- [Pedro Tech](https://www.youtube.com/c/PedroTechnologies)