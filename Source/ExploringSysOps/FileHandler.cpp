// Fill out your copyright notice in the Description page of Project Settings.

#include "ExploringSysOps.h"
#include "FileHandler.h"

bool UFileHandler::writeToFile(FString fileName, FString text)
{
	std::fstream File(*(FPaths::GameSavedDir() + "\\" + fileName), std::fstream::app);
	// UE_LOG(LogTemp, Warning, TEXT("Your message %s"), *(FPaths::GameSavedDir() + "/" + fileName));
	if(File.is_open())
		return (bool)(File << TCHAR_TO_UTF8(*text));
	return false;
}

FString UFileHandler::readFromFile(FString fileName, int characters)
{
	
	std::fstream File(*(FPaths::GameSavedDir() + "\\" + fileName), std::fstream::app);
	if (File.is_open()) return FString();
	char * buff = new char[characters];
	File.getline(buff, characters);
	FString str(buff);
	delete[]buff;
	return str;
}
