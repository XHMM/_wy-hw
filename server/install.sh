echo "current NODE_ENV is $NODE_ENV"

if [ "$NODE_ENV" = "development" ]; then
  npm install;
else
  npm install --production;
fi