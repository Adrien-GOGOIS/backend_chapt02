const express = require("express");
const app = express();

app.use(express.json());

// Exemple : Faire un console.log à chaque requête, on pourrait copie/coller un console.log à chaque requête, sinon :
app.use((req, res, next) => {
  console.log("requête reçu");
  next(); //
});

// Tableau de données :
const superHeros = [
  {
    name: "Iron Man",
    power: ["money"],
    color: "red",
    isAlive: true,
    age: 46,
    image:
      "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart",
  },
  {
    name: "Thor",
    power: ["electricity", "worthy"],
    color: "blue",
    isAlive: true,
    age: 300,
    image:
      "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",
  },
  {
    name: "Daredevil",
    power: ["blind"],
    color: "red",
    isAlive: false,
    age: 30,
    image:
      "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg",
  },
];

// Routes tous les héros :
app.get("/heroes", (req, res) => {
  res.json(superHeros);
});

// Routes héros par name :
app.get("/heroes/:name", (req, res) => {
  const hero = superHeros.find((her) => {
    return her.name === req.params.name;
  });

  res.json(hero);
});

// Routes super-pouvoirs :
app.get("/heroes/:name/powers", (req, res) => {
  const power = superHeros.find((hero) => {
    return hero.name === req.params.name;
  });

  res.json(power.power);
});

// Middleware transformName
function transformName(req, res, next) {
  req.body.name = req.body.name.toLowerCase();

  next();
}

// Middleware check si le héros existe
function isPresent(req, res, next) {
  const arr = superHeros.map((heros) => {
    return heros.name.toLowerCase();
  });

  if (arr.indexOf(req.body.name) === -1) {
    res.send("ERREUR, entrée invalide");
  } else {
    next();
  }
}

// Middleware check si le héros n'existe pas
function isNotPresent(req, res, next) {
  const arr = superHeros.map((heros) => {
    return heros.name.toLowerCase();
  });

  if (arr.indexOf(req.body.name) > -1) {
    res.send("ERREUR, entrée invalide");
  } else {
    next();
  }
}

// Middleware check forme du POST ou PUT:
function isConform(req, res, next) {
  if (
    req.body.hasOwnProperty("name") &&
    req.body.hasOwnProperty("power") &&
    req.body.hasOwnProperty("color") &&
    req.body.hasOwnProperty("isAlive") &&
    req.body.hasOwnProperty("age") &&
    Array.isArray(req.body.power) &&
    typeof req.body.isAlive === "boolean" &&
    typeof req.body.age === "number"
  ) {
    next();
  } else {
    res.send("ERREUR DE FORMAT");
  }
}

// AJouter un nouveau héros :
app.post("/heroes/", transformName, isNotPresent, isConform, (req, res) => {
  superHeros.push(req.body);
  res.send("Ok, héros ajouté");
});

// Routes PATCH super-pouvoirs :
app.patch("/heroes/:name/powers", (req, res) => {
  const heros = superHeros.find((hero) => {
    return hero.name === req.params.name;
  });
  heros.power.push(req.body.power);
  res.send("Pouvoir ajouté !");
});

// Supprimer un héros :
app.delete("/heroes/:name", transformName, isPresent, (req, res) => {
  const heros = superHeros.find((hero) => {
    return hero.name === req.params.name;
  });

  const index = superHeros.indexOf(heros);
  superHeros.splice(index, 1);
  console.log(superHeros);
  res.send("Ok, " + heros.name + " supprimé");
});

// Supprimer un pouvoir :
app.delete(
  "/heroes/:name/power/:power",
  transformName,
  isPresent,
  (req, res) => {
    const heros = superHeros.find((hero) => {
      return hero.name === req.params.name;
    });

    const powers = heros.power;

    const index = powers.indexOf(req.params.power);
    powers.splice(index, 1);

    res.send(
      "Le pouvoir " + req.params.power + " de " + heros.name + " a été supprimé"
    );
  }
);

// PUT un héros :
app.put("/heroes/:name", transformName, isNotPresent, isConform, (req, res) => {
  let heros = superHeros.find((hero) => {
    return hero.name === req.params.name;
  });

  const index = superHeros.indexOf(heros);
  console.log("Index", index);
  superHeros[index] = {
    name: req.body.name,
    power: req.body.power,
    color: req.body.color,
    isAlive: req.body.isAlive,
    age: req.body.age,
  };
  console.log(superHeros);
  res.send("Ok, héros mis à jour");
});

// Démarrage serveur :
app.listen(8000, () => console.log("Listening....."));
