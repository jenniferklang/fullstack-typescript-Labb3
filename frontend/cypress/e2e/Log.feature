Feature: Kalender

Det ska finnas en Log-sida där man kan posta nya anteckningar på valt datum.
Man ska kunna få fram en kalender där man ser datum och även markerade datum
där anteckningar redan är tillagda.


Scenario: Lägga till ny anteckning
Given Datum med redan tillagda anteckningar visas
When Jag fyller i formuläret och klickar på knappen Save Entry
Then Dagens entry är tillagd och formuläret blir rensat
