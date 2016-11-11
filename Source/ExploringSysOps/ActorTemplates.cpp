// Fill out your copyright notice in the Description page of Project Settings.

//#include <string>
#include "ExploringSysOps.h"
#include "ActorTemplates.h"


// Sets default values
AActorTemplates::AActorTemplates()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AActorTemplates::BeginPlay()
{
	//LoadPlugins();
	Super::BeginPlay();
	//LoadPlugins("TestFile");
	//SavePlugins("TestFile");

	
}
//This function saves a instanced plugins to a file
void AActorTemplates::SavePlugins(std::string save)
{
	FString UE4Str;
	FVector UE4Vector;
	FString RotationVector;
	FString ScaleVector;


	std::string MyStdString(TCHAR_TO_UTF8(*UE4Str));
	std::string GameSave(TCHAR_TO_UTF8(*FPaths::GameSavedDir()));
	std::string TemplateName = "\\"+save;
	std::ofstream myfile(GameSave + TemplateName);

	for (TActorIterator<AActor> ActorItr(GetWorld()); ActorItr; ++ActorItr) {

		if (myfile.is_open() && ActorItr->ActorHasTag("Plugin"))
		{
			UE4Str = ActorItr->GetName();
			std::string MyStdString(TCHAR_TO_UTF8(*UE4Str));
			
			myfile << MyStdString<<"\n";
			
			UE4Vector = ActorItr->GetActorLocation();
			UE4Str = UE4Vector.ToString();
			std::string actorLoc(TCHAR_TO_UTF8(*UE4Str));

			myfile << actorLoc<<"\n";

			RotationVector = ActorItr->GetActorRotation().ToString();
			std::string actorRot(TCHAR_TO_UTF8(*RotationVector));
			myfile << actorRot << "\n";

		}
		else std::cout << "Unable to open file";
	}
	myfile.close();
}
//This function loads plugins from a file
void AActorTemplates::LoadPlugins(std::string load)
{
	std::string line;
	FVector setLocation;
	FRotator setRotation;

	std::string GameSave2(TCHAR_TO_UTF8(*FPaths::GameSavedDir()));
	std::string TemplateName = "\\"+load;
	std::ifstream myfile(GameSave2 + TemplateName);
	FString test3 = FPaths::GameSavedDir();

	if (myfile.is_open())
	{
		while (getline(myfile, line))
		{
			
			FString FLine(line.c_str());

				for (TActorIterator<AActor> ActorItr(GetWorld()); ActorItr; ++ActorItr) {


					if (ActorItr->GetName() == FLine){
							getline(myfile, line);
							FString FLine2(line.c_str());


							setLocation.InitFromString(FLine2);
							ActorItr->SetActorLocation(setLocation);
							getline(myfile, line);
							FString RotatorLine(line.c_str());
							setRotation.InitFromString(RotatorLine);

							ActorItr->SetActorRotation(setRotation);


					}


				}
			}
		}
		myfile.close();
	}





// Called every frame
void AActorTemplates::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
	
}
