// Fill out your copyright notice in the Description page of Project Settings.

#include "ExploringSysOps.h"
#include "PositioningPluginActors.h"


// Sets default values
APositioningPluginActors::APositioningPluginActors()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}
//this function returns false or true if its a plugin
bool APositioningPluginActors::isPlugin(TActorIterator<AActor> actor) {
	
	const FName tagname = "Plugin";
	if (actor->ActorHasTag(tagname)) {
		return true;
	}
	else {
		return false;
	}
}
//This function position all instances plugins in a row
void APositioningPluginActors::PluginsRow()
{
//	FetchActors();

	int xCord = -67;

	int zCord = 105;
	int yCord = -366;
	
	FVector Orgin;
	FVector Orgin2;

	FVector scales(1, 1, 1);
	FVector BoundsExtent;
	FVector BoundsExtent2;


	for (TActorIterator<AActor> ActorItr(GetWorld()); ActorItr; ++ActorItr) {
		UE_LOG(LogTemp, Warning, TEXT("Actor Name: %s"), *ActorItr->GetName());
		if (isPlugin(ActorItr)) {
			ActorItr->SetActorScale3D(scales);
			ActorItr->GetActorBounds(false, Orgin2, BoundsExtent2);
			
			//	UE_LOG(LogTemp, Warning, TEXT("Actor Name: %s"), *pluginActors[i]->GetName());
			//	UE_LOG(LogTemp, Warning, TEXT("Actor boundsY: %f"), BoundsExtent2.Y);
			//	UE_LOG(LogTemp, Warning, TEXT("Actor orginY: %f"), Orgin2.Y);
			//	UE_LOG(LogTemp, Warning, TEXT("Actor LocY: %f"), pluginActors[i]->GetActorLocation().Y);

			yCord = yCord + BoundsExtent2.Y + (ActorItr->GetActorLocation().Y - Orgin2.Y);
			ActorItr->SetActorLocation(FVector(-67, yCord, zCord));
			ActorItr->GetActorBounds(false, Orgin, BoundsExtent);

			yCord = Orgin.Y + BoundsExtent.Y;
			//	UE_LOG(LogTemp, Warning, TEXT("Actor AFTER boundsY: %f"), BoundsExtent.Y);
			//	UE_LOG(LogTemp, Warning, TEXT("Actor AFTER orginY: %f"), Orgin.Y);
			//	UE_LOG(LogTemp, Warning, TEXT("Actor AFTER LocY: %f"), pluginActors[i]->GetActorLocation().Y);
		}
	}
}

void APositioningPluginActors::PluginsWall()
{
}


// Called when the game starts or when spawned
void APositioningPluginActors::BeginPlay()
{

	//PluginsRow();
	Super::BeginPlay();
	
	//PluginsRow();

}

// Called every frame
void APositioningPluginActors::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
	//GetPos();
}

//This function returns a position infront of the camera
FVector APositioningPluginActors::PluginPositionInfront() {

	APlayerCameraManager* PlayerCamera = GEngine->GetFirstLocalPlayerController(GetWorld())->PlayerCameraManager;
	FVector InFrontCamera;

	InFrontCamera = PlayerCamera->GetActorForwardVector() * 500 + PlayerCamera->GetCameraLocation();

	/*Below is only for testing purposes*/
	/*FVector Orgin;
	FVector BoundsExtent;
	UE_LOG(LogTemp, Warning, TEXT("camera loc: %f"), gge->GetCameraLocation().X);
	for (TActorIterator<AActor> ActorItr(GetWorld()); ActorItr; ++ActorItr) {
	if (ActorItr->GetName() == "TEST") {
		ActorItr->GetActorBounds(false, Orgin, BoundsExtent);
	
		ActorItr->SetActorLocation(InFrontCamera+BoundsExtent);

		//ActorItr->GetActorForwardVector() * 500;
		UE_LOG(LogTemp, Warning, TEXT("test loc: %f"), ActorItr->GetActorLocation().X);

	}
		}*/
	return InFrontCamera;

}