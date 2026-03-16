@echo off
echo ====================================
echo DNYF DevStudio Installation
echo ====================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed!
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
node -v

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm is not installed!
    pause
    exit /b 1
)

echo [OK] npm detected
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

echo.
echo ====================================
echo Installation complete!
echo ====================================
echo.
echo Next steps:
echo   1. npm run dev        - Start development server
echo   2. npm run build      - Build for production
echo   3. npm run deploy     - Deploy to GitHub Pages
echo.
pause
