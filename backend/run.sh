#!/bin/bash
PATH="/root/.nvm/versions/node/v6.10.0/bin:$PATH"
echo "Executado contextos"

BASE_FOLDER=$(pwd)
NPM_RUN=$(echo "npm run dev")

cd "$BASE_FOLDER/customer"
eval "$NPM_RUN"
echo "Customer started"


