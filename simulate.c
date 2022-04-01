#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <locale.h>

int main(void) {
	double startingValue;
	double averageReturnInvestment;
	double additionalAnnualInvestment;
	double averageAnnualInvestmentIncreaseRate;
	double newMoneyCap;
	double randomRange;
	int years;	

	printf("Enter starting investment: ");
	scanf("%lf", &startingValue);
	printf("Enter average annual return on investment: ");
	scanf("%lf", &averageReturnInvestment);
	printf("Enter additional annual investment: ");
	scanf("%lf", &additionalAnnualInvestment);
	printf("Enter growth rate for annual investment: ");
	scanf("%lf", &averageAnnualInvestmentIncreaseRate);
	
	printf("Enter max additional ammount to invest: ");
	scanf("%lf", &newMoneyCap);

	printf("Enter percent by which the return can vary: ");
	scanf("%lf", &randomRange);

	printf("Enter years to run simulation: ");
	scanf("%d", &years);

	setlocale(LC_ALL, "");
	
	srand(time(NULL));
	double currentValue = startingValue;
	double currentAnnualInvestment = additionalAnnualInvestment;
	for (int i = 1; i <= years; i++) {
		double oldValue = currentValue;
		currentValue *= (1.0 + averageReturnInvestment + (randomRange * ((double)rand()/RAND_MAX*2.0-1.0)));
		currentValue += currentAnnualInvestment;
		double addedDivGain = currentAnnualInvestment / (currentValue - oldValue);
		
		
		printf("Year: %'d, Money Added: %'.0lf, Money Gained: %'.0lf, Percent: %'.3lf, Total Money: %'.0lf\n",
				 i,
				 currentAnnualInvestment,
				 currentValue - oldValue,
				 addedDivGain,
				 currentValue);
		//printf("Value at end of year %d: \n", i
		currentAnnualInvestment *= (1.0 + averageAnnualInvestmentIncreaseRate);
		if (currentAnnualInvestment > newMoneyCap) {
			currentAnnualInvestment = newMoneyCap;
		}
	}
	
	

	return 0;
}
