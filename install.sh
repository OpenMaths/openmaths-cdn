#!/usr/bin/env bash
sudo npm install gulp npm-check-updates -g

ncu -u

sudo npm install
bower install

gulp sass