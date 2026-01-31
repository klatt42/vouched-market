#!/bin/bash
# VouchedMarket - Environment Startup
# Port: 4050

echo "=== VouchedMarket Dev Environment ==="
echo "Port: 4050"
echo ""

# Check if port is available
if lsof -i :4050 > /dev/null 2>&1; then
  echo "WARNING: Port 4050 is already in use"
  lsof -i :4050
else
  echo "Port 4050 is available"
fi

echo ""
echo "Starting dev server..."
cd /home/klatt42/projects/vouched-market
PORT=4050 npm run dev
