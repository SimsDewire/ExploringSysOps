// Fill out your copyright notice in the Description page of Project Settings.

#include "ExploringSysOps.h"
#include "TestActor.h"


// Sets default values
//This is a test actor to create actors in c++
ATestActor::ATestActor()
{
	//static ConstructorHelpers::FObjectFinder<UStaticMesh> pCube(TEXT("StaticMesh'/Game/Geometry/Meshes/1M_Cube.1M_Cube'"));
	//UStaticMesh* MeshCube = pCube.Object;
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
	USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
	RootComponent = SphereComponent;
	SphereComponent->InitSphereRadius(100);
	SphereComponent->SetCollisionProfileName(TEXT("Pawn"));
	SphereComponent->SetWorldScale3D(FVector(10, 10, 10));

	UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
	SphereVisual->SetupAttachment(RootComponent);
	static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
	if (SphereVisualAsset.Succeeded())
	{
		SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
		SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
		SphereVisual->SetWorldScale3D(FVector(0.8f));
	}
	//SphereComponent->SetWorldLocation(FVector(245, -440, 531), false);
//	SphereComponent
}

// Called when the game starts or when spawned
void ATestActor::BeginPlay()
{

	/*AStaticMeshActor* NewBlock = GetWorld()->SpawnActor<AStaticMeshActor>(FVector(300, -200, 0), FRotator(0, 0, 0));
	NewBlock->SetActorScale3D(FVector(1, 1, 0.1f));
	NewBlock->SetMobility(EComponentMobility::Movable);
	TArray<UStaticMeshComponent*> Comps;
	NewBlock->GetComponents(Comps);
	if (Comps.Num() > 0)
	{
		UStaticMeshComponent* FoundComp = Comps[0];
	//	FoundComp->SetStaticMesh(MeshCube);
	}


	//GetWorld()->SpawnActor(ATestActor::StaticClass());
	/*FVector Location(245.143829, -443.267822, 531.518616);
	FRotator Rotation(0.0f, 0.0f, 0.0f);
	FActorSpawnParameters SpawnInfo;
	
	AActor* test= GetWorld()->SpawnActor<AActor>(Location, Rotation, SpawnInfo);
	UE_LOG(LogTemp, Warning, TEXT("Actor LocY: %f"), test->GetActorLocation().Y);
	*/
	Super::BeginPlay();

	
}

// Called every frame
void ATestActor::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );

}

void ATestActor::CreateBox() {
	//GetWorld()->SpawnActor(ABox::StaticClass());

}