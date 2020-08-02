FROM bitriseio/docker-android:latest

# ------------------------------------------------------
# --- Install required tools

RUN apt-get update -qq

# ------------------------------------------------------
# --- Cordova CLI

RUN npm install -g cordova
RUN npm install -g yarn
RUN cordova -v

# ------------------------------------------------------
# --- Install Ant

RUN apt-get install -y ant
RUN ant -version

# ------------------------------------------------------
# --- Cleanup and rev num

# Cleaning
RUN apt-get clean

WORKDIR /root/

ADD / /root

RUN yarn && yarn build && cordova platform add android