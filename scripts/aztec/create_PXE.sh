#!/bin/bash

if command -v apache2 &>/dev/null || command -v httpd &>/dev/null; then
  CONFIG_FILE_PATH="/etc/apache2/sites-available/froglin.proxy.conf"
  if [ -f "$CONFIG_FILE_PATH" ]; then
    echo "ProxyPassReverse /pxe http://localhost:$1" >> "/etc/apache2/sites-available/froglin.proxy.conf"
    apachectl graceful
  fi
fi;

docker run                    \
  --rm                        \
  --workdir "$PWD"            \
  -v $HOME:$HOME              \
  -v cache:/cache             \
  -p $1:$1                    \
  ${DOCKER_ENV:-}             \
  ${DOCKER_HOST_BINDS:-}      \
  ${DOCKER_USER:-}            \
  aztecprotocol/aztec:latest  \
  start -p $1 --pxe nodeUrl=$2
