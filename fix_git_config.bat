@echo off
setlocal

:: =============================================================================
:: Git Configuration Script
:: This script updates the global Git username and email.
:: =============================================================================

:: Set variables for easy maintenance
set GIT_USER=fahlevithing-dev
set GIT_EMAIL=fahlevithing@gmail.com

echo Updating Git global configuration...

:: Update global config
git config --global user.name "%GIT_USER%"
git config --global user.email "%GIT_EMAIL%"

:: Verify the changes
echo.
echo Current Git Global Configuration:
echo ---------------------------------
echo Username: 
git config --global user.name
echo Email:    
git config --global user.email
echo ---------------------------------

echo.
echo Git configuration updated successfully.
pause
