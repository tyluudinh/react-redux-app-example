#!/bin/bash

aws configure set default.region ap-southeast-1
aws configure set preview.cloudfront true
aws --version
yarn --version
node --version

case $CIRCLE_BRANCH in
    dev)
        yarn deploy-dev
        ;;
    master)
        yarn deploy-prod
        ;;
    *)
        yarn test
        ;;
esac
