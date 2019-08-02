# Week 2: 

## PART 1: Node.js API

**1. Install all packages**
```bash
npm install
```

**2. Create database on mysql shell**
```mysql
mysql> create database new_world;
```

**3. Seed database**
```bash
npm run init-db
```

**4. Start server**
```bash
npm run server
```
#
## Assignment Part 1

*You can test the results with postman.*

**EXAMPLES:**
1. What is the capital of country **'Netherlands'**
> localhost:3333/01?country=Netherlands
```json
[
  "Amsterdam"
]
```

2. List all the languages spoken in the region **'Western Europe'**
> localhost:3333/02?region=western+europe
```json
[
  "Czech","German","Hungarian","Polish","Romanian","Serbo-Croatian" ...
]
```


3. Find the number of cities in which language **'Dutch'**
> localhost:3333/03?language=dutch
```json
[
  {"numberOfCities":88}
]
```

4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
   E.g.
   (A) input region : **'Western Europe'** and input language : **'Dutch'**
   output should be Belgium and Netherlands
   (B) input region : **'Western Europe'** and input language : **'Hindi'**
   output should be 'FALSE'
> localhost:3333/04?region=western+europe&language=dutch
```json
{"dutch":
  [
    "Belgium","Netherlands"
  ]
}
```
> localhost:3333/04?region=western+europe&language=hindi
```json
false
```

## PART 2: CLI APP
You can test the application by running the code:
```bash
npm run part2 <country_code> <language>
```
