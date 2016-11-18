// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include <iostream>
#include <fstream>
#include <string>
#include "GameFramework/Actor.h"
#include "PositioningPluginActors.h"
#include "ActorTemplates.generated.h"



UCLASS()
class EXPLORINGSYSOPS_API AActorTemplates : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AActorTemplates();

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	void SavePlugins(std::string save);
	void LoadPlugins(std::string load);
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;

	
};
