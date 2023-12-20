Feature: Kalender

Det ska finnas en Log-sida där man kan posta nya anteckningar på valt datum.
Man ska kunna få fram en kalender där man ser datum och även markerade datum
där anteckningar redan är tillagda.


Scenario: Första anblick på Log-sida. Syfte att posta en anteckning.
Given Jag är på log-sidan och ser formuläret till att posta ny anteckning
When Jag klickar på kalender/ikon
Then Kalendern visas och datum med redan tillagda anteckningar visas med ”markering”


Scenario: Lägga till ny anteckning
Given Datum med redan tillagda anteckningar visas
When Jag fyller i formuläret och klickar på knappen Save Entry
Then Dagens entry är tillagd


Scenario: Kalender separat
Given Kalendern visas med markerande datum där användaren gjort anteckningar
When Klicka på valt datum
Then Lagrade anteckningar visas
