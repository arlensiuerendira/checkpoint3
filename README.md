# Checkpoint n°3 dec 2018 - **4h**

Pour ce travail tu as 4h devant toi. Ce checkpoint n'est pas un examen, il va nous permettre de valider tes compétences, essaye donc de le faire au maximum de ton côté.
Ce checkpoint est très consistant, si tu n'arrives pas à tout faire ce n'est pas grave, fais de ton mieux ;)

## **!!! PREMIERE ÉTAPE OBLIGATOIRE AVANT DE COMMENCER LE PREMIER EXERCICE !!!**

- Clone ce projet
- Crée une branche "ville_nom_prenom", qui va contenir ton avancée. (ville_nom_prenom sera remplacé par la ville de ton campus, ton nom et ton prénom...)

## Pré-requis (outils installés)

- NodeJS
- NPM
- MySQL
- Postman ou curl
- [wcs-checkpoints-quiz](https://www.npmjs.com/package/wcs-checkpoints-quiz)

## Étape 1 - Quiz

- Pour lancer le quiz, ouvre un terminal à la racine de ce projet, et tape la commande suivante :

```sh
wcs-checkpoints-quiz start
```

- Suis les instructions présentes dans le terminal
- Réponds aux questions qui te seront posées
- Une fois le quiz terminé, n'oublie pas de commit le fichier de réponses

## Étape 2 - La liste de Noël

![](https://media.giphy.com/media/gslUJA7JocSkg/giphy.gif)

Ho ho ho les Wilders ! Cette année le père Noël à décidé de franchir un cap, il souhaite dématérialiser la liste des cadeaux.\
Les petits lutins lui ont recommandé de créer une API de gestion de cadeaux avec Express et MySQL.\
Ils ont aussi soufflé ton nom pour la réalisation de ce challenge !

Voici les user stories fournies par le père Noël :

- en tant que lutin je veux pouvoir créer une nouvelle personne.
- en tant que lutin je veux pouvoir consulter une personne en renseignant son id dans l'url.
- en tant que lutin je veux créer et affecter un cadeau à une personne.
- en tant que lutin je veux lister tous les cadeaux avec le nom de la personne.
- en tant que lutin je veux pouvoir supprimer une personne.
- en tant que lutin je veux pouvoir modifier une personne.
- en tant que lutin je veux supprimer un cadeau d'une personne.
- en tant que lutin je veux modifier un cadeau d'une personne.

**Les user stories sont indépendantes les unes des autres, tu peux donc les réaliser dans n'importe quel ordre.**

Tu testeras l'api via Postman et chaque route devra retourner un résultat au format JSON

La mère Noël s'est déjà mise au boulot, elle réalisé le MPD de la base :

![](https://images.innoveduc.fr/javascript-checkpoint3/mcd_noel.png)

Le père Noël souhaite que l'API respecte au maximum les principes de REST, notamment au niveau du nommage des différentes routes et des codes retour HTTP.\
[http-status-codes](https://restfulapi.net/http-status-codes/)\
[REST 5 règles](https://blog.nicolashachet.com/niveaux/confirme/larchitecture-rest-expliquee-en-5-regles/)

## Étape 3 - Bonus

Créer une route qui permet de rechercher dans la base de données les personnes et leurs cadeaux, selon les critères suivants :

- le nom du personne
- l'age d'une personne
- le prix du cadeau

Les paramètres doivent être renseignés dans l'url, tous les paramètres sont optionnels et ils peuvent être placés dans n'importe quel ordre.
