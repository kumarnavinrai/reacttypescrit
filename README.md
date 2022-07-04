# Development Setup

- Run `npm install` to install all dependencies

> Default configurations are set in .env file

- Run `npm start` to run the app

# Build and run as a runnable JAR

Pre-requisites:

- Java 11
- Keycloak running locally (preferably port 9090)
- OIDC Client with name "slamui" should be configured in the local instance of keycloak

To build the application..

```
$ ./mvnw clean package
```

The resulting jar file will be available in the target directory

To run this :

```
$ java -Dspring.profiles.active=development target/amp-ui-<version>.jar
```

Go to http://localhost:8080

# Build a docker image

To build a docker image locally

```
$ ./mvnw clean package jib:dockerBuild
```
