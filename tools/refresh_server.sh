#!/bin/bash

git pull
npm install
npx tsc
pm2 restart build/index.js