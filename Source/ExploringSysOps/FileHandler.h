// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include <fstream>
#include "Kismet/BlueprintFunctionLibrary.h"
#include "FileHandler.generated.h"

/**
 * 
 */
UCLASS()
class UFileHandler : public UBlueprintFunctionLibrary
{
public:
	GENERATED_BODY()


	UFUNCTION(BlueprintCallable, Category = "I/O Operations")
	static bool writeToFile(FString fileName, FString text);
	UFUNCTION(BlueprintCallable, Category = "I/O Operations")
	static FString readFromFile(FString fileName, int characters=1000);

	//static std::fstream File;
	
};
