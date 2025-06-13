#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-27705-493f8ade/webtictactoe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

