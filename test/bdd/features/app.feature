Feature: Gestion des contacts

  Scenario: Ajouter un nouveau contact
    Given je n'ai aucun contact nommé "Sarah"
    When j'ajoute un contact nommé "Sarah"
    Then le contact nommé "Sarah" existe

  Scenario: Supprimer un contact existant
    Given j'ai un contact nommé "Jean"
    When je supprime le contact nommé "Jean"
    Then le contact nommé "Jean" n'existe plus

  Scenario: Mettre à jour un contact existant
    Given j'ai un contact nommé "Jack"
    When je modifie le contact nommé "Jack"
    Then le contact nommé "Jack" existe
