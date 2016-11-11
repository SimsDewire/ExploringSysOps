// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include <vector>
#include "GameFramework/Actor.h"
#include "PositioningPluginActors.generated.h"


UCLASS()
class EXPLORINGSYSOPS_API APositioningPluginActors : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	APositioningPluginActors();
	bool isPlugin(TActorIterator<AActor> actor);
	void PluginsRow();
	void PluginsWall();
	UFUNCTION(Category = "Plugin Organizer")
	FVector PluginPositionInfront();

	std::vector <TActorIterator<AActor>> pluginActors;

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;

	
	
};
