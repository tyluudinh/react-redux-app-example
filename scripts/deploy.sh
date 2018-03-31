#!/bin/bash

build() {
    export NODE_ENV=$1
    yarn build
}

sync_to_s3() {
    aws s3 sync $1 $2 --acl public-read --expires 2592000
}

create_invalidation() {
    aws cloudfront create-invalidation --distribution-id $1 --paths '/*'
}

case $CIRCLE_BRANCH in
    staging)
        build 'staging'
        sync_to_s3 'build/' 's3://stg-wallet.spoutico.com/'
        create_invalidation 'E14MPF43HYK5GC'
        ;;
    master)
        build 'production'
        sync_to_s3 'build/' 's3://wallet.spoutico.com/'
        create_invalidation 'E1CG7FBTLNTACI'
        ;;
    *)
        yarn coverage
        ;;
esac
