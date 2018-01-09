These labs will go through the process of adding **React Router** and **Redux** to a basic React application.


## Set Up

1. **Client Code:**

    The starting code can be found on the master branch of https://github.com/Reactathon/reactathon-client-code/:

    Check out this git repository and follow the instructions to install and start the application.

1. **Server Code**

    The labs rely on a locally running Spring Boot server that can be found at https://github.com/Reactathon/reactathon-server:

    Also check out this git repository and run the jar.

Required Labs:

1. [React Router](./1_routing/readme.md)

1. [Redux](./2_redux/readme.md)


Optional:

1. [Material UI](./3_material_ui/readme.md)

The final product of these labs can be found on the **final-client-code** Branch (https://github.com/Reactathon/reactathon-client-code/tree/final-client-code)

## Trouble Shooting

1. If you get an error that any specific modules cannot be found double check they were successfully installed with yarn in the correct project.

    You can check the `package.json` file to verify -- make sure your dependency is listed in the **dependencies** section.

    ```
    {
      "name": "reactathon",
      "version": "0.1.0",
      "private": true,
      "dependencies": {
        "add": "^2.0.6",
        "axios": "^0.17.1",
        "material-ui": "next",
        "material-ui-icons": "^1.0.0-beta.17",
        "react": "^16.2.0",
        "react-dom": "^16.2.0",
        "react-redux": "^5.0.6",
        "react-router-dom": "^4.2.2",
        "redux": "^3.7.2",
        "redux-logger": "^3.0.6",
        "redux-thunk": "^2.2.0",
        "typeface-roboto": "^0.0.45",
        "yarn": "^1.3.2"
      },
      "devDependencies": {
        "react-scripts": "1.0.17"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test --env=jsdom",
        "eject": "react-scripts eject"
      }
    }
    ```

    If everything looks installed correctly try restarting the application -- kill the running app and return `yarn start`, sometimes the dev server needs to be restrated for
    new modules to be picked up.


1. If you have any issues signing in or loading profiles double check that the Spring server is running and check if there are any errors in the logs.