// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "GameFramework/Actor.h"
#include "TestActor.generated.h"

UCLASS()
class EXPLORINGSYSOPS_API ATestActor : public AActor
{
	GENERATED_BODY()
		class USphereComponent* SphereVolume;

	//	UPROPERTY(Category = Meshes, VisibleAnywhere)
	//	UStaticMeshComponent *CubeMesh;
	//	UBoxComponent* Cube;
	////	UPROPERTY(Category = Meshes, VisibleAnywhere)
	//	UStaticMeshComponent* CubeMesh;
//		static ConstructorHelpers::FObjectFinder<UStaticMesh> pCube(TEXT("StaticMesh'/Game/Geometry/Meshes/1M_Cube.1M_Cube'"));
	//	pCubeMesh = pCube.Object;
		
		//Cube = FObjectInitializer.CreateDefaultSubobject<USkeletalMeshComponent>(this, TEXT("Cube"));
		//Cube->bHiddenInGame = false;
		//RootComponent = Cube;
public:	
	// Sets default values for this actor's properties
	ATestActor();

	class UCollidingPawnMovementComponent* OurMovementComponent;

	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	void CreateBox();
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;

	//TSubclassOf<class ATestActor> CubeBlueprint;
	//ATestActor(const FObjectInitializer& ObjectInitializer);
	
};
