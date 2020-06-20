FROM node:14
 
ADD . /repo
WORKDIR /repo

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

ENTRYPOINT ng serve --host $HOST --disableHostCheck true --configuration $CONFIGURATION

