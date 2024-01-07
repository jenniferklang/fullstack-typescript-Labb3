Feature: Kalender

Det ska finnas en Log-sida där man kan posta nya anteckningar på valt datum.
Man ska kunna få fram en kalender där man ser datum och även markerade datum
där anteckningar redan är tillagda. Man kan även göra ändringar i anteckningar.


Scenario: Lägga till ny anteckning
Given Datum med redan tillagda anteckningar visas
When Jag fyller i formuläret och klickar på knappen Save Entry
Then Dagens entry är tillagd och formuläret blir rensat

Scenario: Markera vald anteckning för att göra ändring
Given Kalender med eventuella tillagda anteckningar visas, representerade som små prickar
When Jag klickar på en befintlig anteckning för valt datum
Then Anteckningen får en färgad ram runt sig, den är markerad

Scenario: Ta bort och ändra vald anteckning
Given Tillagda anteckningar visas för valt datum
When Jag markerar en befintlig anteckning och klickar på ta bort-knapp som visas
Then Vald anteckning är borttagen
When Jag markerar en befintlig anteckning och klickar på ändra-knapp som visas
Then All information vid vald anteckning visas och kan ändras och sparas på nytt
