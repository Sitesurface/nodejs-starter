#!/bin/bash

git clone <repo_url>
npm install
npx tsc
npm install pm2
pm2 start build/index.js