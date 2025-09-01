@echo off
echo Building and running CBK Mobile App with Docker...
echo.

echo Checking Docker status...
docker --version
docker-compose --version

echo.
echo Building Docker image...
docker-compose build

echo.
echo Starting the application...
docker-compose up -d

echo.
echo Application is starting up...
echo Please wait a moment for the build to complete...
echo.
echo Once ready, you can access the app at: http://localhost:3200
echo.
echo To stop the application, run: docker-compose down
echo To view logs, run: docker-compose logs -f
echo To troubleshoot build issues, run: docker-compose build --no-cache
pause
